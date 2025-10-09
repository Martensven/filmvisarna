import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema({
    distributorId: { type: Number },
    name: { type: String, required: true, unique: true },
});
 
export const Distributors = mongoose.model('Distributors', distributorSchema);