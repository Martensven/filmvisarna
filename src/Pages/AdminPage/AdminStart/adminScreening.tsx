import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

type ScreeningItem = {
  id: string;
  movieTitle: string;
  date: string;
  time: string;
  auditorium: string;
  bookedCount: number;
  totalSeats: number;
};

export default function AdminScreenings() {
  // States to manage date, screenings data, pagination, and sorting
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [screenings, setScreenings] = useState<ScreeningItem[]>([]);
  // page value starts at 1
  const [page, setPage] = useState(1);
  // totalPages state to keep track of total pages from backend
  const [totalPages, setTotalPages] = useState(1);
  // Default sort by time
  const [sortBy, setSortBy] = useState<keyof ScreeningItem>("time");
  // Default sort direction ascending
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();
  // Function to handle sorting from backend
  function handleSort(column: keyof ScreeningItem) {
    if (column === sortBy) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  }

  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        // Fetch using the date state as a query parameter
        const response = await fetch(
          `/api/admin/screenings/today?date=${date}&page=${page}&limit=10&sortBy=${sortBy}&sortDir=${sortDir}`
        );
        const data = await response.json();
        // Set screenings and totalPages state with data from backend route
        setScreenings(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Något gick fel vid hämtning av filmvisningar:", error);
      }
    };
    fetchScreenings();
    // Re-fetch data whenever date, page, sortBy, or sortDir changes
  }, [date, page, sortBy, sortDir]);

  return (
    <section className="p-6 bg-[#243365] text-white w-full md:rounded-xl min-h-[70vh]">
      <section className="flex items-center justify-between mb-6">
        <h1>Dagens filmvisningar</h1>
        <input
          aria-label="Välj datum för filmvisningar"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            // Reset to first page when date changes
            setPage(1);
          }}
          className="bg-white text-black border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 mb-6"
        />
      </section>

      {/* Table header with sortable columns */}
      <div className="hidden md:grid grid-cols-6 text-sm font-semibold border-b border-gray-700 pb-2 mb-2 select-none">
        <div>Edit</div>
        <div
          onClick={() => handleSort("movieTitle")}
          className="cursor-pointer hover:text-gray-300"
        >
          Film
        </div>
        <div
          onClick={() => handleSort("date")}
          className="cursor-pointer hover:text-gray-300"
        >
          Datum
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

      {/* List of screenings */}
      {screenings.map((s) => (
        <div
          key={s.id}
          className="border-b border-gray-400 text-sm py-4 flex flex-col gap-2 md:grid md:grid-cols-6"
        >
          <div className="flex items-center gap-2 md:block md:text-center">
            <MdEdit
              size={20}
              className="cursor-pointer hover:text-gray-300 md:mx-auto"
              onClick={() => navigate(`/admin/screenings/${s.id}`)}
            />
            <span className="text-xs text-gray-300 md:hidden">Edit</span>
          </div>

          <div>
            <span className="text-xs text-gray-300 md:hidden">Film: </span>
            {s.movieTitle}
          </div>

          <div>
            <span className="text-xs text-gray-300 md:hidden">Datum: </span>
            {new Date(s.date).toLocaleDateString("sv-SE")}
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

      {/* Buttons for pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
        >
          Föregående
        </button>
        <span>
          Sida {page} av {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
        >
          Nästa
        </button>
      </div>
    </section>
  );
}
