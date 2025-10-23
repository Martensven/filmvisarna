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
    themes: { type: mongoose.Schema.Types.ObjectId, ref: 'Themes', required: true },
    //For admin purpose (place specific schedule for a specific movie)
    scheduleType: {
      type: String,
      enum: ["smallTheater", "bigTheater"],
      required: true
    }
});

// Link movie to the respective theme 
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

// Delete linked movie from it's respective theme when movie is removed
moviesSchema.pre('findOneAndDelete', async function (next) {
  try {
    const movie = await this.model.findOne(this.getQuery());
    if (!movie) return next();

    const Theme = mongoose.model('Themes');
    await Theme.findByIdAndUpdate(movie.themes, {
      $pull: { movies: movie._id }
    });

    next();
  } catch (error) {
    console.error('Error removing movie from theme:', error);
    next(error);
  }
});
 
export const Movies = mongoose.model('Movies', moviesSchema);