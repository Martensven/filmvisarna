import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema({
    ticketName: { type: String, required: true, enum: ['Vuxen', 'Senior', 'Barn'] },
    price: { type: Number, required: true, min: 0 }
});

export const TicketType = mongoose.model('Ticket', ticketTypeSchema);