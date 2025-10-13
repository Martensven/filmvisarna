import { Distributors } from "../models/distributorSchema";
import express from 'express';

const router = express.Router();

// post a new distributor
router.post('/api/distributors', async (req, res) => {
    try { const distributor = new Distributors(req.body); // request from body has to match schema
        await distributor.save();
        res.status(201).json(distributor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all distributors
router.get('/api/distributors', async (req, res) => {
    try { const distributors = await Distributors.find();
        res.status(200).json(distributors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get distributor by id
router.get('/api/distributors/:id', async (req, res) => {
    try { const distributor = await Distributors.findById(req.params.id);
        if (!distributor) {
            return res.status(404).json({ message: 'Distributor not found' });
        }
        res.status(200).json(distributor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update distributor by id
router.put('/api/distributors/:id', async (req, res) => {
    try { const distributor = await Distributors.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!distributor) {
            return res.status(404).json({ message: 'Distributor not found' });
        }
        res.status(200).json(distributor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete distributor by id
router.delete('/api/distributors/:id', async (req, res) => {
    try { const distributor = await Distributors.findByIdAndDelete(req.params.id);
        if (!distributor) {
            return res.status(404).json({ message: 'Distributor not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
