import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});
 
export const Distributors = mongoose.model('Distributors', distributorSchema);