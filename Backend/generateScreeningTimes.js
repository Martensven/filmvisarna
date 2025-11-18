import schedule from "./schedule.js";
import { Screening } from "./models/screeningSchema.js";
import { Auditorium } from "./models/auditoriumSchema.js";
import { Movies } from "./models/moviesSchema.js";

// Pick next movie based on count and rotation
function pickNextMovie(candidates, movieCount, rotationIndex) {
  if (!candidates?.length) return null;

  const sorted = [...candidates].sort((a, b) => {
    // 1. Lowest count first
    const countDiff = movieCount[a._id] - movieCount[b._id];
    if (countDiff !== 0) return countDiff;

    // 2. Rotation order
    const aPos = rotationIndex.indexOf(a._id.toString());
    const bPos = rotationIndex.indexOf(b._id.toString());
    return aPos - bPos;
  });

  const chosen = sorted[0];
  if (!chosen) return null;

  // Rotate rotationIndex to move chosen movie to the end
  const id = chosen._id.toString();
  const idx = rotationIndex.indexOf(id);
  if (idx !== -1) {
    rotationIndex.splice(idx, 1);
    rotationIndex.push(id);
  }

  return chosen;
}

export const generateAndSave = async () => {
  try {
    const screenings = await schedule.generateNextScreening();

    const smallTheater = await Auditorium.findOne({ name: "Lilla Salongen" });
    const bigTheater = await Auditorium.findOne({ name: "Stora Salongen" });

    if (!smallTheater || !bigTheater) {
      throw new Error("Saknar salonger");
    }

    // Find movies and their themes
    const movies = await Movies.find({}).populate("themes");

    if (!movies.length) {
      throw new Error("Inga filmer i databasen");
    }

    // Count existing screenings per movie
    const countsFromDb = await Screening.aggregate([
      { $group: { _id: "$movie", count: { $sum: 1 } } }
    ]);
    // Map counts to movie IDs
    const movieCount = {};
    movies.forEach(m => movieCount[m._id] = 0);
    countsFromDb.forEach(c => movieCount[c._id] = c.count);

    // Rotation order
    const rotationIndex = movies.map(m => m._id.toString());
    const saved = [];

    // Generate screenings
    for (const screening of screenings) {
      const weekday = screening.date.toLocaleDateString("sv-SE", { weekday: "long" }).toLowerCase();
      const isThursday = weekday === "torsdag";
      const isSunday = weekday === "söndag";


      // Small theatre

      if (screening.theater === "Lilla salongen") {
        let eligibleSmall = [];
        // Determine eligible movies based on themes
        if (isThursday) {
          eligibleSmall = movies.filter(m => m.themes?.weekDay === "Tysta Torsdagen");
        } else if (isSunday) {
          eligibleSmall = movies.filter(m => m.themes?.weekDay === "Svenska Söndagen");
        } else {
          // All other days: only non-theme or “Alla”
          eligibleSmall = movies.filter(m =>
            !m.themes?.weekDay ||
            m.themes?.weekDay === "Alla"
          );
        }
        // Pick movie and create screening
        const movie = pickNextMovie(eligibleSmall, movieCount, rotationIndex);
        if (movie) {
          const created = await createScreeningIfNonExistant({
            movie,
            screening,
            auditoriumId: smallTheater._id,
            scheduleType: "smallTheater",
          });

          if (created) {
            movieCount[movie._id]++;
            saved.push(created);
          }
        }
      }


      // Large theatre
      if (screening.theater === "Stora salongen") {
        let eligibleLarge = movies.filter(m => m.themes?.weekDay === "Alla");

        const movie = pickNextMovie(eligibleLarge, movieCount, rotationIndex);
        if (movie) {
          const created = await createScreeningIfNonExistant({
            movie,
            screening,
            auditoriumId: bigTheater._id,
            scheduleType: "bigTheater",
          });

          if (created) {
            movieCount[movie._id]++;
            saved.push(created);
          }
        }
      }
    }

    console.log(`Skapade ${saved.length} visningar.`);
    return saved;

  } catch (error) {
    console.error("Fel vid generering:", error);
    throw error;
  }
};


// Create screening if not already existing
async function createScreeningIfNonExistant({ movie, screening, auditoriumId, scheduleType }) {
  const dateStr = screening.date.toLocaleDateString("sv-SE");
  const timeStr = screening.date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
    hour12: false
  });

  const conflict = await Screening.findOne({
    auditorium: auditoriumId,
    date: dateStr,
    time: timeStr,
  });

  if (conflict) return null;

  return await Screening.create({
    movie: movie._id,
    auditorium: auditoriumId,
    date: dateStr,
    time: timeStr,
    showTime: screening.date,
    bookedSeats: [],
    scheduleType,
  });
}
