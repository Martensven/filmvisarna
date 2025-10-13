import mongoose from 'mongoose';
import TicketTypesRoute from './routes/ticketTypesRoute.js';
import MoviesRoute from './routes/moviesRoute.js';
import ThemeRoute from './routes/themeRoute.js';
import express from 'express';
import dotenv from 'dotenv';
import Directors from './routes/directorsRoutes.js';
import Genres from './routes/genresRoutes.js';

const PORT = 4321;
const app = express();

dotenv.config();

app.use(express.json());
app.use(TicketTypesRoute);
<<<<<<< HEAD
app.use(MoviesRoute);
app.use(ThemeRoute);
=======
app.use(Directors);
app.use(Genres);
>>>>>>> 86c01b63f1f0d4e2ac3ba1f8022bb90efb815c60

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
