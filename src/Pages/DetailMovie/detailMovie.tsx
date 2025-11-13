import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./../BookingPage/BookingPageStyle.css"

export default function DetailMovie() {
    const { id } = useParams(); // get movie ID from URL params
    const [movie, setMovie] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch movie details based on ID
    const fetchMovie = async () => {
        try {
            const response = await fetch(`/api/movie/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Serverfel: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched movie:", data);
            setMovie(data);
        } catch (error: any) {
            console.error("Error fetching movie:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);


    if (loading) {
        return <p className="text-white text-center mt-10">Laddar film...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center mt-10">Fel: {error}</p>;
    }

    if (!movie) {
        return <p className="text-white text-center mt-10">Filmen hittades inte.</p>;
    }

    // Render movie details
    return (
        <main className="w-screen flex flex-col items-center text-white">
            {/* Section for all components */}
            <section className="flex flex-col justify-center items-center w-full px-4
            xs:p-2 
            sm:px-10 
            xl:w-11/12 xl:px-2">
                <section>
                    {/* Detaljer */}
                    <section className="flex flex-col container_box mb-5 justify-center items-center  mt-5 w-[90vw]
                md:items-center
                xl:flex-row
                ">
                        <section className="p-0 lg:ml-10 mt-0">
                            {/* Movie Poster */}
                            <h2 className="h-11 text-2xl pl-2 pt-2 my-2
                        
                            lg:pt-3 lg:pl-3"></h2>
                            <img
                                src={movie.imageSrc}
                                alt={`${movie.title} poster`}
                                className="h-130 rounded-md shadow-lg/30
                             lg:mr-5
                         "
                            />
                            <p className="h-16 "></p>
                        </section>



                        {/* Trailer */}
                        <article className="flex flex-col justify-center items-center  aspect-video ]
                        w-9/12
                    
                    ">
                            <h2 className="text-2xl pl-2 pt-2 my-2
                        
                            lg:pt-3 lg:pl-3">{movie.title}</h2>

                            <iframe
                                className="w-full h-72 rounded-md mt-2 mb-2 bg-blue-300 shadow-md shadow-blue-300/50
                        sm:h-72 
                        md:h-96 lg:ml-5 md:w-11/12
                        lg:h-130  lg:bg-blue-400 lg:shadow-lg lg:shadow-blue-400/50
                        xl:shadow-blue-400/50 
"
                                src={`https://www.youtube.com/embed/${movie.youtubeTrailers}`}
                                title={movie.title + " Trailer"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                            <p className="h-16 lg:w-9/12 flex justify-center items-center">{movie.description}</p>
                        </article>
                    </section>

                    {/* Section for movie details and reviews */}
                    <section className="flex flex-col  gap-5 w-full
                    lg:flex-row 
                    xl:h-auto">
                        {/* Movie details */}
                        <article className="text-center text-sm container_box mt-10
                        xs:mt-0
                        sm:text-base
                        ">
                            <p className="text-start pl-2 pt-0.5 my-2
                            lg:pt-0.5 lg:pl-3">
                                <strong>Genre:</strong>{" "}
                                {Array.isArray(movie.genres)
                                    ? movie.genres.map((g: { title: string }) => g.title).join(", ")
                                    : movie.genres?.title || "Okänd"}
                            </p>
                            <p className="text-start pl-2 pt-0.5 my-2
                            lg:pt-0.5 lg:pl-3"><strong>Utgivningsår:</strong> {movie.releaseYear}</p>
                            <p className="text-start pl-2 pt-0.5 my-2
                            lg:pt-0.5 lg:pl-3"><strong>Speltid: </strong> {movie.length} min</p>
                            <p className="text-start pl-2 pt-0.5 my-2
                            lg:pt-0.5 lg:pl-3"><strong>Regissör: </strong>
                                {Array.isArray(movie.directors)
                                    ? movie.directors.map((d: { name: string }) => d.name).join(", ")
                                    : movie.directors?.name || "Okänd"}
                            </p>
                            <p className="text-start pl-2 pt-0.5 pb-2 my-2
                            lg:pt-0.5 lg:pl-3">
                                <strong>Skådespelare:</strong>{" "}
                                {Array.isArray(movie.actors)
                                    ? movie.actors.map((a: { name: string }) => a.name).join(", ")
                                    : movie.actors?.name || "Okänd"}
                            </p>
                        </article>

                        {/* Reviews */}
                        <article className="text-center text-sm container_box
                        sm:text-base w-full">

                            {movie.reviews && movie.reviews.length > 0 && (
                                <article className="flex flex-col items-center justify-center  text-sm pt-5 space-y-4 pb-2 my-3
                                sm:text-base
                                md:
                                lg:pt-5 lg:pb-2">
                                    <p className="font-[Noto_Sans] underline">Recensioner</p>
                                    {movie.reviews.map((review: any, idx: number) => (
                                        <p key={idx} className=" text-amber-200 italic font-[Noto_Sans] border-b w-11/12 row-height:normal pb-4">
                                            "{review.review}"
                                            <br />
                                            - {review.author}, {review.publisher}
                                            <br />
                                            {"⭐".repeat(review.rating)}
                                        </p>
                                    ))}
                                </article>
                            )}
                        </article>
                    </section>
                </section>

                {/* Button linked to bookingPage */}
                <Link className="flex justify-center items-center w-32 h-15 mt-10" to={`/booking/${movie._id}`}>
                    <button className="main_buttons cursor-pointer w-32 h-15 text-center flex items-center justify-center
                     ">
                        Boka Biljetter
                    </button>
                </Link>
            </section>
        </main>
    );
}
