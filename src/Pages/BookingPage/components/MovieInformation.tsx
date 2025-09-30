import CalenderComponent from "./CalenderComponent";
import TheaterSeats from "./TheaterSeats";

export default function MovieInformation() {
  return (
    <main
      className="flex flex-col justify-center items-center w-full h-auto
                 md:grid md:grid-cols-[2fr_1fr] md:gap-2 md:items-start md:w-full"
    >
      {/*----------Container for movie poster and title, Genre, age and time----------*/}
      <section
        className="flex flex-row container_box w-11/12 h-auto mb-5
                   sm:w-11/12
                   md:w-100 md:h-auto md:ml-3 
                   lg:h-80"
      >
        {/*----------Container for movie poster----------*/}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jaws_movie_poster.jpg/640px-Jaws_movie_poster.jpg"
          alt="FILM POSTER"
          className="flex justify-center items-center w-50 h-auto p-2 rounded-md
                     sm:w-1/2 sm:mr-2
                     md:w-5/6 md:h-auto md:m-5 lg:h-100 "
        />

        {/*----------Container movie info ----------*/}
        <article
          className="flex flex-col justify-start w-6/12 h-auto text-[#e4e1e1]
                    sm:w-6/12 sm:h-auto
                     md:w-3/6 md:h-auto 
                     lg:flex lg:justify-center lg:items-center lg:m-2"
        >
          <h1
            className="flex w-5/12 h-auto text-left mt-3 text-lg underline
                      sm:text-xl sm:m-3 sm:h-auto
                       md:justify-start md:w-full md:text-3xl md:mt-10 lg:m-1"
          >
            Jaws
          </h1>
          <ul className="w-full h-25 text-left
                        sm:text-base sm:ml-3 sm:h-auto
                        md:w-full md:h-auto md:text-md lg:m-1">
            <li className="text-xs italic md:text-sm">År: 1975</li>
            <li className="text-xs italic md:text-sm">
              Genre: Thriller/Horror
            </li>
            <li className="h-auto text-xs pt-4 text-center
                          sm:text-base sm:text-start sm:w-50 sm:h-auto sm:pt-2 sm:mt-10
                          md:text-start md:mt-5 md:text-sm ">
              ”När en jättelik vithaj dödligt attackerar simmare vid Amity
              Islands stränder slår sig sheriff Martin Brody ihop med en
              marinbiolog och en lokal fiskare för att jaga varelsen.”
            </li>
          </ul>
        </article>
      </section>

      {/*----------Container for choosing date and tickets----------*/}
      <section
        className="flex flex-col justify-center items-center w-11/12 p-10
                   container_box  h-auto 
                   sm:w-4/5 sm:h-auto
                   md:w-76 md:h-auto md:m-2 
                   lg:h-80"
      >
        {/*----------Container for date and tickets components----------*/}
        <section
          className="flex flex-col justify-center w-11/12
                     sm:w-4/5 sm:h-auto 
                     md:flex-col md:justify-center md:items-center md:w-full md:h-auto"
        >
          <CalenderComponent />
        </section>
        <section
          className="flex flex-row justify-center w-80 h-auto mt-5 mb-5 container_content
                     md:w-11/12 md:flex-col md:justify-center md:items-center"
        >
          <TheaterSeats />
        </section>
      </section>
    </main>
  );
}
