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
            sm:px-10 
            md:px-20
            lg:px-10">
                {/* Trailer */}
                <section className="flex flex-col justify-center items-center container_box mt-5 w-11/12 aspect-video bg-[#24252C]">
                    <iframe
                        className="w-11/12 h-92 rounded-md 
                        sm:
                        md:
                        lg:w-11/12 lg:h-96 lg:bg-blue-400 lg:shadow-lg lg:shadow-blue-400/50
"
                        src={`https://www.youtube.com/embed/${movie.youtubeTrailers}`}
                        title={movie.title + " Trailer"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </section>

                {/* Detaljer */}
                <section className="flex flex-col gap-5 mt-5 w-11/12
                sm:
                md:flex-row
                lg: ">
                    <img
                        src={movie.imageSrc}
                        alt={`${movie.title} poster`}
                        className="w-full md:w-2/4 object-cover rounded-md shadow-md container_content"
                    />
                    <section className="flex flex-col gap-5 w-full
                    sm: 
                    md:w-3/5
                    lg:">
                        <article className="text-center text-lg py-6 px-4 container_box
                        sm:
                        md:
                        lg:p-3">
                            <p className="text-start px-2 py-0.5
                            sm:
                            md:
                            lg:pt-3 lg:pl-3"><strong>Titel:</strong> {movie.title}</p>
                            <p className="text-start px-2 py-0.5
                            sm:
                            md:
                            lg:pt-0.5 lg:pl-3">
                                <strong>Genre:</strong>{" "}
                                {Array.isArray(movie.genres)
                                    ? movie.genres.map((g: { title: string }) => g.title).join(", ")
                                    : movie.genres?.title || "Okänd"}
                            </p>
                            <p className="text-start px-2 py-0.5
                            sm:
                            md:
                            lg:pt-0.5 lg:pl-3"><strong>Utgivningsår:</strong> {movie.releaseYear}</p>
                            <p className="text-start px-2 py-0.5
                            lg:pt-0.5 lg:pl-3"><strong>Speltid: </strong> {movie.length} min</p>
                            <p className="text-start px-2 py-0.5
                            lg:pt-0.5 lg:pl-3"><strong>Regissör: </strong>
                                {Array.isArray(movie.directors)
                                    ? movie.directors.map((d: { name: string }) => d.name).join(", ")
                                    : movie.directors?.name || "Okänd"}
                            </p>
                            <p className="text-start px-2 py-0.5
                            lg:pt-0.5 lg:pl-3 pb-3">
                                <strong>Skådespelare:</strong>{" "}
                                {Array.isArray(movie.actors)
                                    ? movie.actors.map((a: { name: string }) => a.name).join(", ")
                                    : movie.actors?.name || "Okänd"}
                            </p>
                        </article>

                        <article className="text-center text-lg p-5 container_box">
                            <p className="
                            lg:px-1 lg:py-5">{movie.description}</p>

                            {/* Recensioner */}
                            {movie.reviews && movie.reviews.length > 0 && (
                                <article className="text-lg pt-8 space-y-4
                                sm:
                                md:
                                lg:pt-5 lg:pb-3">
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
                    <button className="main_buttons cursor-pointer w-1/5 h-20 text-center flex items-center justify-center
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
