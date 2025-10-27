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
    
    const fetchTheme = async () => {
        try {
            const themeMap: Record<SlideshowProps["day"], string> = {
                thursday: "68ecd482dcb8359901cf375f",
                sunday: "68ecd4f7dcb8359901cf3761",
            };

            const themeId = themeMap[day];
            const response = await fetch(`/api/theme/${themeId}`, {
                method: 'GET',
                headers: {
                        "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Serverfel: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched theme data:", data);
            
            if (Array.isArray(data)) {
                setMovies(data);
            } else if (data.movies && Array.isArray(data.movies)) {
                setMovies(data.movies);
            }
        } catch (error) {
            console.error("Error fetching theme:", error);
        }
    };

    useEffect(() => {
        fetchTheme();
    }, []);

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
            backgroundImage: `linear-gradient(90deg, rgba(${baseColor}) 49%, rgba(0, 0, 0, 0.61) 55%, transparent), url(${currentMovie.imageSrc})`,
        }}
        className="w-11/12 h-60 bg-contain bg-no-repeat bg-right flex flex-col justify-center items-start rounded-md shadow-md
        sm:w-11/12 sm:shadow-lg 
        md:shadow-lg
        lg:shadow-lg lg:h-72 lg:w-3/8 "
        >
            <article style={{color: textDay}} className="w-8/12 text-start mx-2 textDay 
            sm:w-8/12 
            lg:mx-10 ">
                <h1 className="text-sm my-2
                 sm:text-lg 
                 lg:text-xl">
                    {currentMovie.title} ({currentMovie.releaseYear})</h1>
                <h2 className="text-xs my-2 
                lg:text-sm">
                    {currentMovie.genres?.map(g => g.title).join(", ")}</h2>
                <h2 className="text-xs my-2 
                lg:text-sm">
                    Filmens Längd: {currentMovie.length} min</h2>
                <p className="overflow-y-auto w-8/12 text-xs line-clamp-4">{currentMovie.description}</p>

                <article className="text-sm mt-2 flex gap-3 py-2">
                    <button onClick={prevSlide} className="cursor-pointer">&#10216; Föregående</button>
                    <button onClick={nextSlide} className="cursor-pointer">Nästa &#10217;</button>
                </article>
            </article>
        </section>
    )
}