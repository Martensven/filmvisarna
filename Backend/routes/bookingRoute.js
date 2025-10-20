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
    // Destructure request body, expecting user_id (optional), screening_id, seat_ids, and tickets
    const { user_id, screening_id, seat_ids, tickets: ticketRequests } = req.body;

    // To check if user is logged in or guest
    const user = user_id ? await User.findById(user_id) : null;
  
    // Get screening of movie
    const screening = await Screening.findById(screening_id).populate("auditorium movie");

    // IF no screning is found, return 404
    if (!screening) return res.status(404).json({ error: "Ingen visning hittades" });

    // Check if selected seats are unavailable
    const alreadyBooked = seat_ids.filter(id => screening.bookedSeats.includes(id));
    if (alreadyBooked.length > 0)
      return res.status(400).json({ error: "Platser är redan bokade: " + alreadyBooked.join(", ") });

    // Push booked seats to screening
    screening.bookedSeats.push(...seat_ids);
    await screening.save();

    // Create a seats object for the schema
    // Promise.all to wait for all seat lookups to complete
    // Map each seat_id to an object with seat_id and seatNumber
    const seats = await Promise.all(seat_ids.map(async id => {
      const seat = await Seat.findById(id);
      if (!seat) throw new Error("Inga platser hittades: " + id);
      return { seat_id: seat._id, seatNumber: seat.seatNumber };
    }));

    // Create a tickets object for the schema
    const tickets = await Promise.all(ticketRequests.map(async t => {
        // For each ticket request, find the ticket type in the database
      const ticket = await TicketType.findById(t.ticket_id);
      // If no ticket is found, throw an error
      if (!ticket) throw new Error("Biljett hittades inte: " + t.ticket_id);
      // Return the ticket information formatted for the booking schema
      return {
        ticket_id: ticket._id,
        ticketName: ticket.ticketName,
        quantity: t.quantity,
        pricePerTicket: ticket.price,
        totalPrice: ticket.price * t.quantity
      };
    }));

    // Calculate total price from tickets
    const totalPrice = tickets.reduce((sum, t) => sum + t.totalPrice, 0);

    // Create the booking
    const newBooking = new Booking({
        // if user is logged in, reference their userId. If not, store as null and use guest info.
      userInfo: user
        ? { user_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
        : undefined,
        // screening info is auto-filled from the screening document
      screeningInfo: {
        screening_id: screening._id,
        movieTitle: screening.movie.title,
        auditoriumName: screening.auditorium.name,
        date: screening.date,
        time: screening.time
      },
      seats,
      tickets,
      totalPrice
    });
    // Save the booking to the database
    await newBooking.save();


    // Return the booking with population
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("userInfo.user_id", "firstName lastName email")
      .populate("screeningInfo.screening_id", "movieTitle auditoriumName date time")
      .populate("seats.seat_id")
      .populate("tickets.ticket_id", "ticketName price quantity");

    res.status(201).json(populatedBooking);

    // Creating booking confirmation sent to mail - Sara
    // Getting the information from schema and routes to use the values in the mail for automatically making it refer to user. 
    const userMailConfirm = populatedBooking.userInfo;
    const screeningInformation = populatedBooking.screeningInfo;
    const seatInfo = populatedBooking.seats || [];
    const ticketInfo = populatedBooking.tickets || [];

    if(!userMailConfirm?.email) {
        console.warn("Ingen epostadress hittades, inget mejl har skickats")
    } else {
        //Maping through the seat list to return data
        const seatListInformation = seatInfo.map(s => s.seatNumber).join(", ");
        const ticketListInformation = ticketInfo.map(t => `${t.ticket_id?.ticketName} (${t.quantity} st x ${t.pricePerTicket} kr)`).join("<br>");
        // Due to date and time being Strings in schema, I needed to fetch data as this to make the date and ptime be shown in mail. 
        const formateDate = screeningInformation.date;
        const formanteTime = screeningInformation.time;

        // Sending the mail 
        await sendMail({
        to: userMailConfirm.email,
        subject: "Filmvisarna - Bokningsbekräftelse",
        text: "Tack för din bokning hos Filmvisarna",
        html: `
        <h2>Hej ${userMailConfirm.firstName}!<h2>
        <hr>
        <p>Tack för din bokning med ordernummer: ${newBooking._id}</p>
        

        <p>Din bokning gäller: <strong>${screeningInformation.movieTitle}</strong>.</p>
        <p><strong>Datum och tid:</strong> ${formateDate}, klockan ${formanteTime}.</p>

        <p><strong>Salong:</strong> ${screeningInformation.auditoriumName}.</p>
        <p><strong>Platser:</strong> Stol ${seatListInformation}.</p>
        <p><strong>Biljetter:</strong> ${ticketListInformation}.</p>
        <hr>
        <p><strong>Totalsumma:</strong> ${populatedBooking.totalPrice} kr.</p>
     
        <p>Biljetterna hämtas ut i kassan. Glöm inte att besöka vår kiosk inför filmvisningen.`
    });
    console.log("Orderbekräftelse har skickats iväg som mejl till", userMailConfirm.email);
    }

 


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte skapa bokning" });
  }
});

// Get all bookings
router.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("userInfo.user_id", "firstName lastName email")
            .populate("screeningInfo.screening_id", "movieTitle auditoriumName date time")
            .populate("seats.seat_id")
            .populate("tickets.ticket_id", "ticketName price quantity");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve bookings" });
    }
});

// Get booking by ID
router.get("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("userInfo.user_id", "firstName lastName email")
            .populate("screeningInfo.screening_id", "movieTitle auditoriumName date time")
            .populate("seats.seat_id")
            .populate("tickets.ticket_id", "ticketName price quantity");

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
            .populate("userInfo.user_id", "firstName lastName email")
            .populate("screeningInfo.screening_id", "movieTitle auditoriumName date time")
            .populate("seats.seat_id")
            .populate("tickets.ticket_id", "ticketName price quantity");

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
            .populate("userInfo.user_id", "firstName lastName email")
            .populate("screeningInfo.screening_id", "movieTitle auditoriumName date time")
            .populate("seats.seat_id")
            .populate("tickets.ticket_id", "ticketName price quantity");

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