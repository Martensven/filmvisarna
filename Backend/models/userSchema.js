import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: { type: Number },
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    phoneNumber: { type: Number },
});
 
export const User = mongoose.model('User', userSchema);