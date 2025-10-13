import mongoose from 'mongoose';
import TicketTypesRoute from './routes/ticketTypesRoute.js';
import express from 'express';
import dotenv from 'dotenv';

const PORT = 4321;
const app = express();

dotenv.config();

app.use(express.json());
app.use(TicketTypesRoute);

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
