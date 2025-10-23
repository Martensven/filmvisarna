import express from "express";
import { KioskSale } from "../models/kioskSalesSchema.js";
import { Kiosk } from "../models/kioskSchema.js";

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

export default router;