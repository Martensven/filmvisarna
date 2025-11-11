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