import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
    author: { type: String },
    review: { type: String },
    publisher: { type: String }
})

export const Reviews = mongoose.model('Reviews', themeSchema);