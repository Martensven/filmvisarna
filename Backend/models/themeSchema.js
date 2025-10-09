import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
    themeId: { type: Number },
    themeDesc: { type: String },
    weekDay: { type: String },
    movies: [{
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movies', required: true},
        title: { type: String },
        imageSrc: { type: String},
        releaseYear: { type: String },
        length: { type: Number },
        description: { type: String },
        genre: [{ 
            genreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genres', required: true},
            title: { type: String }
         }]
    }]
})

export const Themes = mongoose.model('Themes', themeSchema);
