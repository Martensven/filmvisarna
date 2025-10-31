import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: Number },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});
 
export const User = mongoose.model('User', userSchema);