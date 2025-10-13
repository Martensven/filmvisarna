import { Genres } from "../models/genresSchema.js";
import express from "express";

const router = express.Router();

// Posting a new genre 
router.post("/api/genres", async (req, res) => {
  try {
    const genres = new Genres(req.body); //New table should like the one in schema
    await genres.save();
    res.status(201).json(genres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Getting all genres
router.get("/api/genres", async (req, res) => {
    try{
      const genres = await Genres.find();
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})

// get genre from id instead of calling all
router.get("/api/genres/:id", async (req, res) => {
    try{
      const genres = await Genres.findById(req.params.id);
      if(!genres){
        res.status(404).json({ message: "No genre with that name."})
      }
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})
// update a genre by id
router.put("/api/genres/:id", async (req, res) => {
  try{
    const genres = await Genres.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!genres){
      res.status(404).json({ message: "No genre with that name."})
    }
    res.status(200).json(genres);
  } catch {
    res.status(500).json({ message: error.message });
  }
})
// delete a genre by id
router.delete("/api/genres/:id", async (req, res) => {
  try {
    const genres = await Genres.findByIdAndDelete(req.params.id);
    if(!genres){
       return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

export default router