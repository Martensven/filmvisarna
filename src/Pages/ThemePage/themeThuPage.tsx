import Slideshow from "../../Components/themepageSlideshow/slideshowComponent";
import { useState, useEffect } from "react";

type Theme = {
    _id: string;
    themeDesc: string;
    weekDay: string;
    movies: string[];
}

export default function ThemeThursdayPage() {
    const [thuTheme, setThuTheme] = useState<Theme>();

    useEffect(() => {
        fetch("/api/theme/68ecd482dcb8359901cf375f")
        .then((res) => res.json())
        .then(data => setThuTheme(data))
        .catch((error) => console.error("Error fetching tema", error));
    }, []);

    return (
        <main className="w-screen">
            {thuTheme && (
            <article className="flex flex-wrap flex-col justify-center mt-5">
                <h2 className="text-3xl rounded-md shadow-md w-1/2 self-center p-4 my-3 bg-black">{thuTheme.weekDay}</h2>
                <section className="flex m-6 xs:flex-col xs:items-center lg:flex-row lg:justify-center">
                    <Slideshow day="thursday" />
                    <p className="rounded-md shadow-md xs:my-4 lg:mx-5 p-2 lg:w-2/4 lg:h-72 bg-black">{thuTheme.themeDesc}</p>
                </section>
            </article>
            )}
        </main>
    );
}