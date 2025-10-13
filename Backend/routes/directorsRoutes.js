import { Directors } from "../models/directorsSchema.js";
import express from "express";

const router = express.Router();

// Posting a new director 
router.post("/api/directors", async (req, res) => {
  try {
    const directors = new Directors(req.body); //New table should like the one i schema
    await directors.save();
    res.status(201).json(directors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Getting all directors
router.get("/api/directors", async (req, res) => {
    try{
      const directors = await Directors.find();
      res.status(200).json(directors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})

// get director from id instead of calling all
router.get("/api/directors/:id", async (req, res) => {
    try{
      const directors = await Directors.findById(req.params.id);
      if(!directors){
        res.status(404).json({ message: "No director with that name."})
      }
      res.status(200).json(directors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})

router.put("/api/directors/:id", async (req, res) => {
  try{
    const directors = await Directors.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!directors){
      res.status(404).json({ message: "No director with that name."})
    }
    res.status(200).json(directors);
  } catch {
    res.status(500).json({ message: error.message });
  }
})

router.delete("/api/directors/:id", async (req, res) => {
  try {
    const directors = await Directors.findByIdAndDelete(req.params.id);
    if(!directors){
       return res.status(404).json({ message: 'Director not found' });
    }
    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

export default router