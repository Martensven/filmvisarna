import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    // If user is logged in, reference their userId. If not, store as null and use guest info.
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },

    // screening info
    screening_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screening', required: false, default: null },

    // seat info
    seats: [
        {
            seat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
            seatNumber: { type: Number, required: true }
        }
    ],

    // ticket info
    tickets: [
        {
            ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
            ticketName: { type: String, required: true, enum: ['Vuxen', 'Senior', 'Barn'] },
            quantity: { type: Number, required: true, default: 0 },
            pricePerTicket: { type: Number, required: true },
            totalPrice: { type: Number, required: true, default: 0 }
        }
    ],

    // total price
    totalPrice: { type: Number, required: true },

    // booking timestamp
    created_at: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', bookingSchema);