import CalenderComponent from "./CalenderComponent";
import TheaterSeats from "./TheaterSeats";


export default function CalenderAndSeats() {
    return(
        <aside className="w-full flex justify-center items-center md:px-0 md:justify-end md:pr-6">
            
      {/*----------Container for choosing date and tickets----------*/}
      <section
        className="flex flex-col justify-center items-center w-11/12
                   container_box  h-auto 
                   sm:w-4/5 sm:h-auto
                   md:w-76 md:h-auto 
                   lg:h-80"
      >
        {/*----------Container for date and tickets components----------*/}
        <article
          className="flex flex-col justify-center w-11/12
                     sm:w-11/12 sm:h-auto 
                     md:flex-col md:justify-center md:items-center md:w-full md:h-auto"
        >
          <CalenderComponent />
        </article>
        <article
          className="flex flex-row justify-center items-center w-80 h-auto mt-5 mb-5 container_content
                     md:w-11/12 md:flex-col md:justify-center md:items-center"
        >
          <TheaterSeats />
        </article>
      </section>
        </aside>
    )
}