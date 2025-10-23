import mongoose from "mongoose";
import schedule from "./schedule.js";
import { Screening } from "./models/screeningSchema.js";
import { Auditorium } from "./models/auditoriumSchema.js";
import { ThemeDay } from "./models/themeDaySchema.js";


//Create a function that generates screening and saving them to the database. 
export const generateAndSave = async (movieId) => {
  try {
    const showtimes = await schedule.generateNextShowtimes(); //Declare showtimes after the function from schedule file. 

    //Finding the auditoriums from our models
    const smallTheater = await Auditorium.findOne({ name: "Lilla Salongen" });
    const bigTheater = await Auditorium.findOne({ name: "Stora Salongen" });

    if (!smallTheater || !bigTheater) {
      throw new Error(
        "Finns inga salonger med det namnet, kunde inte hämta data"
      );
    }
    
    //Pushing and saving new screenings into database
    const screeningtimes = showtimes.map((show) => ({
      movie: movieId,
      auditorium:
        show.theater === "Lilla salongen" ? smallTheater._id : bigTheater._id,
      date: show.date.toLocaleDateString("sv-SE"),
      time: show.date.toLocaleTimeString("sv-SE"),
      showTime: show.date,
      bookedSeats: [],
      scheduleType:
        show.theater === "Lilla salongen" ? "smallTheater" : "bigTheater",
    }));
    
    //Saving the new data
    const savedResult = [];

    for (const screening of screeningtimes) {
      try {
        const savedScreening = await Screening.create(screening);
        savedResult.push(savedScreening);
      } catch (error) {
        if (err.code === 11000) {
          console.log("Visning finns redan", screening.time, screening.date);
        } else {
          console.error("Kunde inte skapa visning", err.messsage);
        }
      }
    }

    console.log(
      `Visningar ${savedResult.length} skapade och sparade i databasen`
    );
    return savedResult;
  } catch (error) {
    console.error("Kunde inte skapa genererade visningar", error);
    throw error;
  }
};
