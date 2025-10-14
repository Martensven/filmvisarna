import { Actors } from "../models/actorSchema.js";
import express from "express";

const router = express.Router();

// Get all actors
router.get("/api/actors", async (req, res) => {
  try {
    const actors = await Actors.find();
    res.status(200).json(actors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get actor by id
router.get("/api/actors/:id", async (req, res) => {
  try {
    const actor = await Actors.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a new actor
router.post("/api/actors", async (req, res) => {
  try {
    // the body from the request needs to match the schema
    const actor = new Actors(req.body);
    // Saving the newly added actor to the database
    await actor.save();
    res.status(201).json(actor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update actor by id
router.put("/api/actors/:id", async (req, res) => {
    try {
        // Validating with the schema. Returning the updated document with "new: true"
        // Without new: true, the old document would be returned
        // runValidators: true makes sure the updated document is validated against the schema
        const actor = await Actors.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }
        res.status(200).json(actor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Delete actor by id
router.delete("/api/actors/:id", async (req, res) => {
    try {
        // Using params to get id from url. Find and delete the actor by the id
        const actor = await Actors.findByIdAndDelete(req.params.id);
        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;