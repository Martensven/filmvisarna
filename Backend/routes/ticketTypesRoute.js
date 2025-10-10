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

export default router;