import CalenderComponent from "./CalenderComponent";
import AmountTheaterSeats from "./AmountTheaterSeats";

//Component for the calender with viewtimes and selecting seats

export default function CalenderAndSeats() {
    return(
        <aside className="w-full flex justify-center items-center md:px-0 md:justify-end md:pr-6">
            
      {/*----------Parent Container for choosing date and tickets----------*/}
      <section
        className="flex flex-col justify-center items-center w-11/12
                   container_box  h-auto 
                   sm:w-4/5 sm:h-auto
                   md:w-76 md:h-auto 
                   lg:h-80"
      >
        {/*----------Child container for date----------*/}
        <article
          className="flex flex-col justify-center w-11/12
                     sm:w-11/12 sm:h-auto 
                     md:flex-col md:justify-center md:items-center md:w-full md:h-auto"
        >
        {/*----------Getting the Calender component for all the dates and views----------*/}
          <CalenderComponent />
        </article>
        
        {/*----------Child container for selecting seats----------*/}
        <article
          className="flex flex-row justify-center items-center w-80 h-auto mt-5 mb-5 container_content
                     md:w-11/12 md:flex-col md:justify-center md:items-center"
        >

        {/*----------Getting the component for selecting how many seats and agespan----------*/}
          <AmountTheaterSeats />
        </article>
      </section>
        </aside>
    )
}