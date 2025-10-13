import mongoose from "mongoose";

const genresSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true}
},)

export const Genres = mongoose.model('Genres', genresSchema)
