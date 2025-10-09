import mongoose from "mongoose";

const genresSchema = new mongoose.Schema({
    genreId: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String/Text, required: true}
},)

export const genres = mongoose.model('genres', genresSchema)