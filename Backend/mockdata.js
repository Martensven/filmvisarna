import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import { Kiosk } from "./models/kioskSchema.js"; 
import { KioskSale } from "./models/kioskSalesSchema.js"; 

dotenv.config(); async function createMockKioskData() { 
    try { 
        await mongoose.connect(process.env.DB_CONNECT); 
        console.log("Uppkopplad till databas"); 
        // Rensa befintliga data 
        await KioskSale.deleteMany({}); 
        console.log("Tidigare försäljning rensad"); 
        const today = new Date(); 
        const lastWeek = new Date(); 
        lastWeek.setDate(today.getDate() - 7); 
        
        // Hämta alla kioskprodukter 
        const products = await Kiosk.find(); 
        if (products.length === 0) { 
            console.log("Inga produkter hittades"); 
            await mongoose.disconnect(); 
            return; } 
            const salesData = []; for (const product of products) { 
            // Skapa ett slumpmässigt antal försäljningar för varje produkt 
            const todaySalesCount = Math.floor(Math.random() * 20) + 1; 
            // 1-20 försäljningar idag 
            const lastWeekSalesCount = Math.floor(Math.random() * 20) + 1; 
            // 1-20 försäljningar förra veckan 
            salesData.push( { 
                product: product._id, 
                date: today, 
                quantity: todaySalesCount }, 
                { product: product._id, 
                    date: lastWeek, 
                    quantity: lastWeekSalesCount } ); 
                    console.log( ${product.title}: idag: ${todaySalesCount}, förra veckan: ${lastWeekSalesCount} ); } 
                    await KioskSale.insertMany(salesData); 
                    console.log("Mock försäljningsdata skapad"); 
                } catch (error) { console.error("Fel vid skapande av mock försäljningsdata:", error); 

                } finally { 
                    await mongoose.disconnect(); 
                    console.log("Frånkopplad från databas"); 
                } } createMockKioskData(); KioskSalesSchema: 
                
                import mongoose from 'mongoose'; 
                const kioskSalesSchema = new mongoose.Schema({ product: { type: mongoose.Schema.Types.ObjectId, ref: "Kiosk", required: true }, date: { type: Date, required: true }, quantity: { type: Number, required: true } }); 
                
                export const KioskSale = mongoose.model('KioskSale', kioskSalesSchema);