import mongoose from "mongoose";

const auditoriumSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
})

export const Auditoriums = mongoose.model('Auditorium', auditoriumSchema);