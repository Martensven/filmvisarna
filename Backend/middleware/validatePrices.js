import { TicketType } from "../models/ticketTypeSchema";

export const validatePrices = async (req, res, next) => {
    try {
        const { ticketTypes_Id } = req.body;

        if (!ticketTypes_Id) {
            return res.status(400).json({ message: 'ticketTypes_Id is required' });
        }

        const ticketType = await TicketType.findById(ticketTypes_Id);
        if (!ticketType) {
            return res.status(404).json({ message: 'Ticket type not found in database' });
        }

        // Lägg till ticketType-priset i request body för senare användning
        req.ticketTypeData = ticketType;

        next();
    } catch (error) {
        console.error('Error in validateItemExists middleware:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};