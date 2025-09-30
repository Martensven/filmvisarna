import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://team1_db_user:3c7RZVYQWsC3c77v@filmvisarna.j3jjzrr.mongodb.net/CinemaDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
