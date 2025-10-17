import mongoose from "mongoose";

const auditoriumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rows: Number,
  seatsPerRow: Number,
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat" }],
});

export const Auditorium = mongoose.model("Auditorium", auditoriumSchema);
