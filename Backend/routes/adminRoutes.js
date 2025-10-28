import express from "express";
import { KioskSale } from "../models/kioskSalesSchema.js";
import { Kiosk } from "../models/kioskSchema.js";
import { Booking } from "../models/bookingSchema.js";


const router = express.Router();

// Admin route, get sales from kiosk
router.get("/api/sales/compare", async (req, res) => {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  // Hämta alla produkter
  const products = await Kiosk.find();

  const result = [];

  for (const product of products) {
    const todaySales = await KioskSale.find({
      product: product._id,
      date: { $gte: new Date(today.setHours(0, 0, 0, 0)) }
    });

    const lastWeekSales = await KioskSale.find({
      product: product._id,
      date: {
        $gte: new Date(lastWeek.setHours(0, 0, 0, 0)),
        $lt: new Date(lastWeek.setHours(23, 59, 59, 999))
      }
    });

    const todayTotal = todaySales.reduce((sum, s) => sum + s.quantity, 0);
    const lastWeekTotal = lastWeekSales.reduce((sum, s) => sum + s.quantity, 0);

    result.push({
      title: product.title,
      today: todayTotal,
      lastWeek: lastWeekTotal,
      difference: todayTotal - lastWeekTotal
    });
  }

  res.json(result);
});






router.get("/api/sales/compare/:productId", async (req, res) => {
  const { productId } = req.params;

  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const todaySales = await Sale.find({
    product: productId,
    date: { $gte: new Date(today.setHours(0,0,0,0)) }
  });

  const lastWeekSales = await Sale.find({
    product: productId,
    date: { 
      $gte: new Date(lastWeek.setHours(0,0,0,0)),
      $lt: new Date(lastWeek.setHours(23,59,59,999))
    }
  });

  const todayTotal = todaySales.reduce((sum, s) => sum + s.quantity, 0);
  const lastWeekTotal = lastWeekSales.reduce((sum, s) => sum + s.quantity, 0);

  res.json({
    today: todayTotal,
    lastWeek: lastWeekTotal,
    difference: todayTotal - lastWeekTotal
  });
});


// ------------ Admin User routes ------------ //

// Get all users
router.get("/admin/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
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

router.get("/admin/bookings/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.params.userId })
      .populate("screening_id")
      .populate("seats.seat_id")
      .populate("tickets.ticket_id");

    res.json(bookings);
  } catch (error) {
    console.error("Fel vid hämtning av bokningar:", error);
    res.status(500).json({ error: "Kunde inte hämta bokningar" });
  }
});

// DELETE /api/bookings/:bookingId

router.delete("/api/admin/bookings/:bookingId", async (req, res) => {
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




export default router;