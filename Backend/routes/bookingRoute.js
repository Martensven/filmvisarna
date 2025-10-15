import express from "express";
import { Booking } from "../models/bookingSchema.js";

const router = express.Router();

// Create a new booking
router.post("/api/bookings", async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);

        const populatedBooking = await Booking.findById(newBooking._id)
            .populate("user_id", "firstName lastName email")
            .populate("screening_id", "movieTitle auditoriumName date time")
            .populate("seat_id")
            .populate("ticketType_id", "ticketTypes");

        res.status(201).json(populatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create booking" });
    }
});

// Get all bookings
router.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("user_id", "firstName lastName email")
            .populate("screening_id", "movieTitle auditoriumName date time")
            .populate("seat_id")
            .populate("ticketType_id", "ticketTypes");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve bookings" });
    }
});

// Get booking by ID
router.get("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("user_id", "firstName lastName email")
            .populate("screening_id", "movieTitle auditoriumName date time")
            .populate("seat_id")
            .populate("ticketType_id", "ticketTypes");

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve booking" });
    }
});

// Get bookings by user ID
router.get("/api/bookings/user/:user_id", async (req, res) => {
    try {
        const bookings = await Booking.find({ user_id: req.params.user_id })
            .populate("user_id", "firstName lastName email")
            .populate("screening_id", "movieTitle auditoriumName date time")
            .populate("seat_id")
            .populate("ticketType_id", "ticketTypes");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve bookings" });
    }
});

// Update booking by ID
router.put("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .populate("user_id", "firstName lastName email")
            .populate("screening_id", "movieTitle auditoriumName date time")
            .populate("seat_id")
            .populate("ticketType_id", "ticketTypes");

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: "Failed to update booking" });
    }
});

// Delete booking by ID
router.delete("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete booking" });
    }
});

export default router;