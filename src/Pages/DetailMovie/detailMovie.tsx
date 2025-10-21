import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
            <section className="w-full px-4 sm:px-10 md:px-20">
                {/* Trailer */}
                <section className="mt-5 w-full aspect-video bg-[#24252C]">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${movie.youtubeTrailers}`}
                        title={movie.title + " Trailer"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </section>

                {/* Detaljer */}
                <section className="flex flex-col md:flex-row gap-5 mt-5">
                    <img
                        src={movie.imageSrc}
                        alt={`${movie.title} poster`}
                        className="w-full md:w-1/3 object-cover rounded-md shadow-md"
                    />
                    <section className="flex flex-col gap-5 w-full md:w-2/3">
                        <article className="text-center text-2xl py-6 px-4 bg-[#24252C] shadow-md rounded-md">
                            <p><strong>Titel:</strong> {movie.title}</p>
                            <p>
                                <strong>Genre:</strong>{" "}
                                {Array.isArray(movie.genres)
                                    ? movie.genres.map((g: { title: string }) => g.title).join(", ")
                                    : movie.genres?.title || "Okänd"}
                            </p>
                            <p><strong>Utgivningsår:</strong> {movie.releaseYear}</p>
                            <p><strong>Speltid: </strong> {movie.length} min</p>
                            <p><strong>Regissör: </strong>
                                {Array.isArray(movie.directors)
                                    ? movie.directors.map((d: { name: string }) => d.name).join(", ")
                                    : movie.directors?.name || "Okänd"}
                            </p>
                            <p>
                                <strong>Skådespelare:</strong>{" "}
                                {Array.isArray(movie.actors)
                                    ? movie.actors.map((a: { name: string }) => a.name).join(", ")
                                    : movie.actors?.name || "Okänd"}
                            </p>
                        </article>

                        <article className="text-center text-lg py-6 px-6 bg-[#24252C] shadow-md rounded-md">
                            <p>{movie.description}</p>

                            {/* Recensioner */}
                            {movie.reviews && movie.reviews.length > 0 && (
                                <article className="text-lg pt-8 space-y-4 shadow-md rounded-md">
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
                <Link to={`/booking/${movie._id}`}>
                    <button className="bg-[#243365] text-white cursor-pointer py-4 px-4 rounded-md text-2xl mt-20 mb-20 mx-auto w-1/5 sm:w-1/3 md:w-1/2 lg:w-1/5 h-20 min-h-10 min-w-30 text-center flex items-center justify-center">
                        Boka Biljetter
                    </button>
                </Link>
            </section>
        </main>
    );
}
