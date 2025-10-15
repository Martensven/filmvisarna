import { User } from '../models/userSchema.js';
import express from 'express';
import { validateData } from './../middleware/dataValidation.js';

const router = express.Router();

// post a new user
router.post('/api/users', 
    validateData(
        ['email', 'password', 'firstName', 'lastName', 'phoneNumber'],
        { email: 'string', password: 'string', firstName: 'string', lastName: 'string', phoneNumber: 'number' },
        'body',
        {
            firstName: /^[A-Za-zÅÄÖåäö\s-]+$/,
            lastName: /^[A-Za-zÅÄÖåäö\s-]+$/,
            password: (val) =>
            val.length < 8 ? 'Lösenordet måste vara minst 8 tecken' : null
        }
    ),
    async (req, res) => {
    try { const user = new User(req.body); // request from body has to match schema
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all users
router.get('/api/users', async (req, res) => {
    try { const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get user by id
router.get('/api/users/:id', async (req, res) => {
    try { const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// update user by id
router.put('/api/users/:id', async (req, res) => {
    try { const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// delete user by id
router.delete('/api/users/:id', async (req, res) => {
    try { const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;