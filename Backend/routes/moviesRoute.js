import { Movies } from "../models/moviesSchema.js";
import { Genres } from "../models/genresSchema.js";
import { Screening } from "../models/screeningSchema.js";
import express from "express";

const router = express.Router();

// POST Route, /api/movie
router.post('/api/movie', async (req, res) => {
    try {
        const movies = new Movies(req.body);
        await movies.save();
        res.status(201).json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET All Route, /api/movie
router.get('/api/movie', async (req, res) => {
    try {
        const movies = await Movies.find()
        .populate('genres')
        .populate('actors')
        .populate('directors')
        .populate('distributors')
        .populate('reviews')
        .populate('themes');

        res.status(200).json(movies);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});

// GET Filter Route, /api/movie/filter
router.get('/api/movie/filter', async (req, res) => {
    try {
        const { title, minYear, maxYear, genre, actor, director, distributor, theme, ageLimit, sort, screeningDate, startDate, endDate, scheduleType } = req.query;
        let filter = {};
        // Search by title (case-insensitive)
        if (title) filter.title = { $regex: title, $options: 'i' };
        // Filter by release year range
        if (minYear || maxYear) {
            filter.releaseYear = {};
            if (minYear) filter.releaseYear.$gte = parseInt(minYear);
            if (maxYear) filter.releaseYear.$lte = parseInt(maxYear);
        }
        // Genre-filtering
        if (genre) {
            const genreArray = Array.isArray(genre) ? genre : [genre];
            const genreDocs = await Genres.find({ title: { $in: genreArray } });
            const genreIds = genreDocs.map(g => g._id);
            filter.genres = { $in: genreIds };
        }
        
        // Age limit filtering
        if (ageLimit) {
            const ageArray = Array.isArray(ageLimit)
            ? ageLimit.map(Number)
            : [parseInt(ageLimit)];
            // Movies with age rating in the specified age limits
            filter.age = { $in: ageArray };
        }

        // Screening-based filtering
        if (screeningDate || (startDate && endDate) || scheduleType) {
            const screeningFilter = {};
            if (screeningDate) {
                screeningFilter.date = screeningDate;
            }

            if (startDate && endDate) {
                screeningFilter.date = { $gte: startDate, $lte: endDate };
                if (startDate) screeningQuery.showTime.$gte = new Date(startDate);
                if (endDate) screeningQuery.showTime.$lte = new Date(endDate);
            }

            if (scheduleType) {
                screeningFilter.scheduleType = scheduleType;
            }

            // Find screenings that match the criteria
            const screenings = await Screening.find(screeningFilter).select('movie');
            const movieIds = screenings.map(s => s.movie);

            // If no screenings found, return empty result
            if (movieIds.length === 0) {
                return res.status(200).json([]);
            }

            // Filter movies to those with screenings matching the criteria
            filter._id = { $in: movieIds };
        }

        // Sort by release year
        let sortOption = sort === 'asc' ? { releaseYear: 1 } : sort === 'desc' ? { releaseYear: -1 } : {};

        // Fetch and populate related fields
        const movies = await Movies.find(filter)
        .populate('genres')
        .populate('actors')
        .populate('directors')
        .populate('distributors')
        .populate('reviews')
        .populate('themes')
        .sort(sortOption);

        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found matching the criteria' });
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ID Route, /api/movie/:id
router.get('/api/movie/:id', async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id)
        .populate('genres')
        .populate('actors')
        .populate('directors')
        .populate('distributors')
        .populate('reviews')
        .populate('themes');

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT Route, /api/movie/:id
router.put('/api/movie/:id', async (req, res) => {
    try {
        const updatedMovie = await Movies.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE Route, /api/movie/:ID
router.delete('/api/movie/:id', async (req, res) => {
    try {
        const deleteMovie = await Movies.findByIdAndDelete(req.params.id);

        if (!deleteMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(204).json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
