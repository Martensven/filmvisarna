import express from "express";
import { Booking } from "../models/bookingSchema.js";
import { Seat } from "../models/seatSchema.js";
import { TicketType } from "../models/ticketTypeSchema.js";
import { Screening } from "../models/screeningSchema.js";
import { User } from "../models/userSchema.js";
import sendMail from "../nodemailer/sendMail.js";

const router = express.Router();

// Create a new booking
router.post("/api/bookings", async (req, res) => {
  try {
    const { user_id, screening_id, seat_ids, tickets: ticketRequests } = req.body;

    console.log("REQ BODY:", req.body); // Debug

    // ✅ Find user if logged in
    const user = user_id ? await User.findById(user_id) : null;

    // ✅ Find screening
    const screening = await Screening.findById(screening_id).populate(
      "auditorium movie"
    );
    if (!screening)
      return res.status(404).json({ error: "Ingen visning hittades" });

    // ✅ Check already booked seats
    const alreadyBooked = seat_ids.filter(id =>
      screening.bookedSeats.includes(id)
    );
    if (alreadyBooked.length > 0)
      return res.status(400).json({
        error: "Platser är redan bokade: " + alreadyBooked.join(", "),
      });

    // ✅ Reserve seats in screening
    screening.bookedSeats.push(...seat_ids);
    await screening.save();

    // ✅ Build seat info
    const seats = await Promise.all(
      seat_ids.map(async id => {
        const seat = await Seat.findById(id);
        if (!seat) throw new Error("Inga platser hittades: " + id);
        return { seat_id: seat._id, seatNumber: seat.seatNumber };
      })
    );

    // ✅ Build ticket info
    const tickets = await Promise.all(
      ticketRequests.map(async t => {
        const ticketData = await TicketType.findById(t.ticket_id);
        if (!ticketData)
          throw new Error("Biljett hittades inte: " + t.ticket_id);
        return {
          ticket_id: ticketData._id,
          ticketName: ticketData.ticketName,
          quantity: t.quantity,
          pricePerTicket: ticketData.price,
          totalPrice: ticketData.price * t.quantity,
        };
      })
    );

    const totalPrice = tickets.reduce((sum, t) => sum + t.totalPrice, 0);

    // ✅ Save booking
    const newBooking = await Booking.create({
      user_id: user ? user._id : null,
      screening_id: screening._id,
      seats,
      tickets,
      totalPrice,
    });

    // ✅ Populate references for response
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user_id", "firstName lastName email")
      .populate("screening_id", "movie date time auditorium")
      .populate("seats.seat_id")
      .populate("tickets.ticket_id");

    res.status(201).json(populatedBooking);

    // ✅ Mail sending
    if (user?.email) {
      const seatList = seats.map(s => s.seatNumber).join(", ");
      const ticketList = tickets
        .map(
          t =>
            `${t.ticketName} (${t.quantity} x ${t.pricePerTicket} kr)`
        )
        .join("<br>");

      await sendMail({
        to: user.email,
        subject: "Filmvisarna - Bokningsbekräftelse",
        html: `
          <h2>Hej ${user.firstName}!</h2>
          <p>Tack för din bokning!</p>
          <p><strong>Ordernummer:</strong> ${newBooking._id}</p>
          <p><strong>Film:</strong> ${screening.movie.title}</p>
          <p><strong>Datum & tid:</strong> ${screening.date} ${screening.time}</p>
          <p><strong>Salong:</strong> ${screening.auditorium.name}</p>
          <p><strong>Platser:</strong> ${seatList}</p>
          <p><strong>Biljetter:</strong><br>${ticketList}</p>
          <p><strong>Total:</strong> ${totalPrice} kr</p>
          <p>Vi ses på bion! 🍿🎬</p>
        `,
      });

      console.log("Mail skickat till", user.email);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMsg: "Kunde inte skapa bokning", error });
  }
});

// Get all bookings
router.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id", "firstName lastName email")
      .populate("screening_id", "movie date time auditorium")
      .populate("seats.seat_id")
      .populate("tickets.ticket_id");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ errorMSG: "Failed to retrieve bookings", error });
  }
});

// Get booking by ID
router.get("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user_id", "user_id firstName lastName email")
      .populate(
        "screening_id",
        "movieTitle auditoriumName date time"
      )
      .populate("seats.seat_id")
      .populate("tickets", "ticketName price quantity");

    if (!booking) {
      return res.status(404).json({ errorMsg: "Booking not found", error });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ errorMsg: "Failed to retrieve booking", error });
  }
});

// Get bookings by user ID
router.get("/api/bookings/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query; // "past" eller "upcoming"

    const bookings = await Booking.find({ user_id: id })
      .populate("user_id", "firstName lastName email")
      .populate({
        path: "screening_id",
        populate: { path: "movie auditorium" },
      })
      .populate("seats.seat_id")
      .populate("tickets.ticket_id");

    const now = new Date();
    const parseBookingDate = (b) =>
      new Date(`${b.screening_id.date} ${b.screening_id.time}`);

    let filtered = bookings;

    if (type === "upcoming") {
      filtered = bookings.filter((b) => parseBookingDate(b) >= now);
    } else if (type === "past") {
      filtered = bookings.filter((b) => parseBookingDate(b) < now);
    }

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ errorMSG: "Failed to retrieve bookings for user", error });
  }
});


// Update booking by ID
router.put("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("user_id", "firstName lastName email")
      .populate("screening_id", "movie date time auditorium")
      .populate("seats.seat_id")
      .populate("tickets.ticket_id");

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
    // Find the booking we want to delete using ID from params
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Find the screening belonging to our booking
    // Getting the screening from the booking to be able to remove the booked seats
    const screening = await Screening.findById(
      booking.screeningInfo.screening_id
    );
    if (screening) {
      // Create a list of booked seat IDs from the booking

      const bookedSeatIds = booking.seats.map((seat) =>
        seat.seat_id.toString()
      );
      // Filter out the bookedSeatIds from the screening's bookedSeats array
      screening.bookedSeats = screening.bookedSeats.filter(
        (seatId) => !bookedSeatIds.includes(seatId.toString())
      );
      // Save the updated screening belonging to our booking
      await screening.save();
    }
    // Delete the booking
    await Booking.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Avbokning genomförd" });
  } catch (error) {
    console.error("Fel vid avbokning:", error);
    res.status(500).json({ error: "Kunde inte avboka" });
  }
});

export default router;
