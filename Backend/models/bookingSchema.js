import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    // If user is logged in, reference their userId. If not, store as null and use guest info.
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },

    // unique booking reference
    bookingNumber: { type: String, required: false, unique: true },

    // screening info
    screening_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screening', required: false, default: null },

    // seat info
    seats: [
        {
            seat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
            seatNumber: { type: Number, required: true }
        }
    ],

    // ticket info
    tickets: [
        {
            ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
            ticketName: { type: String, required: true, enum: ['Vuxen', 'Senior', 'Barn'] },
            quantity: { type: Number, required: true, default: 0 },
            pricePerTicket: { type: Number, required: true },
            totalPrice: { type: Number, required: true, default: 0 }
        }
    ],

    // total price
    totalPrice: { type: Number, required: true },

    // booking timestamp
    created_at: { type: Date, default: Date.now }
});

// Function to generate a unique booking number like ABC123
const generateBookingNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const randomLetters = Array.from({ length: 3 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
    const randomDigits = Array.from({ length: 3 }, () => digits.charAt(Math.floor(Math.random() * digits.length))).join('');
    return `${randomLetters}${randomDigits}`;
}

// Pre-save hook to set unique booking number
bookingSchema.pre('save', async function (next) {
    if (!this.bookingNumber) {
        console.log("Genererar nytt bokningsnummer");
        let unique = false;
        while (!unique) {
            const newBookingNumber = generateBookingNumber();
            const existingBooking = await mongoose.models.Booking.findOne({ bookingNumber: newBookingNumber });
            if (!existingBooking) {
                this.bookingNumber = newBookingNumber;
                unique = true;
            }
        }
    }
    next();
});

export const Booking = mongoose.model('Booking', bookingSchema);