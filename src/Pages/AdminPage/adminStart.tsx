import { useState } from "react";
import { useNavigate } from "react-router";
import type { Movie } from "../../types/adminTypes.ts";


export default function AdminStart() {

  // Today's date in YYYY-MM-DD format Split at T to remove time portion
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [movies, setMovies] = useState<Movie[]>([]);
  const nav = useNavigate();


}