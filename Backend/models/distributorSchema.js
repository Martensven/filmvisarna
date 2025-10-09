import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema({
    distributorId: { type: Number },
    name: { type: String, required: true, unique: true },
});
 
export const Distributor = mongoose.model('Distributor', distributorSchema);