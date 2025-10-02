import mongoose from "mongoose";

const auditoriumSchema = new mongoose.Schema({
    auditoriumId: { type: Number },
    name: { type: String },
    seatsPerRow: { type: [Number] }
});
 
export const Auditorum = mongoose.model('Auditorium', auditoriumSchema);