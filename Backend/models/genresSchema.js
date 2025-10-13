import mongoose from "mongoose";

const genresSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: Text, required: true}
},)

export const Genres = mongoose.model('Genres', genresSchema)
