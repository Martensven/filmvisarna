import { useState, useEffect } from "react";

type Genre = {
    _id: number;
    title: string;
}

type movieTheme = {
    id: number;
    title: string;
    imageSrc: string;
    genres: Genre[];
    releaseYear: number;
    description: string;
    length: number;
};

interface SlideshowProps {
    day: "thursday" | "sunday";
};

export default function Slideshow({ day }: SlideshowProps) {
    const [movies, setMovies] = useState<movieTheme[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const themeMap: Record<SlideshowProps["day"], string> = {
        thursday: "68ecd482dcb8359901cf375f",
        sunday: "68ecd4f7dcb8359901cf3761",
    };

    const themeId = themeMap[day];

    useEffect(() => {
        fetch(`/api/theme/${themeId}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (Array.isArray(data)) setMovies(data);
            else if (data.movies && Array.isArray(data.movies)) setMovies(data.movies);
        })
        .catch((err) => console.error(err));
    }, [themeId]);

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
            backgroundImage: `linear-gradient(90deg, rgba(${baseColor}) 72%, transparent), url(${currentMovie.imageSrc})`,
        }}
        className="bg-contain bg-no-repeat bg-right lg:h-72 lg:w-3/8 flex flex-col justify-center rounded-md shadow-md"
        >
            <article style={{color: textDay}} className="text-start textDay lg:mx-10 xs:mx-4">
                <h1 className="my-2 lg:text-xl xs:text-sm">{currentMovie.title} ({currentMovie.releaseYear})</h1>
                <h2 className="my-2 lg:text-sm xs:text-xs">{currentMovie.genres?.map(g => g.title).join(", ")}</h2>
                <h2 className="my-2 lg:text-sm xs:text-xs">Filmens Längd: {currentMovie.length} min</h2>
                <p className="overflow-y-auto w-2/3 text-sm line-clamp-4">{currentMovie.description}</p>

                <article className="mt-4 flex gap-4 py-2">
                    <button onClick={prevSlide} className="cursor-pointer">&#10216; Föregående</button>
                    <button onClick={nextSlide} className="cursor-pointer">Nästa &#10217;</button>
                </article>
            </article>
        </section>
    )
}