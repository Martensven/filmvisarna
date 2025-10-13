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

//Creating a new screening
router.post("/api/screening", async (req, res) => {
    try{
        const screening = new Screening(req.body);
        await screening.save();
        res.status(201).json(screening);
    } catch (error){
        res.status(400).json({ message: error.message });
    }

    console.log(Screening)
})

//Changing a allready existing screening
router.put("/api/screening/:id", async (req, res) => {
    try{
        const screening = await Screening.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!screening){
            return res.status(404).json({message: "Can't find any screenings"})
        }
        res.status(204).json(screening)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete("/api/screening/:id", async (req, res) => {
    try {
        const screening = await Screening.findOneAndDelete(req.params.id);
        if(!screening) {
            return res.status(404).json({message: "No screening found to delete"})
        }
        res.status(204).json(screening)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



export default router