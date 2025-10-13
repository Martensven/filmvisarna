import express from "express"
import { Screening } from "../models/screeningSchema.js";

const router = express();

//Getting all screenings
router.get("/api/screening", async (req, res) => {
    try{
        const screening = await Screening.find();
        res.status(200).json(screening);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Getting screenings by ID
router.get("/api/screening/:id", async (req, res) => {
    try{
        const screening = await Screening.findById(req.params.id);
        res.status(200).json(screening);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post("/api/screening", async (req, res) => {
    try{
        const screening = new Screening(req.body);
        await screening.save();
        res.status(201).json(screening);
    } catch {
        res.status(400).json({ message: error.message });
    }
})

router.put("/api/screening", async (req, res) => {
    try{
    } catch (error) {

    }
})

export default router