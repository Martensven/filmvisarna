import mongoose from 'mongoose';
import TicketTypesRoute from './routes/ticketTypesRoute.js';
import express from 'express';

const PORT = 4321;
const app = express();

app.use(express.json());
app.use(TicketTypesRoute);

mongoose.connect('mongodb+srv://team1_db_user:3c7RZVYQWsC3c77v@filmvisarna.j3jjzrr.mongodb.net/CinemaDB')
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to MongoDB');
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
