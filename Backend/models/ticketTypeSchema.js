import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema({
    ticketTypeId: { type: Number },
    ticketName: { type: String },
    price: { type: Number }
});
 
export const TicketType = mongoose.model('TicketType', ticketTypeSchema);