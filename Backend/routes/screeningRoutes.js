import express from "express";
import schedule, { getNextDate } from "../schedule.js";
import { Screening } from "../models/screeningSchema.js";
import { Movies } from "../models/moviesSchema.js";
import { Auditorium } from "../models/auditoriumSchema.js";

const router = express.Router();

// Week-number function for schedule use. 
function getWeekNumber(date) {
  const temp = new Date(date);
  temp.setHours(0, 0, 0, 0);
  temp.setDate(temp.getDate() + 4 - (temp.getDay() || 7));
  const yearStart = new Date(temp.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((temp - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

// Create a new screening
router.post("/api/screening", async (req, res) => {
  try {
    const { movie, auditorium, date, time } = req.body;

    const newScreening = new Screening({
      movie,
      auditorium,
      date,
      time,
      bookedSeats: []
    });

    const saved = await newScreening.save();

    res.status(201).json({
      message: "Visning skapad",
      screening: saved
    });
  } catch (error) {
    console.error("Något gick fel vid skapande av visning:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Generate a schedule for movies 
router.post("/api/screening/generateSchedule", async (req, res) => {
  try {
    const movies = await Movies.find();
    const auditoriums = await Auditorium.find();
    const createdScreeningTimes = [];

    if (!movies.length || !auditoriums.length) {
      return res.status(400).json({ message: "Ingen salong eller film hittades" });
    }

    for (const movie of movies) {
      const type = movie.scheduleType; 
      const times = schedule.generateNextShowtimes(type);
      const auditorium = auditoriums.find(a =>
        a.name.toLowerCase().includes(type.includes("small") ? "lilla" : "stora")
      );
      if(!type) {
        console.warn(`Filmen med titel ${movie.title} saknar schematyp.`)
        continue;
      }
      if (!auditorium) continue;
      
      for (const showScreening of times) {
        const weekNumber = getWeekNumber(showScreening.date);

        // Checks if the auditorium already has a booked screening
        const existingScreening = await Screening.findOne({
          auditorium: auditorium._id,
          date: showScreening.date
        });

        if (existingScreening) {
          console.log(`${auditorium.name} är redan bokad för ${showScreening.date}`);
          continue;
        }

        // Creates a new screening
        const screening = new Screening({
          movie: movie._id,
          auditorium: auditorium._id,
          date: showScreening.date,
          time: showScreening.time,
          weekNumber,
          bookedSeats: []
        });

        await screening.save();
        createdScreeningTimes.push(screening);
      }
    }

    res.status(201).json({
      message: "Schema genererat!",
      createdCount: createdScreeningTimes.length,
      screenings: createdScreeningTimes
    });
  } catch (error) {
    console.error("Kunde inte köra schemagenerering:", error);
    res.status(500).json({ error: "Kunde inte skapa visning" });
  }
});

// GET all screenings
router.get("/api/screening", async (req, res) => {
  try {
    const screening = await Screening.find()
      .populate("auditorium")
      .populate("movie", "title");
    res.status(200).json(screening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a screening by id
router.get("/api/screening/:id", async (req, res) => {
  try {
    const screening = await Screening.findById(req.params.id)
      .populate("auditorium")
      .populate("movie", "title");
    if (!screening) return res.status(404).json({ message: "Ingen visning hittades" });
    res.status(200).json(screening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT existing screening
router.put("/api/screening/:id", async (req, res) => {
  try {
    const screening = await Screening.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!screening) return res.status(404).json({ message: "Ingen visning hittades" });
    res.status(200).json(screening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE screening by id
router.delete("/api/screening/:id", async (req, res) => {
  try {
    const screening = await Screening.findByIdAndDelete(req.params.id);
    if (!screening)
      return res.status(404).json({ message: "Ingen visning hittades att ta bort" });
    res.status(200).json({ message: "Visning raderad" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** GETS all screenings for one movie using ID */
router.get("/api/screenings/movie/:movieId", async (req, res) => {
  try {
    const screenings = await Screening.find({ movie: req.params.movieId })
      .populate("movie", "title imageSrc")
      .populate("auditorium", "name");

    if (!screenings.length) {
      return res.status(404).json({ message: "Inga visningar hittades för denna film" });
    }

    res.json(screenings);
  } catch (error) {
    console.error("Fel vid hämtning av visningar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
