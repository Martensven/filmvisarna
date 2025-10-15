import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    // If user is logged in, reference their userId. If not, store as null and use guest info.
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    userInfo: {
        firstName: { type: String, default: "Guest" },
        lastName: { type: String, default: "Guest" },
        email: { type: String, default: "Guest" },
    },
    // screening info
    screening_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screening', required: false, default: null },
    screeningInfo: {
        movieTitle: { type: String, required: true },
        auditoriumName: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
    },
    // seat info
    seat_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true }],
    seatInfo: [{ type: Number, required: true }],
    // ticket info
    ticketType_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true }],
    ticketType: [{ type: Number, required: true }],
    // total price
    totalPrice: { type: Number, required: true },
    // booking timestamp
    created_at: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', bookingSchema);