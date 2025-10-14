import mongoose from "mongoose";
import Screening from "./../routes/screeningRoutes"
import Auditorium from "./../routes/auditoriumsRoutes"
import Movie from "./../routes/moviesRoute"

const testdataScreening = async() => {
    try{
        const screening = new Screening({
            
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}