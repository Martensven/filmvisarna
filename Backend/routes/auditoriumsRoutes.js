import { Auditorium } from "../models/auditoriumSchema.js";
import express from "express";

const router = express.Router();

// Get all auditoriums
router.get("/api/auditoriums", async (req, res) => {
  try {
    const auditoriums = await Auditorium.find();
    res.status(200).json(auditoriums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get auditorium by id
router.get("/api/auditoriums/:id", async (req, res) => {
  try {
    const auditorium = await Auditorium.findById(req.params.id);
    if (!auditorium) {
      return res.status(404).json({ message: "Auditorium not found" });
    }
    res.status(200).json(auditorium);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a new auditorium
router.post("/api/auditoriums", async (req, res) => {
  try {
    // the body from the request needs to match the schema
    const auditorium = new Auditorium(req.body);
    // Saving the newly added auditorium to the database
    await auditorium.save();
    res.status(201).json(auditorium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update auditorium by id
router.put("/api/auditoriums/:id", async (req, res) => {
    try {
        // Validating with the schema. Returning the updated document with "new: true"
        // Without new: true, the old document would be returned
        // runValidators: true makes sure the updated document is validated against the schema
        const auditorium = await Auditorium.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!auditorium) {
            return res.status(404).json({ message: "Auditorium not found" });
        }
        res.status(200).json(auditorium);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Delete auditorium by id
router.delete("/api/auditoriums/:id", async (req, res) => {
    try {
        // Using params to get id from url. Find and delete the auditorium by the id
        const auditorium = await Auditorium.findByIdAndDelete(req.params.id);
        if (!auditorium) {
            return res.status(404).json({ message: "Auditorium not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
