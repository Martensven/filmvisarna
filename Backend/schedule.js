
import { ThemeDay } from "./models/themeDaySchema.js";

function getNextDate(dayName, time) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const now = new Date();
  const targetDay = days.indexOf(dayName.toLowerCase());
  if (targetDay < 0) throw new Error(`Ogiltig dag ${dayName}`);

  // Check when the next selected day is
  const diff = (targetDay + 7 - now.getDay()) % 7 || 7;

  const date = new Date(now);
  date.setDate(now.getDate() + diff);

  // Set a time
  const [hours, minutes] = time.split(":").map(Number);
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  return date;
}

const schedule = {
  closedDays: ["monday"],

  smallTheater: {
    themedays: {
      thursday: ["16:30", "18:30", "20:30"], // Tysta torsdagen (Tranquil Thursday? =p )
      sunday: ["12:00", "14:30", "16:00", "18:30", "20:30"], // Svenska söndagen (Swedish Sunday)
    },
    weekday: ["16:30", "18:30", "20:30"],
    saturday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
  },

  bigTheater: {
    weekday: ["16:00", "18:30", "20:30"],
    saturday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
    sunday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
  },

  async generateNextShowtimes(type) {
    const theaters = [];
    const days = [
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    for (const day of days) {
      if (this.closedDays.includes(day)) continue;

      let themeDay = null;
      let themeMovieID = null;

      try{
        themeDay = await ThemeDay.findOne({ day }).populate("movie");
        if(themeDay) themeMovieID = themeDay.movie._id;
      } catch (error){
        console.error("Problem att hitta temadagar", error);
        
      }
      // Small Theater
      const smallTimes =
        this.smallTheater[day] ||
        (["tuesday", "wednesday", "friday"].includes(day)
          ? this.smallTheater.weekday
          : []);
      for (const time of smallTimes) {
        theaters.push({
          theater: "Lilla salongen",
          day,
          time,
          date: getNextDate(day, time),
          theme: false,
          movie: null,
        });
      }

      // Big theater
      const bigTimes =
        this.bigTheater[day] ||
        (["tuesday", "wednesday", "thursday", "friday"].includes(day)
          ? this.bigTheater.weekday
          : []);
      for (const time of bigTimes) {
        theaters.push({
          theater: "Stora salongen",
          day,
          time,
          date: getNextDate(day, time),
          theme:false,
          movie:null
        });
      }

      // Theme days
      const themeTimes =
        this.smallTheater.themedays[day] || [];
        for (const time of themeTimes) {
          theaters.push({
            theater: "Lilla salongen",
            day,
            time,
            date: getNextDate(day, time),
            theme: true,
            movie: themeMovieID || null,
        });
      }
    }

    return theaters;
  },
};


export default schedule;
