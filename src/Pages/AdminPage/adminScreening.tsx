import { useEffect, useState } from "react";

type ScreeningItem = {
  id: string;
  movieTitle: string;
  time: string;
  auditorium: string;
  bookedSeats: number;
  totalSeats: number;
};

export default function AdminScreenings() {

    const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
    const [screenings, setScreenings] = useState<ScreeningItem[]>([]);

    // A sorting function would be useful here, need to check that out later.

    useEffect(() => {
        const fetchScreenings = async () => {
            try {
                const response = await fetch(`/api/admin/screenings/today?date=${date}`);
                const data = await response.json();
                setScreenings(data);
            } catch (error) {
                console.error("Något gick fel vid hämtning av filmvisningar:", error);
            }
        };
        fetchScreenings();
    }, [date]);
  return (
    <section>
      <h2>Hantera Filmvisningar</h2>
      <p>Här kan du lägga till, redigera eller ta bort filmvisningar.</p>
    </section>
  );
}
