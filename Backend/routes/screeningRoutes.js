import express from "express";
import { Screening } from "../models/screeningSchema.js";
import { generateAndSave } from "./../generateScreeningTimes.js";

const router = express.Router();


// Create a new screening both manually or automatically
router.post("/api/screening", async (req, res) => {
  try {
    //Create a automatically generated screening
    const { movie, auditorium, date, time, scheduleType, generate } = req.body;

    if (generate === true) {
      if (!movie) {
        return res.status(400).json({ error: "Movie ID krävs för att generera visningsdagar och tider" });
      }
      const createdScreening = await generateAndSave(movie);
      return res.status(201).json({
        message: `${createdScreening.length} sparades automatiskt`,
        screenings: createdScreening,
      });
    }

    //Create a manually screening with scheduleType
    if (!movie || !auditorium || !date || !time || !scheduleType) {
      return res.status(400).json({
        error: "Alla nämnda fält måste fyllas i (movie, auditorium, date, time och scheduleType"
      });
    }
    const showTime = new Date(`${date}T${time}:00`);

    const newScreening = new Screening({
      movie,
      auditorium,
      date,
      time,
      showTime,
      bookedSeats: [],
      pendingSeats: [],
      scheduleType,
    });

    const saved = await newScreening.save();

    res.status(201).json({
      message: "Visning skapad manuellt",
      screening: saved
    });
  } catch (error) {
    console.error("Något gick fel vid skapande av visning:", error);
    res.status(500).json({ error: "Internal server error" });
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

router.delete("/api/screening", async (req, res) => {
  try {
    const screening = await Screening.find().deleteMany();
    res.status(200).json(screening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export default router;
