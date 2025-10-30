import { Auditorium } from "../models/auditoriumSchema.js";
import { Seat } from "../models/seatSchema.js";
import express from "express";

const router = express.Router();

// Get all auditoriums
router.get("/api/auditoriums", async (req, res) => {
  try {
    const auditoriums = await Auditorium.find().populate('seats');
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
// Get auditorium seats by id
router.get('/api/auditoriums/:id/seats', async (req, res) => {
  try {
    const auditoriumSeats = await Auditorium.findById(req.params.id).populate('seats');
    if (!auditoriumSeats) {
      return res.status(404).json({ message: "Auditorium not found" });
    }
    res.status(200).json(auditoriumSeats.seats);
  } catch (error) {
    res.status(500).json({ message: error.meassage });
  }
});


// ------ Admin routes --------

// create a new auditorium

router.post("/api/auditoriums", async (req, res) => {
  try {
    // Expecting the body from the request to have "name" and "rows"
    // "rows" is an array of objects with "rowNumber", "seats" and "accessibleSeats"
    const { name, rows } = req.body;

    // Create and save the auditorium first without seats
    // Using the Auditorium model schema
    // name comes from the body of the request
    const auditorium = new Auditorium({ name });
    await auditorium.save();

    // Loop through each row in "rows" from the body of the request
    // Create seats using the Seat model schema
    // Each seat gets a rowNumber, seatNumber, auditoriumId and accessible (true/false)
    // auditoriumId is the id of the auditorium we created above
    // accessible is true if the seatNumber is in the accessibleSeats array for that row
    for (const row of rows) {
      for (let seatNumber = 0; seatNumber < row.seats; seatNumber++) {
        const seat = new Seat({
          rowNumber: row.rowNumber,
          seatNumber,
          auditoriumId: auditorium._id,
          accessible: row.accessibleSeats.includes(seatNumber)
        });
        // Save each seat to the database
        await seat.save();
        // Add the seat to the auditorium's seats array
        auditorium.seats.push(seat._id);
      }
    }

    // Save the auditorium again with the seats
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