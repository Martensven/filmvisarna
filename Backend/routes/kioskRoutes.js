import { Kiosk } from "../models/kioskSchema.js";
import express from "express";

const router = express.Router();

// Get all items in kiosk
router.get("/api/kiosk", async (req, res) => {
  try {
    const items = await Kiosk.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get kiosk item by id
router.get("/api/kiosk/:id", async (req, res) => {
  try {
    const item = await Kiosk.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Ingen vara hittades" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a new item
router.post("/api/kiosk", async (req, res) => {
  try {
    // the body from the request needs to match the schema
    const item = new Kiosk(req.body);
    // Saving the newly added item to the database
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an item by id
router.put("/api/kiosk/:id", async (req, res) => {
  try {
    // Validating with the schema. Returning the updated document with "new: true"
    // Without new: true, the old document would be returned
    // runValidators: true makes sure the updated document is validated against the schema
    const item = await Kiosk.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ message: "Ingen vara hittades" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete item by id
router.delete("/api/kiosk/:id", async (req, res) => {
  try {
    // Using params to get id from url. Find and delete the item by the id
    const item = await Kiosk.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Ingen vara hittades" });
    }
    res.status(200).json({ message: "Vara raderad", deletedItem: item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
