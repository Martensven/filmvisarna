import express from "express";
import { Booking } from "../models/bookingSchema.js";
import { Seat } from "../models/seatSchema.js";
import { TicketType } from "../models/ticketTypeSchema.js";
import { Screening } from "../models/screeningSchema.js";
import { User } from "../models/userSchema.js";
import sendMail from "../nodemailer/sendMail.js";
import { getIo } from "../websockets/sockets.js";

const router = express.Router();

// Create a new booking
router.post("/api/bookings", async (req, res) => {
  try {
    const {
      user_id,
      screening_id,
      seat_ids,
      tickets: ticketRequests,
    } = req.body;

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
    const alreadyBooked = seat_ids.filter((id) =>
      screening.bookedSeats.includes(id)
    );
    if (alreadyBooked.length > 0)
      return res.status(400).json({
        error: "Platser är redan bokade: " + alreadyBooked.join(", "),
      });

    // ✅ Reserve seats in screening
    screening.bookedSeats.push(...seat_ids);
    await screening.save();

    try {
      const io = getIo();
      io.to(screening._id.toString()).emit("seatUpdate", {
        bookedSeats: screening.bookedSeats,
        pendingSeats: [],
      });
      console.log(`Seat update emitted for screening ${screening._id}`);
    } catch (e) {
      console.warn("Socket emit failed:", e.message);
    }

    // ✅ Build seat info
    const seats = await Promise.all(
      seat_ids.map(async (id) => {
        const seat = await Seat.findById(id);
        if (!seat) throw new Error("Inga platser hittades: " + id);
        return { seat_id: seat._id, seatNumber: seat.seatNumber };
      })
    );

    // ✅ Build ticket info
    const tickets = await Promise.all(
      ticketRequests.map(async (t) => {
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

    // ✅ Save booking (trigger pre-save hook for bookingNumber)
    const newBooking = new Booking({
      user_id: user ? user._id : null,
      screening_id: screening._id,
      seats,
      tickets,
      totalPrice,
    });

    await newBooking.save();

    // ✅ Populate references for response
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user_id", "firstName lastName email")
      .populate("screening_id", "movie date time auditorium")
      .populate("seats.seat_id")
      .populate("tickets.ticket_id");

    res.status(201).json(populatedBooking);

    // ✅ Mail sending
    if (user?.email) {
      console.log("försöker skicka mejl till, ", user.email)
      console.log("📂 Nuvarande mapp:", process.cwd());
      const seatList = seats.map((s) => s.seatNumber).join(", ");
      const ticketList = tickets
        .map((t) => `${t.ticketName} (${t.quantity} x ${t.pricePerTicket} kr)`)
        .join("<br>");

      try {
        await sendMail({
        to: user.email,
        subject: "Filmvisarna - Bokningsbekräftelse",
        html: `
          <div style="font-family: Noto Serif, san-serif; padding:10px;">
            <table align="center" width="600" cellpadding="0" cellspacing="3">
              <tr>
                <td style="background-color:#243365; padding:5px;" 
                width="600" height="120" align="left">
          
                  <img src="cid:logo" alt="Filmvisarnas logga" width="150" style="margin:10px 20px 2px 20px;" > 
                  <h2 style="color:white; font-size:20px; margin:1px 20px 10px 20px;" align="center">Bokningsbekräftelse</h2>
           
                </td>
              </tr>
            </table>

            <table align="center" width="600" cellpadding="0" cellspacing="3">
              <tr>
                <td style="color:white; text-align:center; padding:5px; background: linear-gradient(160deg, #243365, #151d3aff);" width="600" align="center">
                  <h2 style="margin:3px;">Hej ${user.firstName}! 🙂</h2>
                  <p style="margin-top:1px;">Tack för att du bokar din bioupplevelse hos oss!</p>

                  <div align="center" width="300" style="color:white; background-color: #243b8685; border:2px solid #243365; border-radius:5px; margin:20px; padding:10px;">
                    <h2 style="text-align:center; " width="100" height="100">Din Bokning</h2>
                    <p><strong>Ordernummer:</strong> ${newBooking.bookingNumber}</p>
                    <p><strong>Film:</strong> ${screening.movie.title}</p>
                
                    <p><strong>Datum & tid:</strong> ${screening.date}, ${screening.time}</p>
                    <p><strong>Salong:</strong> ${screening.auditorium.name}</p>
                    <p><strong>Platser:</strong> ${seatList}</p>
                    <p><strong>Biljetter:</strong><br>${ticketList}</p>
                    <p><strong>Total:</strong> ${totalPrice} kr</p>
                    <p>Vi ses på bion! 🍿🎬</p>
                  </div>

                  <div style="color:white; margin:20px 5px 25px 5px;" align="center">
                    <h1 style="font-size:25px; margin:3px;">Filmvisarna</h1>
                    <h3 style="font-size:20px; margin:2px 0px;">Kontakt</h3>
                    <p style="font-size:15px; margin:2px;">Epost: info@filmvisarna.se</p>
                    <p style="font-size:15px; margin:2px;">Telefon: 123-456 78 90</p>
                    <p style="font-size:15px; margin:2px;">Adress: Biogatan 1, 123 45, Filmstaden</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        `,
        attachments: [
          {
            filename: "LoggoMail.png",
            path: "./assets/LoggoMail.png",
            cid: "logo",
          },
        ],
      });

      console.log("Mail skickat till", user.email);
    } catch (err) {
      console.error("Kunde inte skicka iväg mejl", err)
    }
    }
   
    if (!user && req.body.guestInfo?.email) {
      const { firstName, email } = req.body.guestInfo;
      await sendMail({
        to: email,
        subject: "Filmvisarna - Bokningsbekräftelse",
        html: `
      <h2>Hej ${firstName || "Gäst"}!</h2>
      <p>Tack för din bokning hos Filmvisarna!</p>
      <p><strong>Ordernummer:</strong> ${newBooking._id}</p>
      <p><strong>Total:</strong> ${totalPrice} kr</p>
      <p>Vi ses på bion! 🍿🎬</p>
    `,
      });
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
      .populate("user_id", "firstName lastName email")
      .populate({
        path: "screening_id",
        populate: [
          { path: "movie", select: "title imageSrc length" },
          { path: "auditorium", select: "name" },
        ],
        select: "movie date time auditorium",
      })
      .populate("seats.seat_id", "seatNumber rowNumber")
      .populate("tickets.ticket_id", "ticketName price");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error retrieving booking:", error);
    res.status(500).json({ message: "Failed to retrieve booking", error });
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
    res
      .status(500)
      .json({ errorMSG: "Failed to retrieve bookings for user", error });
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
    // Find the booking by ID
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ errorMSG: "Bokningen hittades inte." });
    }

    // Find the related screening
    const screening = await Screening.findById(booking.screening_id);
    if (!screening) {
      return res.status(404).json({ errorMSG: "Visningen hittades inte." });
    }

    // check if cancellation is at least 2 hours before screening
    const screeningDateTime = new Date(`${screening.date}T${screening.time}`);
    const now = new Date();
    const diffInMs = screeningDateTime - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 2) {
      return res.status(400).json({
        errorMSG:
          "Det går inte att avboka biljetter mindre än två timmar före visningen.",
      });
    }

    // remove booked seats from screening
    const bookedSeatIds = booking.seats.map((seat) => seat.seat_id.toString());
    screening.bookedSeats = screening.bookedSeats.filter(
      (seatId) => !bookedSeatIds.includes(seatId.toString())
    );
    await screening.save();

    // delete the booking
    await Booking.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Avbokning genomförd" });
  } catch (error) {
    console.error("Fel vid avbokning:", error);
    res.status(500).json({
      errorMSG: "Kunde inte avboka.",
      details: error.message,
    });
  }
});

export default router;
