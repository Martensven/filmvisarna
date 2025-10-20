import express from "express";
import { Screening } from "../models/screeningSchema.js";

const router = express.Router();

// Route to Create a new screening
router.post("/api/screening", async (req, res) => {
  try {
    // destructure request body to get necessary fields, expecting movie, auditorium, date, time
    const { movie, auditorium, date, time } = req.body;

    // Create a new screening document with request data and empty bookedSeats array
    // Using Screening model to create a new document
    const newScreening = new Screening({
      movie,
      auditorium,
      date,
      time,
      bookedSeats: []
    });

    const saved = await newScreening.save();

    // Return a success response with created screening details
    res.status(201).json({
      message: "Visning skapad",
      screening: {
        id: saved._id,
        movie: movie.title,
        auditorium: auditorium.name,
        date,
        time
      }
    });
  } catch (error) {
    console.error("Något gick fel vid skapande av visning:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Getting all screenings
router.get("/api/screening", async (req, res) => {
    try{
        const screening = await Screening.find()
        .populate("auditorium")
        .populate('movie', 'title');
        res.status(200).json(screening);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Getting screenings by ID
router.get("/api/screening/:id", async (req, res) => {
    try{
        const screening = await Screening.findById(req.params.id)
        .populate("auditorium")
        .populate('movie', 'title');
        res.status(200).json(screening);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//Changing a allready existing screening
router.put("/api/screening/:id", async (req, res) => {
    try{
        const screening = await Screening.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!screening){
            return res.status(404).json({message: "Can't find any screenings"})
        }
        res.status(204).json(screening)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Deleting a screening by ID
router.delete("/api/screening/:id", async (req, res) => {
    try {
        const screening = await Screening.findOneAndDelete(req.params.id);
        if(!screening) {
            return res.status(404).json({message: "No screening found to delete"})
        }
        res.status(204).json(screening)
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
})

// Get all screenings for a specific movie by movie ID
router.get("/api/screenings/movie/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;

    // Get screenings for the specified movie ID
    const screenings = await Screening.find({ movie: movieId })
      .populate("movie", "title imageSrc")
      .populate("auditorium", "name");

    if (!screenings || screenings.length === 0) {
      return res.status(404).json({ message: "Inga visningar hittades för denna film" });
    }

    res.json(screenings);
  } catch (error) {
    console.error("Fel vid hämtning av visningar för film:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
