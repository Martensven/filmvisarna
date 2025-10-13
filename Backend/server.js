import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import MoviesRoute from './routes/moviesRoute.js';
import ThemeRoute from './routes/themeRoute.js';
import TicketTypes from './routes/ticketTypesRoute.js';
import Directors from './routes/directorsRoutes.js';
import Screening from './routes/screeningRoutes.js';
import Bookings from './routes/bookingRoute.js';
import Genres from './routes/genresRoutes.js';

const PORT = 4321;
const app = express();

dotenv.config();

app.use(express.json());
app.use(MoviesRoute);
app.use(ThemeRoute);
app.use(TicketTypes);
app.use(Directors);
app.use(Screening);
app.use(Bookings);
app.use(Genres);

mongoose.connect(process.env.DB_CONNECT) // connect to database
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to MongoDB');
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
