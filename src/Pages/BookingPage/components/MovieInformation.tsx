import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface FetchedMovieInfo {
  _id: string;
  imageSrc: string;
  title: string;
  releaseYear: number;
  genre: string[];
  length: number;

}
//Components contains movie box, like poster, year, time and about the movie.
export default function MovieInformation() {
  const { id } = useParams(); //Movie id with url params
  const [movieInfo, setMovieInfo] = useState<FetchedMovieInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const response = await fetch(`/api/movie/${id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Kan inte hämta data, (${response.status})`);
        }

        const data = await response.json();
        console.log("Hämtad data: ", data);
        setMovieInfo(data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieInfo();
  }, [id]);

  if (loading) {
    return <p>Laddar data</p>;
  }

  if (!movieInfo) {
    return <p>Ingen filmdata kunde hämtas</p>;
  }

  return (
    
    <main
      className="movieBoxScreeningContainer flex flex-col justify-center items-center w-10/12 h-auto
      md:w-full md:justify-center md:items-center
      lg:w-7/12
      xl:w-6/12 xl:flex-col"
    >
      
     
        {/*----------Container for movie poster----------*/}
        <img
          src={movieInfo.imageSrc}
          alt={movieInfo.title}
          className="moviePoster flex justify-center items-center max-w-42 h-auto ml-2 mt-7 mb-2 rounded-md shadow-lg/30
                     sm:min-w-50 sm:mt-7 
                     md:min-w-50 md:ml-0
                     lg:w-50 lg:mt-4"
        />

        {/*----------Container movie info ----------*/}
        <article
          className="boxForDesc flex flex-col justify-start items-start ml-5
          sm:justify-center sm:items-center sm:min-w-50 sm:mb-5
          md:justify-center md:items-center md:ml-0 md:mb-0
          xl:justify-start xl:w-4/12"
        >
          <h1
            className="movieTitle flex w-full h-auto text-base underline 
            md:justify-center md:items-center md:text-lg md:w-full"
          >
            {movieInfo.title}
          </h1>

          <ul
            className="movieDesc w-full h-full text-left mb-3
                        sm:text-lg sm:h-auto
                        md:w-full md:h-full md:text-md md:ml-0 md:text-center
                        lg:m-1 lg:h-15"
          >
            <li
              className="text-sm italic mb-2
              md:text-base
              xs:text-xs"
            >
              {movieInfo.releaseYear}
            </li>
            <li
              className="text-sm italic
              md:text-center md:text-base"
            >
              {`Längd: ${Math.floor(movieInfo.length/60)}h ${movieInfo.length % 60} min`}  {/*Returning the result to hours and minutes for easier knwoing of the length*/}
            </li>
          </ul>
        </article>

    </main>
  );
}
