// Hours allowed per theater
const smallTheaterTimes = ["12:00", "14:30", "16:00", "18:30", "20:30"];
const bigTheaterTimes = ["16:00", "18:30", "20:30"];

// Generate screening times for the next 'days' days
export function generateNextScreening(days = 14) {
  const showtimes = [];
  const now = new Date();

  // Loop through each day
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);

    // Small theatre - all times
    for (const time of smallTheaterTimes) {
      const [hours, minutes] = time.split(":").map(Number);
      const showDate = new Date(date);
      showDate.setHours(hours, minutes, 0, 0); // Ensure valid Date
      showtimes.push({
        date: showDate,
        theater: "Lilla salongen",
      });
    }

    // Big theatre - all times
    for (const time of bigTheaterTimes) {
      const [hours, minutes] = time.split(":").map(Number);
      const showDate = new Date(date);
      showDate.setHours(hours, minutes, 0, 0);
      showtimes.push({
        date: showDate,
        theater: "Stora salongen",
      });
    }
  }

  return showtimes;
}

export default {
  smallTheaterTimes,
  bigTheaterTimes,
  generateNextScreening
};
