import mongoose from "mongoose";

const kioskSchema = new mongoose.Schema({
    itemId: { type: Number },
    title: { type: String },
    category: { type: String },
    size: { type: Number },
    image: { type: String }
});
 
export const Kiosk = mongoose.model('Kiosk', kioskSchema);