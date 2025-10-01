import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatId: { type: Number },
    rowNumber: { type: Number },
    seatNumber: { type: Number },
    auditoriumId: { type: Number }
});
 
export const Seat = mongoose.model('Seat', seatSchema);