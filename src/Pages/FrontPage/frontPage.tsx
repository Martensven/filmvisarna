import { Link } from "react-router-dom";
import exampleList from "../../../Backend/example.ts"
import { useState } from "react";

export default function FrontPage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    return (
        <main className="w-screen flex flex-col items-center min-h-screen mt-36">

            {/* Filter & Sort */}
            <section className="w-4/5 mb-5 max-w-screen-lg border-black flex justify-around items-start relative">

                {/* Filter */}
                <div className="relative">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="px-2 py-1"
                    >
                        Filter &darr;
                    </button>
                    {filterOpen && (
                        <ul className="absolute mt-2 bg-white border rounded shadow p-2">
                            <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Action</li>
                            <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Drama</li>
                            <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Comedy</li>
                        </ul>
                    )}
                </div>

                {/* Sort */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="px-2 py-1"
                    >
                        Sortera &darr;
                    </button>
                    {sortOpen && (
                        <ul className="absolute mt-2 bg-white border rounded shadow p-2 right-0">
                            <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">A–Ö</li>
                            <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Ö–A</li>
                            <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Nyast först</li>
                        </ul>
                    )}
                </div>
            </section>

            <section className="h-96 w-4/5 max-w-screen-lg border border-black flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
                {exampleList.map((movie) => (
                    <article
                        key={movie.id}
                        className="min-w-48 h-72 m-2 snap-center mx-20"
                    >
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={movie.image}
                                alt={movie.movieName}
                                className="border h-72 object-cover"
                            />
                            <p>{movie.movieName}</p>
                            <p>{movie.genre}</p>
                        </Link>
                    </article>
                ))}
            </section>


            <Link to="/theme" className="h-72 border-solid border-black border my-5 w-4/5 max-w-screen-lg justify-center flex flex-col">
                <img src="https://via.placeholder.com/150" alt="Placeholder" className="border h-64 m-2" />
                <article>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita necessitatibus itaque laudantium accusamus fugiat repellat excepturi architecto perspiciatis distinctio nulla veniam voluptates fuga ullam nam eum. Voluptatem, blanditiis dolor.</article>
            </Link>

        </main>
    );
}

