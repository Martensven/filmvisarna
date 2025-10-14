import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
    themeDesc: { type: String },
    weekDay: { type: String },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies', required: true}]
})

export const Themes = mongoose.model('Themes', themeSchema);
