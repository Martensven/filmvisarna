import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Movie } from "../../types/adminTypes.ts";


export default function AdminStart() {

  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [movies, setMovies] = useState<Movie[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/admin/screenings/today-movies?date=${date}`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div>
      <div>
        <h1>{date}</h1>
      </div>
      <div>
        {movies.map((movie) => (
          <div key={movie._id} onClick={() => nav(`/admin/movies/${movie._id}?date=${date}`)}>
            <h2>{movie.title}</h2>
            <img src={movie.imageSrc} alt={movie.title} />
          </div>
          
        ))}
      </div>
    </div>
  );
}