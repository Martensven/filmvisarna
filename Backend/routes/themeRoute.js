import { Themes } from "../models/themeSchema.js";
import express from 'express';

const router = express.Router();

// POST Route, /api/theme
router.post('/api/theme', async (req, res) => {
    try {
        const themes = new Themes(req.body);
        await themes.save();
        res.status(201).json(themes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET All Route, /api/theme
router.get('/api/theme', async (req, res) => {
    try {
        const theme = await Themes.find()
        .populate({path: "movies", populate: {path: "genres"}});

        res.status(200).json(theme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ID Route, /api/theme/:id
router.get('/api/theme/:id', async (req, res) => {
    try {
        const theme = await Themes.findById(req.params.id)
        .populate({path: "movies", populate: {path: "genres"}});

        if (!theme) {
            return res.status(404).json({ message: 'Theme not found' });
        }

        res.status(200).json(theme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT Route, /api/theme/:id
router.put('/api/theme/:id', async (req, res) => {
    try {
        const updatedTheme = await Themes.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTheme) {
            return res.status(404).json({ message: 'Theme not found' });
        }

        res.status(200).json(updatedTheme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE Route, /api/theme/:id
router.delete('/api/theme/:id', async (req, res) => {
    try {
        const deleteTheme = await Themes.findByIdAndDelete(req.params.id);

        if (!deleteTheme) {
            return res.status(404).json({ message: 'Theme not found' });
        }

        res.status(204).json(deleteTheme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;