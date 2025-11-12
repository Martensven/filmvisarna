import express, { Router } from "express";
import { Booking } from "../models/bookingSchema.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { Screening } from "../models/screeningSchema.js";
import { User } from "../models/userSchema.js";
import sendMail from "../nodemailer/sendMail.js";
import { Movies } from "../models/moviesSchema.js";
import { Auditorium } from "../models/auditoriumSchema.js";
import schedule from "../schedule.js";
import { get } from "mongoose";

const router = express.Router();
// Middleware to check if user is admin for all admin routes
router.use(isAdmin);

// ------------ Admin User routes ------------ //

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("ADMIN USER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// get user by id
router.get("/admin/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update user by id
router.put("/admin/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete user by id
router.delete("/admin/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get bookings by user ID

router.get("/bookings/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.params.userId })
      .populate({
        path: "screening_id",
        populate: [
          { path: "movie", select: "title" },
          { path: "auditorium", select: "name" },
        ],
      })
      .populate("seats.seat_id")
      .populate("tickets.ticket_id");

    res.json(bookings);
  } catch (error) {
    console.error("Fel vid hämtning av bokningar:", error);
    res.status(500).json({ error: "Kunde inte hämta bokningar" });
  }
});

// DELETE bookings/:bookingId

router.delete("/bookings/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Bokning hittades inte" });
    }

    res.status(200).json({ message: "Bokningen har avbokats" });
  } catch (error) {
    console.error("Fel vid borttagning av bokning:", error);
    res.status(500).json({ message: "Kunde inte ta bort bokningen" });
  }
});

// -------------Screening routes for admin ------------- //

// Get all screenings with pagination and sorting
router.get("/screenings", async (req, res) => {
  try {
  // Page is which page number.
  const page = parseInt(req.query.page) || 1;
  // Limit is how many items per page.
  const limit = parseInt(req.query.limit9) || 10;
  // SortBy is which field to sort by.
  const sortBy = req.query.sortBy || "date";
  // SortDir is the direction of the sort, either ascending or descending.
  const sortDir = req.query.sortDir === "desc" ? -1 : 1;

  const now = new Date();
  // picking out today's date in YYYY-MM-DD format
  const today = now.toISOString().split("T")[0];
  // picking out current time in HH:MM format
  const currentTime = now.toISOString().slice(11, 16);

  // we only want to show screenings from today and onwards
  const query = {
    // $oroperator to combine two conditions
    // $gtmeans greater than
    // $gtemeans greater than or equal to
  
    $or: [
      { date: { $gt: today } },
      // if date is today, we want to show screenings with time greater than or equal to current time
      { date: today, time: { $gte: currentTime } },
    ],
  };
  // Calculate total number of screenings matching the query
  const total = await Screening.countDocuments(query);
  
  const sortCriteria =
    sortBy === "date"
      ? { date: sortDir, time: sortDir }
      : { [sortBy]: sortDir };

  // Fetch screenings with pagination and sorting
  //.populate to get related auditorium and movie details
  //.skip to skip documents for pagination
  //.limit to limit number of documents per page
  //.lean to get plain JavaScript objects instead of Mongoose documents
  const screenings = await Screening.find(query)
    .populate("auditorium")
    .populate("movie")
    .sort(sortCriteria)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

// Format screenings data to include necessary details
const formatted = screenings.map((s) => {
  const auditorium = s.auditorium;
  const totalSeats = auditorium.seats.length;

  return {
    id: s._id,
    movieTitle: s.movie.title,
    date: s.date,
    time: s.time,
    auditorium: auditorium.name,
    bookedCount: s.bookedSeats.length,
    totalSeats,
  };
});
// Send response with formatted data and pagination info
res.json({
  data: formatted,
  total,
  page,
  totalPages: Math.ceil(total / limit),
});
} catch (err) {
  console.log(err);
  res.status(500).json({ error: "server error" });
}
});
  

// Get screenings with booked seats count for today

router.get("/screenings/today", async (req, res) => {
  try {
    const date = req.query.date;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "time";
    const sortDir = req.query.sortDir === "desc" ? -1 : 1;
    
    const total = await Screening.countDocuments({ date });

    const sortCriteria =
      sortBy === "date"
        ? { date: sortDir, time: sortDir }
        : { [sortBy]: sortDir };

        const screenings = await Screening.find({ date })
        .populate("auditorium")
        .populate("movie")
        .sort(sortCriteria)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

        const formatted = screenings.map((s) => {
          const auditorium = s.auditorium;
          const totalSeats = auditorium.seats.length;

          return {
            id: s._id,
            movieTitle: s.movie.title,
            date: s.date,
            time: s.time,
            auditorium: auditorium.name,
            bookedCount: s.bookedSeats.length,
            totalSeats,
          };
        
        });

        res.json({
          data: formatted,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
})

// router.get("/screenings/today", async (req, res) => {
//   try {
//     const date = req.query.date;

//     const screenings = await Screening.find({ date })
//       .populate("auditorium")
//       .populate("movie")

//       .lean();

//     const formatted = screenings.map((s) => {
//       const auditorium = s.auditorium;
//       const totalSeats = auditorium.seats.length;

//       return {
//         id: s._id,
//         movieTitle: s.movie.title,
//         time: s.time,
//         auditorium: auditorium.name,
//         bookedCount: s.bookedSeats.length,
//         totalSeats,
//       };
//     });

//     res.json(formatted);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "server error" });
//   }
// });

// get one
router.get("/screenings/:id", async (req, res) => {
  const s = await Screening.findById(req.params.id)
    .populate("auditorium")
    .populate("movie")
    .lean();

  res.json({
    id: s._id,
    movieTitle: s.movie.title,
    time: s.time,
    auditoriumName: s.auditorium.name,
    auditoriumId: s.auditorium._id.toString(),
  });
});

// update
router.put("/screenings/:id", async (req, res) => {
  const { time, auditoriumId } = req.body;
  const screening = await Screening.findById(req.params.id).populate(
    "movie auditorium"
  );

  await Screening.findByIdAndUpdate(req.params.id, {
    time,
    auditorium: auditoriumId,
  });

  const userBookings = await Booking.find({
    screening_id: req.params.id,
  }).populate("user_id");

  for (const booking of userBookings) {
    if (booking.user_id && booking.user_id.email) {
      await sendMail({
        to: booking.user_id.email,
        subject: "Filmvisarna - Uppdatering av din bokning",
        html: `Hej ${booking.user_id.firstName},<br><br>Vi vill informera dig om att din bokning 
              för filmen ${screening.movie.title} ${screening.date} har uppdaterats. Den nya 
              tiden är ${time} i "${screening.auditorium.name}".<br><br>
              Vi ser fram emot ditt besök!<br><br>Vänliga hälsningar,<br>Filmvisarna`,
      });
    }
  }

  res.json({ ok: true });
});

// delete
router.delete("/screenings/:id", async (req,res)=>{
  const screening = await Screening.findById(req.params.id)
    .populate("movie")
    .lean()

  if (!screening) return res.status(404).json({ error: "Visning saknas" })

  // Get bookings to be able to notify users
  const bookings = await Booking.find({ screening_id: req.params.id })
    .populate("user_id")

  // Delete screening
  await Screening.findByIdAndDelete(req.params.id)

  // Mail users about deleted screening
  await Promise.all(
    bookings.map(b => {
      if (!b.user_id?.email) return
      return sendMail({
        to: b.user_id.email,
        subject: "Filmvisarna – visning inställd",
        html: `
          <h2>Hej ${b.user_id.firstName}!</h2>
          <p>Visningen du har bokat är tyvärr inställd.</p>
          <p>${screening.movie.title}, ${screening.date}, ${screening.time}</p>
          <p>Kontakta oss vid frågor.</p>
          <p>Vänliga hälsningar,<br/>Filmvisarna</p>
        `
      })
    })
  )

  res.json({ ok: true })
})

router.post("/screenings", async (req, res) => {
  try {
    // Validating input data from request body
    const { movieId, date, time, salonName } = req.body;
    // Check for missing fields
    if (!movieId || !date || !time || !salonName) {
      return res
        .status(400)
        .json({ error: "movieId, date, time och salonName krävs" });
    }
    // Check if movie exists by using the provided movieId from request body
    const movie = await Movies.findById(movieId);
    if (!movie) return res.status(404).json({ error: "Film hittades inte" });
    // Check if auditorium exists by using the provided salonName from request body
    const auditorium = await Auditorium.findOne({ name: salonName });
    if (!auditorium)
      return res.status(400).json({ error: "Salong hittades inte" });

    // Check timeslots from schedule.js based on salon type
    const allowedTimes =
      salonName === "Lilla Salongen"
        ? schedule.smallTheaterTimes
        : schedule.bigTheaterTimes;

        if (!allowedTimes.includes(time)) {
          return res.status(400).json({ error: "Ogiltig tid för vald salong" });
        }

    // Check for conflicting screenings in the same auditorium at the same date and time
    // Sending in date and time from request body
    const conflictingScreening = await Screening.findOne({
      auditorium: auditorium._id,
      date,
      time,
    });

    if (conflictingScreening) {
      return res
        .status(400)
        .json({ error: "Det finns redan en visning i denna salong vid denna tid" });
    }

    // Determine schedule type based on salon name
    const scheduleType = salonName === "Lilla Salongen" ? "smallTheater" : "bigTheater";

    const newScreening = new Screening({
      movie: movieId,
      auditorium: auditorium._id,
      date,
      time,
      showTime: new Date(`${date}T${time}:00`),
      bookedSeats: [],
      scheduleType,
    });

    await newScreening.save();
    res.status(201).json({ message: "Visning skapad", newScreening });
  } catch (error) {
    console.error("Fel vid skapande av visning:", error);
    res.status(500).json({ error: "Serverfel, Kunde inte skapa visning" });
  }
});

// Get available and taken times for a specific date and theater
router.get("/schedule", async (req, res) => {
  try {
    // Validating query parameters from request
    const { date, theaterName } = req.query;

    // Check for missing fields
    if (!date || !theaterName) {
      return res.status(400).json({ error: "date och theaterName krävs" });
    }

    // Check if auditorium exists by using the provided theaterName from request query
    const auditorium = await Auditorium.findOne({ name: theaterName });
    if (!auditorium) return res.status(400).json({ error: "Salong saknas" });

    // Array to hold allowed times based on theater type
    let allowedTimes = [];

    // If theaterName is "Lilla Salongen", use smallTheaterTimes from schedule.js
    if (theaterName === "Lilla Salongen") {
      allowedTimes = schedule.smallTheaterTimes || [];
    // If theaterName is "Stora Salongen", use bigTheaterTimes from schedule.js
    } else if (theaterName === "Stora Salongen") {
      allowedTimes = schedule.bigTheaterTimes || [];
    }

    // Find screenings already booked for the specified date and auditorium
    const takenScreenings = await Screening.find({
      auditorium: auditorium._id,
      date,
      // Only select the time field
    }).select("time");
    
    // Extract times from the taken screenings
    const takenTimes = takenScreenings.map((s) => s.time);

    // Return allowed, taken, and free times
    return res.json({
      allowedTimes,
      takenTimes,
      freeTimes: allowedTimes.filter((t) => !takenTimes.includes(t)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Serverfel" });
  }
});


// Get total amount of bookings for all screenings at today's date
router.get("/screenings/today/bookings/count", async (req, res) => {
  try {
    const date = req.query.date;
    const screenings = await Screening.find({ date });

    // Start value at 0 and add number of bookings for each screening
    let totalBookings = 0;
    for (const screening of screenings) {
      const bookingCount = await Booking.countDocuments({
        screening_id: screening._id,
      });
      totalBookings += bookingCount;
    }
    res.json({ count: totalBookings });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

// Get all auditoriums to populate dropdowns
router.get("/auditoriums", async (req,res)=>{
  const auditoriums = await Auditorium.find();
  res.json(auditoriums);
})

// ----------- Movie routes for admin ------------ //

// POST Route, /api/movie
router.post("/movie", async (req, res) => {
  try {
    const movies = new Movies(req.body);
    await movies.save();
    res.status(201).json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



export default router;
