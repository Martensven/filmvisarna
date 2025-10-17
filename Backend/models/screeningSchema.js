import mongoose from "mongoose";

const screeningSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movies", required: true },
  auditorium: { type: mongoose.Schema.Types.ObjectId, ref: "Auditorium", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  bookedSeats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat" }],
});

export const Screening = mongoose.model("Screening", screeningSchema);
