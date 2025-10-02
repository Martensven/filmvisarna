import { useParams, Link } from 'react-router-dom';
import exampleList from '../../../Backend/example';

export default function DetailMovie() {
    const { id } = useParams();
    const movie = exampleList.find((m) => m.id === Number(id));

    if (!movie) {
        return <p className="text-white text-center mt-10">Filmen hittades inte.</p>
    }

    return (
        <main className="w-screen flex flex-col items-center text-white">          
            <section className="w-full px-4 sm:px-10 md:px-20">
                <section className="mt-5 w-full aspect-video bg-[#24252C]">
                    <iframe className="w-full h-full"
                        src={`https://www.youtube.com/embed/${movie.youtubeTrailers}`}
                        title={movie.movieName + " Trailer"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </section>         
                <section className="flex flex-col md:flex-row gap-5 mt-5">
                    <section className="flex flex-col gap-5 w-full md:w-2/3">
                        <article className="text-center text-3xl py-6 px-4 bg-[#24252C] shadow-md rounded-md">
                            Titel: {movie.movieName} - Genre: {movie.genre.join(", ")} - 
                            Utgivningsår: {movie.releaseYear} - Speltid: {movie.length} min - 
                            Regissör: {movie.director} - Skådespelare: {movie.actors.join(", ")}
                        </article>
                        <article className="text-center text-3xl py-6 px-6 bg-[#24252C] shadow-md rounded-md">
                            {movie.description}
                            <article className="text-3xl pt-8 space-y-12 shadow-md rounded-md">
                                <p className="font-[Noto_Sans] underline">Recensioner</p>
                                {movie.reviews.map((review, idx) => (
                                    <p key={idx} className="text-amber-200 italic font-[Noto_Sans]">
                                        "{review.comment}" - {review.reviewer}
                                    </p>
                                ))}
                            </article>
                        </article>
                    </section>
                    <img src={movie.image} alt="Movie poster" className="w-full md:w-1/3 object-cover"/>
                </section>
                <Link to={"/booking"}>
                    <button className="bg-[#243365] text-white cursor-pointer py-4 px-4 rounded-md text-2xl mt-20 mb-20 mx-auto w-1/5 sm:w-1/3 md:w-1/2 lg:w-1/5 h-20 min-h-10 min-w-30 text-center flex items-center justify-center">
                        Boka Biljetter
                    </button>
                </Link>
            </section>
        </main>
    );
}