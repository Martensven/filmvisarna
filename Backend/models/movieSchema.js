import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    movieId: { type: Number },
    title: { type: String },
    image: { type: String },
    genre: { type: String },
    releaseYear: { type: Number },
    age: { type: Number },
    length: { type: Number },
    distributor: { type: String },
    director: { type: [String] },
    actors: { type: [String] },
    description: { type: String },
    youtubeTrailers: { type: String },
    reviews: { type: String },
    themeday: { type: String }
});
 
export const Movie = mongoose.model('Movie', movieSchema);