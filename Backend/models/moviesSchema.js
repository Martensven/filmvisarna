import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageSrc: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    age: { type: Number, required: true },
    length: { type: Number, required: true },
    description: { type: String, required: true },
    youtubeTrailers: { type: String, required: true },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genres', required: true }],
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actors', required: true }],
    directors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Directors', required: true }],
    distributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Distributors', required: true }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews', required: true }],
    themes: { type: mongoose.Schema.Types.ObjectId, ref: 'Themes', required: true }
});

moviesSchema.post('save', async function (doc) {
  const Theme = mongoose.model('Themes');
  try {
    const theme = await Theme.findById(doc.themes);
    if (theme && !theme.movies.includes(doc._id)) {
      theme.movies.push(doc._id);
      await theme.save();
    }
  } catch (error) {
    console.error('Error linking movie to theme:', err);
  }
});
 
export const Movies = mongoose.model('Movies', moviesSchema);