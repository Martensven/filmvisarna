import { Auditorium } from "../models/auditoriumSchema.js";
import express from "express";

const router = express.Router();

// Get all auditoriums
router.get("/api/auditoriums", async (req, res) => {
  try {
    const auditoriums = await Auditorium.find().populate;
    res.status(200).json(auditoriums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get auditorium by id
router.get("/api/auditoriums/:id", async (req, res) => {
  try {
    const auditorium = await Auditorium.findById(req.params.id).populate('seats');
    if (!auditorium) {
      return res.status(404).json({ message: "Auditorium not found" });
    }
    res.status(200).json(auditorium);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
