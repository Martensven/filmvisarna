import mongoose from 'mongoose';
import express from 'express';
import { Server } from "socket.io";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import http from "http";
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
import Admin from './routes/adminRoutes.js';
import ResetPassword from './routes/resetPasswordRoute.js';
import { generateAndSave } from './generateScreeningTimes.js';
import { initSocket } from './websockets/sockets.js';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5170;

const app = express();
const Socketserver = http.createServer(app);
const io = initSocket(Socketserver);

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
app.use("/api/admin", Admin);
app.use(ResetPassword);

// Serve static files from the dist folder
app.use(express.static(path.join(import.meta.dirname, '..', 'dist')));

// If not route is matched serve the dist/index.html file
// and let react router do it's routing
app.get('/*splat', (_req, res) => {
  res.sendFile(path.join(import.meta.dirname, '..', 'dist', 'index.html'));
});

io.on("connected", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);

  });
});

const tenMinutes = 10 * 60 * 1000;

setInterval(async () => {
  console.log("⏳ Genererar screenings (via setInterval)...");
  try {
    await generateAndSave();
    console.log("✔ Screenings genererade!");
  } catch (err) {
    console.error("Fel vid schemagenerering:", err);
  }
}, tenMinutes);

mongoose.connect(process.env.DB_CONNECT) // connect to database
  .then(() => {
    Socketserver.listen(PORT, () => {
      console.log('Connected to MongoDB');
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
