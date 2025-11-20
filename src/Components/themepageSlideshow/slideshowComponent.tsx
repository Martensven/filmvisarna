import { useState, useEffect, useCallback } from "react";

import "./../../Pages/BookingPage/BookingPageStyle.css";

type Genre = {
    _id: number;
    title: string;
};

type movieTheme = {
    _id: number;
    title: string;
    imageSrc: string;
    genres: Genre[];
    releaseYear: number;
    description: string;
    length: number;
};

interface SlideshowProps {
    day: "thursday" | "sunday";
}

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
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Serverfel: ${response.status}`);
            }

            const data = await response.json();

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

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, [movies.length]);

    useEffect(() => {
        if (movies.length === 0) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 10000);

        return () => clearInterval(interval);
    }, [movies.length, nextSlide]);

    if (movies.length === 0) {
        return <p>No movies available for {day}</p>;
    }

    const currentMovie = movies[currentIndex];
    return (
        <section
            className="w-full flex flex-col justify-center items-center rounded-md mt-5
        md:w-full md:flex-row
        lg:h-100 lg:w-full lg:mb-5
        xl:mb-5"
        >
            <img
                src={currentMovie.imageSrc}
                alt="Theme day movie posters"
                className="w-40 reflection-effect rounded-[5px] mb-5
            sm:w-45
            md:w-50 md:ml-20 md:mr-2
            lg:w-60 lg:ml-40 lg:mr-5
            xl:w-70 xl:ml-45"
            />

            <article
                style={{}}
                className="w-10/12 text-center 
            md:w-full md:mr-20 md:ml-2
            lg:ml-0 lg:mr-20
            xl:mr-45"
            >


                <h1
                    className="text-sm my-2
                 sm:text-lg
                 md:text-lg 
                 lg:text-2xl "
                >
                    {currentMovie.title} ({currentMovie.releaseYear})
                </h1>
                <h2
                    className="text-xs my-2 font-bold
                sm:text-base 
                lg:text-base"
                >
                    {currentMovie.genres?.map((g) => g.title).join(", ")}
                </h2>
                <h2
                    className="text-xs my-2 font-bold 
                sm:text-sm 
                md:text-base
                lg:text-base"
                >
                    Filmens Längd: {currentMovie.length} min
                </h2>
                <p
                    className=" w-full text-xs h-auto
                [&::-webkit-scrollbar]:h-2  
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-[#24252C]
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-[#cdd3fe24]
                sm:text-sm
                md:text-base
                lg:text-lg
                xl:text-lg
                "
                >
                    {currentMovie.description}
                </p>
            </article>
        </section>
    );
}
