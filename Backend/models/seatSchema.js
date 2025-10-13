import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    rowNumber: { type: Number },
    seatNumber: { type: Number },
    auditoriumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auditorium' },
    accessible: { type: Boolean, default: false },
});
 
export const Seat = mongoose.model('Seat', seatSchema);