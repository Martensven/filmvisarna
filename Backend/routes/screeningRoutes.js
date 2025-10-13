import express from "express"
import { Screening } from "../models/screeningSchema.js";

const router = express();

router.get("/api/screening", async (req, res) => {
    try{
        const screening = await Screening.find();
        res.status(201).json(screening);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get("/api/screening/auditorium:id", async (req, res) => {
    try{
        const auditoriumById = await Screening.find();
        res.status(201).json(auditoriumById);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/api/screening")

router.post("/api/screening", async (req, res) => {
    try{
        const screening = new Screening(req.body);
        await screening.save();
        res.status(201).json(screening);
    } catch {
        res.status(400).json({ message: error.message });
    }
})



export default router