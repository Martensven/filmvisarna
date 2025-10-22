import express from "express";

const router = express.Router();

// Admin route, get sales from kiosk
router.get("/api/admin/kioskSales", async (req, res) => {
    try {
        const sales = await KioskSale.find().populate("product");
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;