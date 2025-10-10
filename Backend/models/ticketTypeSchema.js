import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema({
    ticketName: { type: String, required: true },
    price: { type: Number, required: true }
});

export const TicketType = mongoose.model('TicketType', ticketTypeSchema);