import express from "express"
import { Screening } from "../models/screeningSchema"

const route = express();

route.post("/api/screening", async (req, res) => {
    try{
        const screening = new Screening(req.body);
        await screening.save();
        res.status(201).json(directors);
    } catch {
        res.status(400).json({ message: error.message });
    }
})

route.get("/api/screening", async (req, res) => {
    try{
        const screening = await Screening.find();
        res.status(201).json(directors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})