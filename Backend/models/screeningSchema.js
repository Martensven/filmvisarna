import mongoose from "mongoose";

const screeningSchema = new mongoose.Schema({
    screeningId: { type: Number },
    auditorium: { type: mongoose.Schema.Types.ObjectId, ref:"Auditorum" },
    movie: { type: mongoose.Schema.Types.ObjectId, ref:"Movie" },
    date: { type: Date },
    time: { type: Date }
});
 
export const Screening = mongoose.model('Screening', screeningSchema);