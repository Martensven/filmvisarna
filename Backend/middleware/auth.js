import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from "../models/users.js"

export const authentication = (app) => {
    app.use(express.json());
};

// Middleware för att verifiera JWT-token och hämta användaren från databasen
export const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        req.user = null; // Gästanvändare
        return next();
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

        // Hämta hela användaren från databasen med ID från token
        const user = await User.findById(decoded.userId).lean();

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export default { authentication, authMiddleware };