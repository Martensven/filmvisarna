import { TicketType } from '../models/ticketTypeSchema.js';
import express from 'express';

const router = express.Router();

// post a new ticket type
router.post('/api/ticket-types', async (req, res) => {
    try {
        const ticketType = new TicketType(req.body); // request from body has to match schema
        await ticketType.save();
        res.status(201).json(ticketType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all ticket types
router.get('/api/ticket-types', async (req, res) => {
    try {
        const ticketTypes = await TicketType.find();
        res.status(200).json(ticketTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get ticket types by id
router.get('/api/ticket-types/:id', async (req, res) => {
    try {
        const ticketType = await TicketType.findById(req.params.id);
        if (!ticketType) {
            return res.status(404).json({ message: 'Ticket type not found' });
        }
        res.status(200).json(ticketType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/api/ticket-types/:id', async (req, res) => {
    try {
        const ticketType = await TicketType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ticketType) {
            return res.status(404).json({ message: 'Ticket type not found' });
        }
        res.status(200).json(ticketType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete ticket type by id
router.delete('/api/ticket-types/:id', async (req, res) => {
    try {
        const ticketType = await TicketType.findByIdAndDelete(req.params.id);
        if (!ticketType) {
            return res.status(404).json({ message: 'Ticket type not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;