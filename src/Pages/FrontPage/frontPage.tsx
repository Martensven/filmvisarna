import { useState } from "react";
import { Link } from "react-router-dom";
import exampleList from "../../../Backend/example.ts"

export default function FrontPage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedAges, setSelectedAges] = useState<number[]>([]);
    const [sortOption, setSortOption] = useState<string>("");

    // Filters movies based on selected genres and ages
    const filteredMovies = exampleList.filter((movie) => {

        //Genrefilter
        const genreMatch =
            selectedGenres.length === 0 ||
            (Array.isArray(movie.genre)
                ? movie.genre.some((g) => selectedGenres.includes(g))
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
        <main className="w-screen flex flex-col items-center min-h-screen mt-36 bg-[#292929]">

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
            <section className="h-96 w-10/12  shadow-md flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory bg-[#24252C] text-white">
                {sortedMovies.map((movie) => (
                    <article
                        key={movie.id}
                        className="min-w-60 h-72 m-2 snap-center mx-8"
                    >
                        <Link to={`/movie/${movie.id}`} className="flex flex-col items-center gap-2">
                            <img
                                src={movie.image}
                                alt={movie.movieName}
                                className="shadow-md h-72 object-cover"
                            />
                            <p>{movie.movieName}</p>
                            <p>{Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</p>
                        </Link>
                    </article>
                ))}
            </section>

            {/* Theme days container*/}
            <Link to="/theme" className="h-72 shadow-md my-5 w-10/12  justify-center flex flex-col bg-[#24252C] text-white">
                <img src="https://via.placeholder.com/150" alt="Placeholder" className="shadow-md h-64 m-2" />
                <article>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita necessitatibus itaque laudantium accusamus fugiat repellat excepturi architecto perspiciatis distinctio nulla veniam voluptates fuga ullam nam eum. Voluptatem, blanditiis dolor.</article>
            </Link>

        </main>
    );
}

