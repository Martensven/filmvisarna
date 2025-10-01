import { Link } from "react-router";

export default function MoviePage() {
    return (
        <>
            <main className="w-screen flex flex-col items-center text-white">          
            <section className="w-full px-4 sm:px-10 md:px-20">
                <section className="mt-5 w-full aspect-video bg-[#24252C]">
                <iframe className="w-full h-full"
                src="https://www.youtube.com/embed/_jKEqDKpJLw?si=bwb5zPfTf-RnEkTH"
                title="Jurassic Park Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                </section>         
                <section className="flex flex-col md:flex-row gap-5 mt-5">
                    <section className="flex flex-col gap-5 w-full md:w-2/3">
                        <article className="text-center text-3xl py-6 px-4 bg-[#24252C] shadow-md rounded-md">Titel: Jurassic Park - Genre: Science-fiction, Action - 
                            Utgivningsår: 1993 - Speltid: 122 min - Regissör: Steven Spielberg - Skådespelare: Sam Neill, Laura Dern, Jeff Goldblum m.fl.</article>
                        <article className="text-center text-3xl py-6 px-6 bg-[#24252C] shadow-md rounded-md">Den excentriske mångmiljonären John Hammond bjuder in två dinosaurieexperter till sin nöjespark 
                            på en ö utanför Costa Rica. Hammond har lyckats skapa levande dinosaurier genom att klona DNA från förhistoriska insekter.
                            <article className="text-3xl pt-8 space-y-12 shadow-md rounded-md">
                                <p className="font-[Noto_Sans] underline">Recensioner</p>
                                <p className="text-amber-200 italic font-[Noto_Sans]">"Jakten på den försvunna skatten, Aliens, Hajen och Total Recall var alla väldigt bra.
                                Men det var bara uppvärmning till Jurassic Park, som tar hjärnan på en berg-och-dalbana och kittlar nerverna ända
                                ner till maggropen." - Ben Fenster, Arizona Republic</p>
                                
                                <p className="text-amber-200 italic font-[Noto_Sans]">"Jurassic Park är dinosauriekungen av sommarfilmer, en enorm Hollywood-dängare som inte bara har ben, men också tänder."
                                    - Jay Carr, Boston Globe</p>

                                <p className="text-amber-200 italic font-[Noto_Sans]">"Godzilla, släng dig i väggen -- eller låt en av Jurassic Parks velociraptorer göra det åt dig.
                                    Du är gårdagens nyheter, kompis." Judy Gerstel, Detroit Free Press</p>
                            </article>
                            </article>
                    </section>
                    <img src="/public/images/Jurassic-park.webp" alt="Movie poster" className="w-full md:w-1/3 object-cover"/>
                </section>
                <Link to={"/booking"}>
                <button className="bg-[#243365] text-white cursor-pointer py-4 px-4 rounded-md text-2xl mt-20 mb-20 mx-auto w-1/5 sm:w-1/3 md:w-1/2 lg:w-1/5 h-20 min-h-10 min-w-30 text-center flex items-center justify-center">Boka Biljetter</button>
                </Link>
            </section>
            </main>
        </>
    );
}