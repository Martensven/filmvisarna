import mongoose from "mongoose";
import dotenv from "dotenv";
import { Screening } from "./models/screeningSchema.js";
import { Movies } from "./models/moviesSchema.js";
import { ThemeDay } from "./models/themeDaySchema.js";
import { Auditorium } from "./models/auditoriumSchema.js";

dotenv.config();

// Calculate next date
function getNextDate(dayName, time) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const now = new Date();
  const targetDay = days.indexOf(dayName.toLowerCase());
  if (targetDay < 0) throw new Error(`Ogiltig dag ${dayName}`);

  const diff = (targetDay + 7 - now.getDay()) % 7 || 7;
  const date = new Date(now);
  date.setDate(now.getDate() + diff);

  const [hours, minutes] = time.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);

  return date;
}

// Schedule configuration
const schedule = {
  closedDays: ["monday"],

  smallTheater: {
    themedays: {
      thursday: ["16:30", "18:30", "20:30"],
      sunday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
    },
    weekday: ["16:30", "18:30", "20:30"],
    saturday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
  },

  bigTheater: {
    weekday: ["16:00", "18:30", "20:30"],
    saturday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
    sunday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
  },

  // Generate showtimes for 4 weeks
  async generateNextShowtimes() {
    const theaters = [];
    const days = [
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    for (let weekOffset = 0; weekOffset < 4; weekOffset++) {
      for (const day of days) {
        if (this.closedDays.includes(day)) continue;

        let themeMovieID = null;
        try {
          const themeDay = await ThemeDay.findOne({ day }).populate("movie");
          if (themeDay) themeMovieID = themeDay.movie._id;
        } catch (error) {
          console.error("Problem att hitta temadagar", error);
        }

        // Small theater
        const smallTimes =
          this.smallTheater[day] ||
          (["tuesday", "wednesday", "friday"].includes(day)
            ? this.smallTheater.weekday
            : []);
        for (const time of smallTimes) {
          const date = getNextDate(day, time);
          date.setDate(date.getDate() + 7 * weekOffset);
          theaters.push({
            theater: "Lilla salongen",
            day,
            time,
            showTime: date,
            theme: false,
            movie: null,
          });
        }

        // Big theater
        const bigTimes =
          this.bigTheater[day] ||
          (["tuesday", "wednesday", "thursday", "friday"].includes(day)
            ? this.bigTheater.weekday
            : []);
        for (const time of bigTimes) {
          const date = getNextDate(day, time);
          date.setDate(date.getDate() + 7 * weekOffset);
          theaters.push({
            theater: "Stora salongen",
            day,
            time,
            showTime: date,
            theme: false,
            movie: null,
          });
        }

        // Theme days
        const themeTimes = this.smallTheater.themedays[day] || [];
        for (const time of themeTimes) {
          const date = getNextDate(day, time);
          date.setDate(date.getDate() + 7 * weekOffset);
          theaters.push({
            theater: "Lilla salongen",
            day,
            time,
            showTime: date,
            theme: true,
            movie: themeMovieID || null,
          });
        }
      }
    }

    console.log(`Generated ${theaters.length} screenings`);
    return theaters;
  },
};

// Runs scheduler and saves to mongoDB
async function runScheduler() {
  console.log("🧪 DB_CONNECT =", process.env.DB_CONNECT); // optional, for debugging

  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1);
  }

  console.log("Generating showtimes...");
  const newShowtimes = await schedule.generateNextShowtimes();

  try {
    const result = await Screening.insertMany(newShowtimes, { ordered: false });
    console.log(`Inserted ${result.length} screenings into MongoDB.`);
  } catch (err) {
    if (err.code === 11000) {
      console.warn("Duplicate screenings detected, skipping existing ones.");
    } else {
      console.error("Error inserting screenings:", err);
    }
  }
}

runScheduler();


export default schedule;
