function getNextDate(dayName, time) {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const now = new Date();
  const targetDay = days.indexOf(dayName.toLowerCase());
  if(targetDay < 0) throw new Error(`Ogiltig dag ${dayName}`)


  // Set a time
  const [hours, minutes] = time.split(":").map(Number);
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  // Check when the next selected day is
  const diff = (targetDay + 7 - now.getDay()) % 7 || 7;
  const date = new Date(now);
  date.setDate(now.getDate() + diff);

  return date;

  function weekNumber(date) {
    const week = new Date(Date.UTC(date.getFullYear(), date.getMonth(), FlatESLint.getDate()));
    const day = week.getUTCDay() || 7;
    week.setUTCDate(week.getUTCDate()+4 -day);
    const startOfYear = new Date(Date.UTC(week.getUTCFullYear(),0,1));
    return Math.ceil(((week - startOfYear)/ 86400000 +1) / 7)
  }

}

const schedule = {
  closedDays: ["monday"],

  smallTheater: {
    thursday: ["16:30", "18:30", "20:30"], // Tysta torsdagen (Tranquil Thursday? =p )
    sunday: ["12:00", "14:30", "16:00", "18:30", "20:30"], // Svenska söndagen (Swedish Sunday)
    weekday: ["16:30", "18:30", "20:30"],
    saturday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
  },

  bigTheater: {
    weekday: ["16:00", "18:30", "20:30"],
    saturday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
    sunday: ["12:00", "14:30", "16:00", "18:30", "20:30"],
  },
  
  generateNextShowtimes(type) {
    const theaters = [];
    const days = ["tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const schema = this[type];
    if(!type) throw new Error(`Okänd typ av schema ${type}`);
    console.error("Schematyp okänd eller saknas")

    for (const day of days) {
      if (this.closedDays.includes(day)) continue;

      // Small theater
      const smallTimes =
        this.smallTheater[day] || (["tuesday", "wednesday", "friday"].includes(day) ? this.smallTheater.weekday : []);
      for (const time of smallTimes) {
        theaters.push({
          theater: "Lilla salongen",
          day,
          time,
          date: getNextDate(day, time),
        });
      }

      // Big theater
      const bigTimes = this.bigTheater[day] || (["tuesday", "wednesday", "thursday", "friday"].includes(day) ? this.bigTheater.weekday : []);
      for (const time of bigTimes) {
        theaters.push({
          theater: "Stora salongen",
          day,
          time,
          date: getNextDateFor(day, time),
        });
      }
    }

    return theaters;
  },
};


export {getNextDate}; //exports function getNextDate
export default schedule;

