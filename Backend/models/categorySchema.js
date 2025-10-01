import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryId: { type: Number },
    title: { type: String },
    desc: { type: String }
});
 
export const Category = mongoose.model('Category', categorySchema);