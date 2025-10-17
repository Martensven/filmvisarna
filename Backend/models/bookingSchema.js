import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    // If user is logged in, reference their userId. If not, store as null and use guest info.
    userInfo: {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
        firstName: { type: String, default: "Guest" },
        lastName: { type: String, default: "Guest" },
        email: { type: String, default: "Guest" },
    },

    // screening info
    screeningInfo: {
        screening_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screening', required: false, default: null },
        movieTitle: { type: String, required: true },
        auditoriumName: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
    },

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