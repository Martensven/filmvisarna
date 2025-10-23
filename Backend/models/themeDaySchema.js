import mongoose from "mongoose";
//Theme day model for handeling generated screenings, including the movies on theme days. 
const themeDaySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["thursday", "sunday"],
        required: true,
        unique: true,
    },
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Themes",
        reguired: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
        required: true
    }
});

export const ThemeDay = mongoose.model("ThemeDay", themeDaySchema);