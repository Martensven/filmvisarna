import cinemapic from "../../../Components/booking/cinemapic.jpg"
//Components contains movie box, like poster, year, time and about the movie.
export default function MovieInformation() {
  return (
    <main
      className="flex flex-col justify-center items-center w-full h-auto
                   md:w-full md:place-items-center md:place-items-center"
    >
      {/*----------Container for movie poster and title, Genre, age and time----------*/}
      <section
        className="flex flex-col justify-center items-center container_box w-11/12 h-auto mb-5
                   sm:flex-row sm:w-11/12
                   md:w-11/12 md:h-auto md:ml-3 
                   lg:h-auto lg:w-10/12 lg:flex lg:items-start justify-start"
      >
        {/*----------Container for movie poster----------*/}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jaws_movie_poster.jpg/640px-Jaws_movie_poster.jpg"
          alt="FILM POSTER"
          className="flex justify-center items-center w-5/12 h-auto mt-3 rounded-md
                     sm:w-2/5 sm:mr-2 sm:mt-0 sm:p-2
                     md:w-2/7 md:h-auto md:m-1 md:p-2
                     lg:w-2/10 lg:ml-10 lg:h-auto"
        />

        {/*----------Container movie info ----------*/}
        <article
          className="flex flex-col justify-start w-11/12 h-auto pl-2 text-[#e4e1e1]
                    sm:w-6/12 sm:h-auto
                     md:w-3/6 md:h-auto 
                     lg:flex lg:justify-center lg:items-center lg:m-2 lg:w-4/12"
        >
          <h1
            className="flex w-5/12 h-auto text-left mt-3 text-lg underline
                      sm:text-xl sm:m-3 sm:h-auto
                       md:justify-start md:w-full md:text-3xl md:mt-10 md:ml-0
                       lg:m-1"
          >
            Jaws
          </h1>
          <ul className="w-full h-full text-left mb-3 
                        sm:text-lg sm:ml-3 sm:h-auto
                        md:w-full md:h-full md:text-md md:ml-0 
                        lg:m-1">
            <li className="text-xs italic md:text-sm">År: 1975</li>
            <li className="text-xs italic md:text-sm">
              Genre: Thriller/Horror
            </li>
            <li className="text-xs pt-4 text-left w-full h-full
                          sm:text-base sm:text-start sm:w-full sm:h-auto sm:pt-2 sm:mt-10
                          md:text-start md:mt-5 md:text-sm md:w-11/12">
              ”När en jättelik vithaj dödligt attackerar simmare vid Amity
              Islands stränder slår sig sheriff Martin Brody ihop med en
              marinbiolog och en lokal fiskare för att jaga varelsen.”
            </li>
          </ul>
        </article>
        <img src={cinemapic} alt="Cinema overview pic for fill" className="invisible w-0 rounded-md [mask-image:linear-gradient(to_right,transparent,black,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]
                                                                        sm:invisble 
                                                                        md:invisible  
                                                                        lg:visible lg:ml-10 lg:mt-12 lg:w-4/12"/>
      </section>
    </main>
  );
}
