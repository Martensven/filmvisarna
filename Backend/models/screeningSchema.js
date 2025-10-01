import mongoose from "mongoose";

const screeningSchema = new mongoose.Schema({
    screeningId: { type: Number },
    auditorium: { type: String },
    movie: { type: String },
    date: { type: String },
    time: { type: String }
});
 
export const Screening = mongoose.model('Screening', screeningSchema);