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
            <section className="flex flex-col justify-center items-center w-full px-4
            xs:w-full xs:p-2 
            sm:px-10 
            md:px-10
            lg:px-10
            xl:w-11/12 xl:px-2">
                {/* Trailer */}
                <section className="flex flex-col justify-center items-center container_box mt-5 w-11/12 aspect-video bg-[#24252C]
                xs:h-62
                sm:h-86
                md:h-86
                lg:w-12/13 lg:h-110
                xl:w-11/12 xl:h-120 xl:mb-3">
                    <iframe
                        className="w-11/12 h-62 rounded-md mt-2 mb-2 bg-blue-300 shadow-md shadow-blue-300/50
                        sm:h-72
                        md:w-11/12 md:h-82
                        lg:w-9/12 lg:h-96 lg:bg-blue-400 lg:shadow-lg lg:shadow-blue-400/50
                        xl:w-9/12 xl:h-96 xl:bg-blue-400 lg:shadow-lg xl:shadow-blue-400/50
"
                        src={`https://www.youtube.com/embed/${movie.youtubeTrailers}`}
                        title={movie.title + " Trailer"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </section>

                {/* Detaljer */}
                <section className="flex flex-col justify-between items-center gap-5 mt-5 w-11/12
                sm:w-11/12
                md:flex-row md:items-start
                lg:w-11/12
                xl:w-11/12">
                    <img
                        src={movie.imageSrc}
                        alt={`${movie.title} poster`}
                        className="w-6/12 object-cover rounded-md shadow-lg/30
                        xs:w-7/12
                        sm:w-7/12
                        md:w-5/12 md:justify-start items-start
                        lg:w-5/12
                        xl:w-5/12"
                    />
                    <section className="flex flex-col gap-5 w-full
                    sm:w-full 
                    md:w-3/5
                    lg:
                    xl:h-auto">
                        <article className="text-center text-sm container_box mt-10
                        xs:mt-0
                        sm:text-base
                        md:mt-0
                        lg:mt-0
                        xl:mt-0">
                            <p className="text-start pl-2 pt-2
                            sm:
                            md:
                            lg:pt-3 lg:pl-3"><strong>Titel:</strong> {movie.title}</p>
                            <p className="text-start pl-2 pt-0.5
                            sm:
                            md:
                            lg:pt-0.5 lg:pl-3">
                                <strong>Genre:</strong>{" "}
                                {Array.isArray(movie.genres)
                                    ? movie.genres.map((g: { title: string }) => g.title).join(", ")
                                    : movie.genres?.title || "Okänd"}
                            </p>
                            <p className="text-start pl-2 pt-0.5
                            sm:text-base
                            md:
                            lg:pt-0.5 lg:pl-3"><strong>Utgivningsår:</strong> {movie.releaseYear}</p>
                            <p className="text-start pl-2 pt-0.5
                            lg:pt-0.5 lg:pl-3"><strong>Speltid: </strong> {movie.length} min</p>
                            <p className="text-start pl-2 pt-0.5
                            lg:pt-0.5 lg:pl-3"><strong>Regissör: </strong>
                                {Array.isArray(movie.directors)
                                    ? movie.directors.map((d: { name: string }) => d.name).join(", ")
                                    : movie.directors?.name || "Okänd"}
                            </p>
                            <p className="text-start pl-2 pt-0.5 pb-2
                            lg:pt-0.5 lg:pl-3 pb-3">
                                <strong>Skådespelare:</strong>{" "}
                                {Array.isArray(movie.actors)
                                    ? movie.actors.map((a: { name: string }) => a.name).join(", ")
                                    : movie.actors?.name || "Okänd"}
                            </p>
                        </article>

                        <article className="text-center text-sm container_box
                        sm:text-base">
                            <p className=" pt-2 px-2 mb-2
                            lg:px-1 lg:py-4">{movie.description}</p>

                            {/* Recensioner */}
                            {movie.reviews && movie.reviews.length > 0 && (
                                <article className="text-sm pt-5 space-y-4 pb-2
                                sm:text-base
                                md:
                                lg:pt-5 lg:pb-2">
                                    <p className="font-[Noto_Sans] underline">Recensioner</p>
                                    {movie.reviews.map((review: any, idx: number) => (
                                        <p key={idx} className="text-amber-200 italic font-[Noto_Sans] border-b-1 row-height:normal pb-4">
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

                {/* Boka-knapp */}
                <Link className="flex justify-center items-center w-full" to={`/booking/${movie._id}`}>
                    <button className="main_buttons cursor-pointer w-2/5 h-15 text-center flex items-center justify-center mt-10
                    sm:w-1/3 
                    md:w-1/2 
                    lg:w-2/12 lg:h-10 lg:mt-20">
                        Boka Biljetter
                    </button>
                </Link>
            </section>
        </main>
    );
}
