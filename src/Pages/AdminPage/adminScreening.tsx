import { useEffect, useState } from "react";

type ScreeningItem = {
  id: string;
  movieTitle: string;
  time: string;
  auditorium: string;
  bookedCount: number;
  totalSeats: number;
};

export default function AdminScreenings() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [screenings, setScreenings] = useState<ScreeningItem[]>([]);

  // A sorting function would be useful here, need to check that out later.

  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        const response = await fetch(
          `/api/admin/screenings/today?date=${date}`
        );
        const data = await response.json();
        setScreenings(data);
      } catch (error) {
        console.error("Något gick fel vid hämtning av filmvisningar:", error);
      }
    };
    fetchScreenings();
  }, [date]);
  return (
    <section className="p-6 bg-[#243365] text-white w-full rounded-xl min-h-[70vh]">
      <section className="flex items-center justify-between mb-6">
        <h1>Dagens filmvisningar</h1>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 mb-6"
        />
      </section>

      <section className="hidden md:grid grid-cols-4 text-sm font-semibold border-b border-gray-700 pb-2 mb-2">
        <div>Film</div>
        <div>Tid</div>
        <div>Salong</div>
        <div>Bokade platser</div>
      </section>

      {screenings.map((s) => (
        <div
          key={s.id}
          className="grid grid-cols-2 md:grid-cols-4 py-3 border-b border-gray-800 text-sm"
        >
          <div className="font-medium">{s.movieTitle}</div>
          <div>{s.time}</div>
          <div>{s.auditorium}</div>

          <div>
            {s.bookedCount} / {s.totalSeats}
          </div>
        </div>
      ))}
    </section>
  );
}
