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
                allowFullscreen
                ></iframe>
                </section>         
                <section className="flex flex-col md:flex-row gap-5 mt-5">
                    <section className="flex flex-col gap-5 w-full md:w-2/3">
                        <article className="text-center text-xl py-6 px-4 bg-[#24252C]">Titel: Jurassic Park - Genre: Science-fiction, Action - 
                            Utgivningsår: 1993 - Speltid: 122 min - Regissör: Steven Spielberg - Skådespelare: Sam Neill, Laura Dern, Jeff Goldblum m.fl.</article>
                        <article className="text-center text-xl py-6 px-6 bg-[#24252C]">Den excentriske mångmiljonären John Hammond bjuder in två dinosaurieexperter till sin nöjespark 
                            på en ö utanför Costa Rica. Hammond har lyckats skapa levande dinosaurier genom att klona DNA från förhistoriska insekter.
                            <article className="text-base pt-8 space-y-8">
                                <p>"Jakten på den försvunna skatten, Aliens, Hajen och Total Recall var alla väldigt bra.
                                Men det var bara uppvärmning till Jurassic Park, som tar hjärnan på en berg-och-dalbana och kittlar nerverna ända
                                ner till maggropen." - Ben Fenster, Arizona Republic</p>
                                
                                <p>"Jurassic Park är dinosauriekungen av sommarfilmer, en enorm Hollywood-dängare som inte bara har ben, men också tänder."
                                    - Jay Carr, Boston Globe
                                </p>

                            </article>
                            </article>
                    </section>
                    <img src="https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg" alt="Movie poster" className="w-full md:w-1/3 object-cover"/>
                </section>
                <Link to={"/booking"}>
                <button className="bg-red-700 hover:bg-red-500 text-white cursor-pointer font-bold py-2 px-4 rounded-full text-3xl mt-20 mb-20 mx-auto w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3 h-40 text-center flex items-center justify-center">Boka Biljetter</button>
                </Link>
            </section>
            </main>
        </>
    );
}