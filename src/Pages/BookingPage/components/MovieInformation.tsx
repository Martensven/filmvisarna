import { useEffect, useState } from "react";
import cinemapic from "../../../Components/booking/cinemapic.jpg";
import { useParams } from "react-router-dom";

interface FetchedMovieInfo {
  _id: string;
  imageSrc: string;
  title: string;
  releaseYear: number;
  genre: string[];
  description: string;
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

  if(loading){
    return <p>Laddar data</p>
  }

  if(!movieInfo) {
    return <p>Ingen filmdata kunde hämtas</p>
  }

  return (
    <main
      className="movieInfoContainer flex flex-col justify-center items-center w-full h-auto
                   md:w-full md:place-items-center md:place-items-center"
    >
      {/*----------Container for movie poster and title, Genre, age and time----------*/}
      <section
        className="movieBoxContainer flex flex-col justify-center items-center container_box w-11/12 h-auto mb-5
                   sm:flex-row sm:w-11/12
                   md:w-11/12 md:h-auto 
                   lg:h-96 lg:w-11/12 lg:flex lg:items-center justify-start"
      >
        {/*----------Container for movie poster----------*/}
        <img
          src={movieInfo.imageSrc}
          alt={movieInfo.title}
          className="moviePoster flex justify-center items-center w-5/12 h-auto mt-3 rounded-md shadow-xl/30
                     sm:w-2/5 sm:mr-2 sm:mt-0 sm:p-0 
                     md:w-2/8 md:h-auto md:m-1 md:p-0 
                     lg:w-56 lg:h-auto lg:m-0 lg:ml-20"
        />

        {/*----------Container movie info ----------*/}
        <article
          className="boxForDesc flex flex-col justify-start w-11/12 h-auto pl-2 text-[#e4e1e1]
                    sm:w-6/12 sm:h-auto
                     md:w-3/6 md:h-auto 
                     lg:flex lg:justify-center lg:items-start lg:ml-8 lg:w-4/12"
        >
          <h1
            className="movieTitle flex w-5/12 h-auto text-left mt-3 text-lg underline
                      sm:text-xl sm:m-3 sm:h-auto
                       md:justify-start md:w-full md:text-3xl md:mt-10 md:ml-0
                       lg:m-0 lg:justify-start lg:items-canter"
          >
            {movieInfo.title}
          </h1>
          <ul
            className="movieDesc w-full h-full text-left mb-3 
                        sm:text-lg sm:ml-3 sm:h-auto
                        md:w-full md:h-full md:text-md md:ml-0 
                        lg:m-1"
          >
            <li className="text-xs italic md:text-sm">
              {movieInfo.releaseYear}
            </li>
            <li className="text-xs italic md:text-sm">{movieInfo.genre}</li>
            <li className="text-xs italic md:text-sm"> </li>
            <li
              className="text-xs pt-4 text-left w-full h-full
                          sm:text-base sm:text-start sm:w-full sm:h-auto sm:pt-2 sm:mt-10
                          md:text-start md:mt-5 md:text-sm md:w-11/12"
            >
              {movieInfo.description}
            </li>
          </ul>
        </article>
        <img
          src={cinemapic}
          alt="Cinema overview pic for fill"
          className="invisible w-0 rounded-md [mask-image:linear-gradient(to_right,transparent,black,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]
                                                                          sm:invisble w-0
                                                                          md:visible md:w-2/6 md:p-4 md:pb-40
                                                                          lg:visible lg:ml-40 lg:mt-1 lg:p-0 lg:w-3/10 md:rounded-md md:shadow-md"
        />
      </section>
    </main>
  );
}
