import mongoose from "mongoose";

const kioskSchema = new mongoose.Schema({
    title: { type: String },
    category: { type: String },
    size: { type: String },
    price: { type: Number },
    image: { type: String }
});
 
export const Kiosk = mongoose.model('Kiosk', kioskSchema);