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

    return (
        <article>
            <section>
                <h1>{currentMovie.movieName}</h1>
                <img
                  src={currentMovie.image}
                  alt={currentMovie.movieName} 
                  className=" w-10 h-10"
                />
                <h2>{currentMovie.genre.join(", ")} ({currentMovie.releaseYear})</h2>
                <p>{currentMovie.description}</p>
                <p>Length: {currentMovie.length} min</p>

                <article>
                    <button onClick={prevSlide} className="cursor-pointer" >Previous</button>
                    <button onClick={nextSlide} className="cursor-pointer">Next</button>
                </article>
            </section>
        </article>
    )
}