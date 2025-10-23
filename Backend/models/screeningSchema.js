import mongoose from "mongoose";

const screeningSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
    required: true,
  },
  auditorium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auditorium",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  showTime: { type: Date, required: true },
  bookedSeats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat" }],
  //For admin purpose (place specific schedule for a specific movie)
  scheduleType: {
    type: String,
    enum: ["smallTheater", "bigTheater"],
    required: true,
  },
});

//Prevent doublets of screenings
screeningSchema.index({ auditorium: 1, showTime: 1 }, { unique: true });

export const Screening = mongoose.model("Screening", screeningSchema);
