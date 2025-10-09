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
    genres: [{
        genreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genres', required: true },
        title: { type: String },
        desc: { type: String }
    }],
    actors: [{
        actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Actors', required: true},
        name: { type: String }
    }],
    directors: [{
        directorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Directors', required: true},
        name: { type, String }
    }],
    distributors: [{
        distributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Distributors', required: true},
        name: { type: String }
    }],
    reviews: [{
        reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviews', required: true},
        author: { type: String },
        review: { type: String },
        publisher: { type: String }
    }],
    themes: [{
        themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Themes', required: true},
        weekday: { type: String }
    }]
});
 
export const Movies = mongoose.model('Movies', moviesSchema);