import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema({
    ticketName: { type: String, required: true, enum: ['Vuxen', 'Senior', 'Barn'] }, // ticketName = internal identifier
    displayName: { 
        type: String, 
        required: true,
        default: function () {
            if (this.ticketName === 'Barn') return 'Barn t.o.m 11 år';
            return this.ticketName;
        } 
    },
    price: { type: Number, required: true, min: 0 }
});

export const TicketType = mongoose.model('Ticket', ticketTypeSchema);