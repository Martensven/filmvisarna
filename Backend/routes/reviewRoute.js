import { Reviews } from '../models/reviewSchema.js';
import express from 'express';

const router = express.Router();

// POST Route, /api/review
router.post('/api/review', async (req, res) => {
    try {
        const reviews = new Reviews(req.body);
        await reviews.save();
        res.status(201).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET All Route, /api/review
router.get('/api/review', async (req, res) => {
    try {
        const review = await Reviews.find()

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ID Route, /api/review/:id
router.get('/api/review/:id', async (req, res) => {
    try {
        const review = await Reviews.findById(req.params.id)

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT Route, /api/review/:id
router.put('/api/review/:id', async (req, res) => {
    try {
        const updatedreview = await Reviews.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedreview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(updatedreview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE Route, /api/review/:id
router.delete('/api/review/:id', async (req, res) => {
    try {
        const deletereview = await Reviews.findByIdAndDelete(req.params.id);

        if (!deletereview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(204).json(deletereview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;