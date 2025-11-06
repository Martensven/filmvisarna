import { useState, useEffect, use} from "react";

// Defining Movie and Auditorium types
type Movie = { _id: string; title: string; themes?: { themeDesc?: string } };
type Auditorium = { _id: string; name: string };

// States to hold movies and auditoriums
export default function AdminAddScreening() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieId, setMovieId] = useState("");
    const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);
    const [salonName, setSalonName] = useState("");
    const [date, setDate] = useState("");
    const [freeTimes, setFreeTimes] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [movieTheme, setMovieTheme] = useState("");

// Fetch movies and auditoriums on component mount
useEffect(() => {
    const fetchData = async () => {
        try {
            const resMovies = await fetch ("/api/movie");
            setMovies(await resMovies.json());

            const resAuditoriums = await fetch("/api/admin/auditoriums");
            setAuditoriums(await resAuditoriums.json());
        } catch (error) {
            console.error("Fel vid hämtning av data:", error);
        }
    };

    fetchData();
}, []);

}