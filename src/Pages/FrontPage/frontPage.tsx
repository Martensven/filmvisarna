import { useState } from "react";
import { Link } from "react-router-dom";
import exampleList from "../../../Backend/example.ts"

export default function FrontPage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<string>("");

    // Filter based on selected genres
    const filteredMovies = exampleList.filter((movie) => {
        if (selectedGenres.length === 0) return true; // if no genre is selected then show all movies in.
        return selectedGenres.includes(movie.genre);
    });

    // Sort based on selected option. (A-Z, Z-A, Newest)
    const sortedMovies = [...filteredMovies].sort((a, b) => {
        if (sortOption === "atoz") return a.movieName.localeCompare(b.movieName);
        if (sortOption === "ztoa") return b.movieName.localeCompare(a.movieName);
        if (sortOption === "newest") return b.releaseYear - a.releaseYear;
        if (sortOption === "oldest") return a.releaseYear - b.releaseYear;
        return 0;
    });

    // --- Hantera checkbox ---
    const handleGenreChange = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre) // ta bort om redan vald
                : [...prev, genre] // lägg till
        );
    };

    return (
        <main className="w-screen flex flex-col items-center min-h-screen mt-36 bg-[#292929]">

            {/* Filter & Sort */}
            <section className="w-4/5 mb-5 max-w-screen-lg rounded-md shadow-md flex justify-around items-start relative bg-[#24252C] text-white">

                {/* Filter */}
                <nav className="relative">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="px-2 py-1"
                    >
                        Filter &darr;
                    </button>
                    {filterOpen && (
                        <div className="absolute mt-2 bg-[#292929] shadow-md rounded p-2">
                            {["Action", "Drama", "Komedi"].map((genre) => (
                                <label key={genre} className="flex items-center gap-2 px-2 py-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedGenres.includes(genre)}
                                        onChange={() => handleGenreChange(genre)}
                                    />
                                    {genre}
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
                        <ul className="absolute mt-2 bg-[#292929] rounded shadow p-2 right-0">
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

            {/* Movies */}
            <section className="h-96 w-4/5 max-w-screen-lg shadow-md flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory bg-[#24252C] text-white">
                {sortedMovies.map((movie) => (
                    <article
                        key={movie.id}
                        className="min-w-60 h-72 m-2 snap-center mx-8"
                    >
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={movie.image}
                                alt={movie.movieName}
                                className="shadow-md h-72 object-cover"
                            />
                            <p>{movie.movieName}</p>
                            <p>{movie.genre}</p>
                        </Link>
                    </article>
                ))}
            </section>

            {/* Theme days */}
            <Link to="/theme" className="h-72 shadow-md my-5 w-4/5 max-w-screen-lg justify-center flex flex-col bg-[#24252C] text-white">
                <img src="https://via.placeholder.com/150" alt="Placeholder" className="shadow-md h-64 m-2" />
                <article>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita necessitatibus itaque laudantium accusamus fugiat repellat excepturi architecto perspiciatis distinctio nulla veniam voluptates fuga ullam nam eum. Voluptatem, blanditiis dolor.</article>
            </Link>

        </main>
    );
}

