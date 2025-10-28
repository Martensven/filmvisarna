import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slideshow from "../../Components/themepageSlideshow/slideshowComponent.tsx";
import "../BookingPage/BookingPageStyle.css";
import "../../index.css"

export default function FrontPage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const [movie, setMovie] = useState<any[]>([]); // State to hold fetched movies
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
            setMovie(data);



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
    const filteredMovies = movie.filter((movie) => {

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
        <main className="w-screen flex flex-col items-center min-h-screen mt-14 bg-[#292929]">

            <h1 className="text-center text-lg mb-4 w-10/12">Välkommen till Filmvisarna!</h1>
            <p className="text-center text-sm mb-10 w-10/12">Här kan du se filmer som verkligen tar dig bakåt i tiden. Vi erbjuder
            filmer från 1910 talet fram till början på 2000 talet. Är detta något för dig se då till att se dig runt bland våra filmer
            och boka en tid som passar dig!</p>

            {/* Filter & Sort */}
            <section className="w-10/12 mb-5 rounded-md shadow-md flex justify-around items-start relative bg-[#24252C] text-white">

                {/* Filter */}
                <nav className="relative">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="px-2 py-1"
                    >
                        Filter &darr;
                    </button>
                    {filterOpen && (
                        <div 
                        className="flex flex-row flex-wrap justify-between items-center 
                        absolute -left-8 mt-5 bg-[#292929] shadow-md rounded p-5 w-72">

                            {["Action", "Drama", "Komedi", "Skräck", "Äventyr", "Thriller", "Mystik"].map((genre) => (
                                <label key={genre} className="flex items-center gap-2 px-2 py-1 mt-1 mb-2 w-30 h-8 text-sm
                                hover:underline">
                                    <input
                                        type="checkbox"
                                        checked={selectedGenres.includes(genre)}
                                        onChange={() => handleGenreChange(genre)}
                                    />
                                    {genre}
                                </label>
                            ))}

                            {ageOptions.map((age) => (
                                <label key={age.value} className="flex items-center gap-2 px-2 py-1 mt-2 text-sm text-left">
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
                        <ul className="absolute mt-2 bg-[#292929] rounded shadow p-2 -right-9 w-72">
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
            <section className="h-80 w-11/12 rounded-md shadow-md flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-layout snap-x snap-mandatory bg-[#24252C] text-white
            md:px-2">
                {sortedMovies.length === 0 ? (
                    <p className="m-auto">Inga filmer hittades.</p>
                ) : (
                    sortedMovies.map((movie) => (
                        <article
                            key={movie._id}
                            className="flex justify-center items-between min-w-36 h-76 snap-center mx-2 my-3"
                        >
                            <Link to={`/movie/${movie._id}`} className="flex flex-col items-center justify-start w-36 gap-2">
                                <img
                                    src={movie.imageSrc}
                                    alt={movie.title}
                                    className="shadow-2xl w-32 h-auto object-cover rounded-md 
                                    md:transition-transform md:hover:shadow-[0_0_15px_rgba(70,106,228,0.4)] md:hover:scale-105
                                    md:w-40 md:mx-2
                                    lg:transition-transform lg:hover:shadow-[0_0_15px_rgba(70,106,228,0.4)] lg:hover:scale-105"
                                />
                                <p className=" text-sm mx-2 mt-2">{movie.title}</p>

                                <p className="text-xs ">
                                    {Array.isArray(movie.genres)
                                        ? movie.genres.map((genre: { title: string }) => genre.title).join(", ")
                                        : movie.genres.title}
                                </p>
                            </Link>
                        </article>
                    ))
                )}
            </section>

            {/* Theme days container*/}
            <section className="w-11/12 mt-2">
            <h2 className="w-full bg-[#243365] p-1 mt-10 rounded-md shadow-md text-lg">Temadagar</h2>
                <article className="min-h-96 w-full rounded-md shadow-md my-5 justify-center items-center flex flex-col bg-[#24252C] text-white">
                    <section className=" flex flex-col justify-center items-center 
                    sm:flex-col sm:p-5
                    md:flex-row 
                    lg:flex-row ">
                        <h2 className=" text-center text-xl uppercase font-bold my-2">
                        Tysta Torsdagen</h2>
                        <Slideshow day="thursday" />
                        <p className="w-10/12 m-2 text-center
                        sm:w-11/12">Varje Torsdag i vår lilla salong spelas stumfilmer från tidigast 1910-tal. Vill man läsa mer om 
                        tema dagen så tryck gärna på läs mer knappen nedan för att få mer information om temadagen.</p>
                    </section>

                    <Link to="/theme-thursday" className="">
                        <button className="main_buttons p-1 px-2 mb-3 mt-5">
                            Läs mer
                        </button>
                    </Link>
                </article>

                <article className="min-h-96 rounded-md shadow-md my-5 justify-center items-center flex  flex-col bg-[#24252C] text-white">
                    <section className="flex flex-col justify-center items-center
                    sm:flex-col sm:p-5
                    md:flex-row  
                    lg:flex-row ">
                         <h2 className="text-center text-xl uppercase font-bold my-2">
                        Svenska Söndagen</h2>
                        <Slideshow day="sunday" />
                        <p className="md:w-1/2 w-10/12 m-2 text-center">Söndagar är till för att uppleva gamla goda svenska klassiker. Visas i vår lilla salong 
                        under hela Söndagen. Läs mer för för information om vilka filmer som visas.</p>
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

