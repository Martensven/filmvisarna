import { useEffect, useState } from "react";
import Slideshow from "../../../Components/themepageSlideshow/slideshowComponent";

type Theme = {
    _id: string;
    themeDesc: string;
    weekDay: string;
};

export default function ThemeContainers({ onLoaded }: { onLoaded: () => void }) {
    const [sunTheme, setSunTheme] = useState<Theme>();
    const [thuTheme, setThuTheme] = useState<Theme>();

    const fetchThemes = async () => {
        try {
            const responseSun = await fetch(`api/theme/68ecd4f7dcb8359901cf3761`, {
                method: "GET",
                headers: {
                    "Conent-Type": "application/json",
                },
            });

            const responseThu = await fetch(`/api/theme/68ecd482dcb8359901cf375f`, {
                method: "GET",
                headers: {
                    "Conent-Type": "application/json",
                },
            });

            if (!responseSun.ok || !responseThu.ok) {
                throw new Error(
                    `Serverfel: ${responseSun.status}, ${responseThu.status}`
                );
            }

            const thuData = await responseThu.json();
            const sunData = await responseSun.json();

            setThuTheme(thuData);
            setSunTheme(sunData);
            setTimeout(() => onLoaded(), 0);
        } catch (error: any) {
            console.error("Error fetching themes", error);
        }
    };

    useEffect(() => {
        fetchThemes();
    }, []);

    return (
        <>
            <section
                className="flex flex-col justify-center items-center w-full mt-1
             md:flex md:flex-col md:mt-20
             lg:flex-col lg:h-auto "
            >
                <div className="Header-container-box w-10/12 mb-10 mt-20 flex justify-center items-center">
                    <h2 className="stroked-text text-red-800 text-center text-2xl uppercase font-extrabold my-5 px-20
        sm:text-3xl
        md:text-4xl
        lg:text-5xl
        xl:text-5xl">
                        Temadagar
                    </h2>
                </div>


                <article
                    className="min-h-96 w-8/12 my-5 popOut-box
        flex flex-col justify-center items-center text-white
        lg:mb-20 "
                    id="thuTheme"
                >
                    <h2
                        className="stroked-text text-red-800 text-center text-3xl uppercase font-extrabold my-5 px-20
                     "
                    >
                        {thuTheme?.weekDay}
                    </h2>
                    <section
                        className="flex flex-col justify-center items-center
                    sm:flex-col 
                    md:flex-col 
                    lg:flex-col lg:p-0"
                    >
                        <Slideshow day="thursday" />
                        <div className=" w-10/12 flex flex-col justify-center items-center text-center my-10 mx-5 uppercase text-sm
            sm:text-base
            md:w-9/12 md:mb-20 md:mr-1 md:text-lg
            lg:mx-10 lg:w-8/12 lg:uppercase lg:text-xl lg:mb-20
            xl:text-2xl">
                            <p
                                className="flex flex-col justify-center items-center text-center  
               lg:"
                            >
                                under hela torsdagen spelas filmer från tidigt 1900-tal upp. Res tillbaka i tiden och njut!
                                <br />
                            </p>
                            <p className="italic text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">Boka biljett för enskild film vid ankomst eller på vår bokningssida.</p>
                        </div>
                    </section>
                </article>

                <article
                    className="min-h-96 w-8/12 my-5 popOut-box
        flex flex-col justify-center items-center text-white
        lg:mb-20"
                    id="sunTheme"
                >
                    <h2
                        className="stroked-text text-red-800 text-center text-3xl uppercase font-extrabold my-5 px-20 
                     "
                    >
                        {sunTheme?.weekDay}
                    </h2>
                    <section
                        className="flex flex-col justify-center items-center 
                    sm:flex-col
                    md:flex-col  
                    lg:flex-col "
                    >
                        <Slideshow day="sunday" />
                        <div className="w-10/12 flex flex-col justify-center items-end text-center my-10 mx-5 uppercase text-sm
            sm:text-base
            md:w-9/12 md:mb-20 md:mr-1 md:text-lg
            lg:mx-5 lg:w-8/12 lg:text-xl lg:mb-20
            xl:text-2xl">
                            <p
                                className="flex flex-col justify-center items-center text-center"
                            >
                                Vår lilla salong spelar gamla goda svenska klassiker under hela söndagen, morgon till kväll. <br /></p>
                            <p className="italic text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">Boka biljett för enskild film vid ankomst eller på vår bokningssida.</p>
                        </div>
                    </section>
                </article>
            </section>
        </>
    )
} 