import mongoose from "mongoose";

const auditoriumSchema = new mongoose.Schema({
    auditoriumId: { type: Number },
    name: { type: String, required: true, unique: true },
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
})

export const Auditorium = mongoose.model('Auditorium', auditoriumSchema);