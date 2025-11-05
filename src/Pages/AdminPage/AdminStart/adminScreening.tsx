import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";
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
  const [sortBy, setSortBy] = useState<keyof ScreeningItem>("time");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  function handleSort(column: keyof ScreeningItem) {
    if (column === sortBy) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  }

  const sorted = [...screenings].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDir === "asc" ? valA - valB : valB - valA;
    }

    return sortDir === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

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

      <div className="hidden md:grid grid-cols-5 text-sm font-semibold border-b border-gray-700 pb-2 mb-2 select-none">
        <div>Edit</div>
        <div
          onClick={() => handleSort("movieTitle")}
          className="cursor-pointer hover:text-gray-300"
        >
          Film
        </div>
        <div
          onClick={() => handleSort("time")}
          className="cursor-pointer hover:text-gray-300"
        >
          Tid
        </div>
        <div
          onClick={() => handleSort("auditorium")}
          className="cursor-pointer hover:text-gray-300"
        >
          Salong
        </div>
        <div
          onClick={() => handleSort("bookedCount")}
          className="cursor-pointer hover:text-gray-300"
        >
          Bokade
        </div>
      </div>

      {sorted.map((s) => (
  <div
    key={s.id}
    className="
      border-b border-gray-400 text-sm py-4
      flex flex-col gap-2
      md:grid md:grid-cols-5
    "
  >
    <div className="flex items-center gap-2 md:block md:text-center">
      <MdEdit
  size={20}
  className="cursor-pointer hover:text-gray-300 md:mx-auto"
        onClick={() => navigate(`/admin/screenings/${s.id}`)}
      />
      {/* mobillabel */}
      <span className="text-xs text-gray-300 md:hidden">Edit</span>
    </div>

    <div>
      <span className="text-xs text-gray-300 md:hidden">Film: </span>
      {s.movieTitle}
    </div>

    <div>
      <span className="text-xs text-gray-300 md:hidden">Tid: </span>
      {s.time}
    </div>

    <div>
      <span className="text-xs text-gray-300 md:hidden">Salong: </span>
      {s.auditorium}
    </div>

    <div>
      <span className="text-xs text-gray-300 md:hidden">Bokade: </span>
      {s.bookedCount} / {s.totalSeats}
    </div>
  </div>
))}

    </section>
  );
}
