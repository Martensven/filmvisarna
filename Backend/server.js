import mongoose from 'mongoose';
import express from 'express';
import { Server } from "socket.io"
import session from 'express-session';
import MongoStore from 'connect-mongo';
import http from "http"
import dotenv from 'dotenv';
import MoviesRoute from './routes/moviesRoute.js';
import ThemeRoute from './routes/themeRoute.js';
import ReviewRoute from './routes/reviewRoute.js';
import TicketTypes from './routes/ticketTypesRoute.js';
import Directors from './routes/directorsRoutes.js';
import Screening from './routes/screeningRoutes.js';
import Bookings from './routes/bookingRoute.js';
import Genres from './routes/genresRoutes.js';
import Distributors from './routes/distributorRoutes.js';
import User from './routes/userRoutes.js';
import Auditorium from './routes/auditoriumsRoutes.js';
import Actors from './routes/actorRoutes.js';
import Kiosk from './routes/kioskRoutes.js';


const PORT = 4321;
const app = express();
const Socketserver = http.createServer(app);
const io = new Server({ Socketserver }) // Websocket for realtime booking

dotenv.config();

app.use(session({
  secret: process.env.SESSION_SECRET || 'veryhushhushsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_CONNECT,
    collectionName: 'sessions',
    ttl: 60 * 60 * 2, // 2 hours
  }),
  cookie: {
    httpOnly: true,
    secure: false, // true if using HTTPS
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
  }
}));

app.use(express.json());
app.use(MoviesRoute);
app.use(ThemeRoute);
app.use(ReviewRoute);
app.use(TicketTypes);
app.use(Directors);
app.use(Screening);
app.use(Bookings);
app.use(Genres);
app.use(Distributors);
app.use(User);
app.use(Auditorium);
app.use(Actors);
app.use(Kiosk);

io.on("connected", () => {
    console.log("Client connected", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        
    })
});

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
