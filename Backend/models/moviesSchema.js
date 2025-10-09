import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
    movieId: { type: Number },
    title: { type: String },
    imageSrc: { type: String },
    releaseYear: { type: Number },
    age: { type: Number },
    length: { type: Number },
    description: { type: String },
    youtubeTrailers: { type: String },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genres' }],
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actors' }],
    directors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Directors' }],
    distributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Distributors' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    themes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Themes' }]
});
 
export const Movies = mongoose.model('Movies', moviesSchema);