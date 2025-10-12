import { Actors } from "../models/actorSchema.js";
import express from 'express';

const router = express.Router();

// Get all actors
router.get('/api/actors', async (req, res) => {
    try {
        const actors = await Actors.find();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// create a new actor
router.post('/api/actors', async (req, res) => {
    try {
        // the body from the request needs to match the schema
        const actor = new Actors(req.body);
        // Saving the newly added actor to the database
        await actor.save();
        res.status(201).json(actor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;