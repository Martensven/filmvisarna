import Slideshow from "../../Components/themepageSlideshow/slideshowComponent";
import { useState, useEffect } from "react";

type Theme = {
    _id: string;
    themeDesc: string;
    weekDay: string;
    movies: string[];
}

export default function ThemeSundayPage() {
    const [sunTheme, setSunTheme] = useState<Theme>();

    const fetchSunTheme = async () =>  {
        try {
            const response = await fetch('/api/theme/68ecd4f7dcb8359901cf3761', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Serverfel: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setSunTheme(data);
        } catch (error:any) {
            console.error('Error fetching theme:', error);
        }
    };

    useEffect(() => {
        fetchSunTheme();
    }, []);

    return (
        <main className="w-screen">
            {sunTheme && (
            <article className="flex flex-wrap flex-col justify-center mt-5">
                <h2 className="text-3xl rounded-md shadow-md w-1/2 self-center p-4 my-10 text-yellow-400 bg-[#243365]">{sunTheme.weekDay}</h2>
                <section className="flex m-6 xs:flex-col xs:items-center lg:flex-row lg:justify-center">
                    <Slideshow day="sunday" />
                    <p className="rounded-md shadow-md xs:my-4 lg:mx-5 p-2 lg:w-2/4 lg:h-72 text-yellow-400 bg-[#243365]">{sunTheme.themeDesc}</p>
                </section>
            </article>
            )}
        </main>
    );
}