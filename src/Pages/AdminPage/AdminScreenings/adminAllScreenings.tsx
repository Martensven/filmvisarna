import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

// Define ScreeningItem type
// This is what we expect from the backend
type ScreeningItem = {
  id: string;
  movieTitle: string;
  time: string;
  date: string;
  auditorium: string;
  bookedCount: number;
  totalSeats: number;
};

export default function AdminAllScreenings() {
  // states to manage screenings data, pagination, and sorting
  const [screenings, setScreenings] = useState<ScreeningItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<keyof ScreeningItem>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  // Function to handle sorting
  function handleSort(column: keyof ScreeningItem) {
    // If sortBy is the same as the clicked column, toggle sortDir
    if (column === sortBy) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
      // Otherwise, set sortBy to the clicked column and reset sortDir to ascending
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  }

  // Fetch screenings data from the backend
  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        // Fetch screenings with pagination and sorting parameters
        // we are sending page, sortBy and sortDir as query parameters
        const response = await fetch(`/api/admin/screenings?page=${page}&limit=10&sortBy=${sortBy}&sortDir=${sortDir}`);

        const data = await response.json();
        // Update state with fetched data from backend endpoint
        setScreenings(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Något gick fel vid hämtning av filmvisningar:", error);
      }
    };

    fetchScreenings();
    // Re-fetch data whenever page, sortBy, or sortDir changes
  }, [page, sortBy, sortDir]);

  return (
    <section className="p-6 bg-[#243365] text-white w-full rounded-xl min-h-[70vh]">
      <section className="flex items-center justify-between mb-6">
        <h1>Alla filmvisningar</h1>
      </section>

      {/* Table header for screenings, handlesort sets sorting column and direction */}
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
      {/* The list of screenings */}
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
      {/* Buttons for page navigation */}
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
