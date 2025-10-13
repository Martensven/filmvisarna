import { Booking } from "../models/bookingSchema.js";
import express from "express";

const router = express.Router();

// Create a new booking
router.post("/api/bookings", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: "Failed to create booking" });
    }
});

// get all bookings
router.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve bookings" });
    }
});

// Get a booking by ID
router.get("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve booking" });
    }
});

// get bookings by userId
router.get("/api/bookings/user/:user_Id", async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.user_Id });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve bookings" });
    }
});

// Update a booking by ID
router.put("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).json({ error: "Booking succesfully deleted" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: "Failed to update booking" });
    }
});


// Delete a booking by ID
router.delete("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking succesfully deleted" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete booking" });
    }
});

export default router;



