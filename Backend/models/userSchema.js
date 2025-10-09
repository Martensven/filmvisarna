import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: Number },
});
 
export const User = mongoose.model('User', userSchema);