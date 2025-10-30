import mongoose from 'mongoose';

const kioskSalesSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kiosk",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
});

export const KioskSale = mongoose.model('KioskSale', kioskSalesSchema);