import { useState } from "react";
import exampleList from "../../../../Backend/example";

type movieTheme = {
    id: number;
    movieName: string;
    image: string;
    genre: string[];
    releaseYear: number;
    description: string;
    length: number;
    themeDay: string;
};

interface SlideshowProps {
    day: "thursday" | "sunday";
};

export default function Slideshow({ day }: SlideshowProps) {

    const movies = (exampleList as movieTheme[]).filter(
        (movie) => movie.themeDay?.toLowerCase() === day
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    if (movies.length === 0) {
        return <p>No movies available for {day}</p>
    };

    const currentMovie = movies[currentIndex];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    };

    const baseColor = day === "thursday" ? "0, 0, 0" : "36, 51, 101";
    const textDay = day === "thursday" ? "white" : "#f4c206";

    return (
        <section style={{
            backgroundColor: baseColor,
            backgroundImage: `linear-gradient(90deg, rgba(${baseColor}) 72%, transparent), url(${currentMovie.image})`,
        }}
        className="bg-contain bg-no-repeat bg-right lg: lg:h-72 lg:w-3/8 flex flex-col justify-center shadow-md"
        >
            <article style={{color: textDay}} className="text-start textDay mx-10">
                <h1 className="my-2 text-xl">{currentMovie.movieName} ({currentMovie.releaseYear})</h1>
                <h2 className="my-2 text-sm">{currentMovie.genre.join(", ")}</h2>
                <h2 className="my-2 text-sm">Filmens Längd: {currentMovie.length} min</h2>
                <p className="overflow-y-auto w-2/3 text-sm line-clamp-4">{currentMovie.description}</p>

                <article className="mt-4 flex gap-4">
                    <button onClick={prevSlide} className="cursor-pointer">&#10216; Föregående</button>
                    <button onClick={nextSlide} className="cursor-pointer">Nästa &#10217;</button>
                </article>
            </article>
        </section>
    )
}