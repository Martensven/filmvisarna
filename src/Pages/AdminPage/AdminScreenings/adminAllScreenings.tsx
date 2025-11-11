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
    const [sortBy, setSortBy] = useState<keyof ScreeningItem>("time");
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
                const response = await fetch(
                    `/api/admin/screenings/all?page=${page}&sortBy=${sortBy}&sortDir=${sortDir}`
                );
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

