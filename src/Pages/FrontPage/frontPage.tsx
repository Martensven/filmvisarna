import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slideshow from "../../Components/themepageSlideshow/slideshowComponent.tsx";
import "../BookingPage/BookingPageStyle.css";

export default function FrontPage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const [movies, setMovies] = useState<any[]>([]); // State to hold fetched movies
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedAges, setSelectedAges] = useState<number[]>([]);
    const [sortOption, setSortOption] = useState<string>("");

    // fetch movies from backend
    const fetchMovies = async () => {
        try {
            const response = await fetch("/api/movie", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Serverfel: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setMovies(data);

            const movies = data;

        } catch (error: any) {
            console.error("Error fetching movies:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    // Filters movies based on selected genres and ages
    const filteredMovies = movies.filter((movie) => {

        //Genrefilter
        const genreMatch =
            selectedGenres.length === 0 ||
            (Array.isArray(movie.genre)
                ? movie.genre.some((g: any) => selectedGenres.includes(g))
                : selectedGenres.includes(movie.genre));

        //Agefilter
        const ageMatch =
            selectedAges.length === 0 || selectedAges.includes(movie.age);

        return genreMatch && ageMatch;
    });

    // Sort based on selected option. (A-Z, Z-A, Newest)
    const sortedMovies = [...filteredMovies].sort((a, b) => {
        if (sortOption === "atoz") return a.movieName.localeCompare(b.movieName);
        if (sortOption === "ztoa") return b.movieName.localeCompare(a.movieName);
        if (sortOption === "newest") return b.releaseYear - a.releaseYear;
        if (sortOption === "oldest") return a.releaseYear - b.releaseYear;
        return 0;
    });

    // Handle genre checkbox
    const handleGenreChange = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre) // remove if already selected
                : [...prev, genre] // add if not selected
        );
    };

    // Handle age checkbox
    const handleAgeChange = (age: number) => {
        setSelectedAges((prev) =>
            prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
        );
    };

    // Age options for filtering
    const ageOptions = [
        { label: "Film utan åldersgräns (Barntillåten)", value: 0 },
        { label: "7 år (0 år i vuxet sällskap)", value: 7 },
        { label: "11 år (7 år i vuxet sällskap)", value: 11 },
        { label: "15 år (11 år i vuxet sällskap)", value: 15 },
    ];

    return (
        <main className="w-screen flex flex-col items-center min-h-screen mt-16 bg-[#292929]">

            <h1 className="text-center text-lg mb-4 w-10/12">Välkommen till Filmvisarna!</h1>
            <p className="text-center text-lg mb-16 w-10/12">Välj en film för att läsa mer eller boka ditt nästa biobesök!</p>

            {/* Filter & Sort */}
            <section className="w-10/12 mb-5  rounded-md shadow-md flex justify-around items-start relative bg-[#24252C] text-white">

                {/* Filter */}
                <nav className="relative">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="px-2 py-1"
                    >
                        Filter &darr;
                    </button>
                    {filterOpen && (
                        <div className="absolute mt-2 bg-[#292929] shadow-md rounded p-2 w-76">
                            {["Action", "Drama", "Komedi", "Skräck", "Äventyr", "Thriller", "Mystik"].map((genre) => (
                                <label key={genre} className="flex items-center gap-2 px-2 py-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedGenres.includes(genre)}
                                        onChange={() => handleGenreChange(genre)}
                                    />
                                    {genre}
                                </label>
                            ))}

                            {ageOptions.map((age) => (
                                <label key={age.value} className="flex items-center gap-2 px-2 py-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedAges.includes(age.value)}
                                        onChange={() => handleAgeChange(age.value)}
                                    />
                                    {age.label}
                                </label>
                            ))}
                        </div>
                    )}
                </nav>

                {/* Sort */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="px-2 py-1"
                    >
                        Sortera &darr;
                    </button>
                    {sortOpen && (
                        <ul className="absolute mt-2 bg-[#292929] rounded shadow p-2 right-0 w-76">
                            <li
                                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => { setSortOption("atoz"); setSortOpen(false); }}
                            >
                                A–Ö
                            </li>
                            <li
                                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => { setSortOption("ztoa"); setSortOpen(false); }}
                            >
                                Ö–A
                            </li>
                            <li
                                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => { setSortOption("newest"); setSortOpen(false); }}
                            >
                                Nyast först
                            </li>
                            <li
                                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => { setSortOption("oldest"); setSortOpen(false); }}
                            >
                                Äldst först
                            </li>
                        </ul>
                    )}
                </div>

            </section>

            {/* Movies container*/}
            <section className="h-96 w-10/12 rounded-md shadow-md flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory bg-[#24252C] text-white">

                {sortedMovies.map((movie) => (
                    <article
                        key={movie.id}
                        className="min-w-60 h-80 m-2 snap-center mx-8"
                    >
                        <Link to={`/movies/${movie.id}`} className="flex flex-col items-center gap-2 p-5">
                            <img
                                src={movie.image}
                                alt={movie.movieName}
                                className="shadow-md h-60 object-cover rounded-md"
                            />
                            <p>{movie.movieName}</p>
                            <p>{Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</p>
                        </Link>
                    </article>
                ))}
            </section>

            {/* Theme days container*/}
            <section className="w-10/12">
                <article className="min-h-96 rounded-md shadow-md my-10 justify-center items-center flex flex-col bg-[#24252C] text-white">
                    <section className="lg:flex-row flex flex-col justify-center items-center">
                        <Slideshow day="thursday" />
                        <p className="md:w-1/2 w-10/12 m-2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita necessitatibus itaque laudantium accusamus fugiat repellat excepturi architecto perspiciatis distinctio nulla veniam voluptates fuga ullam nam eum. Voluptatem, blanditiis dolor.</p>
                    </section>

                    <Link to="/theme-thursday" className="">
                        <button className="main_buttons p-1 px-2 mb-3 mt-5">
                            Läs mer
                        </button>
                    </Link>
                </article>

                <article className="min-h-96 rounded-md shadow-md my-5 justify-center items-center flex  flex-col bg-[#24252C] text-white">
                    <section className="lg:flex-row flex flex-col justify-center items-center">
                        <Slideshow day="sunday" />
                        <p className="md:w-1/2 w-10/12 m-2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita necessitatibus itaque laudantium accusamus fugiat repellat excepturi architecto perspiciatis distinctio nulla veniam voluptates fuga ullam nam eum. Voluptatem, blanditiis dolor.</p>
                    </section>

                    <Link to="/theme-sunday" className="">
                        <button className="main_buttons p-1 px-2 mb-3 mt-5">
                            Läs mer
                        </button>
                    </Link>
                </article>

            </section>

        </main>
    );
}

