import CalenderComponent from "./CalenderComponent";
import AmountTheaterSeats from "./AmountTheaterSeats";
import TheaterViewContainer from "./TheaterViewContainer";
import { useState } from "react"

//Component for the calender with viewtimes and selecting seats

interface Props {

  onSelectTheater: (theater: string) => void;
}

export default function CalenderAndSeats({ onSelectTheater }: Props) {

  
    return(
        <article className="CalenderTickets w-full flex justify-center items-center 
                            md:w-full md:flex md:justify-center md:items-center
                            lg:flex lg:flex-row lg:w-full lg:h-auto lg:ml-0">
            
      {/*----------Parent Container for choosing date and tickets----------*/}
      <section
        className="CalenderTicketsContainer flex flex-col justify-center items-center w-full
                   container_box  h-auto 
                   sm:w-11/12 sm:h-auto
                   md:w-11/12 md:h-auto
                   lg:flex lg:flex-row lg:justify-around lg:items-start lg:w-11/12 lg:h-auto"
      >
        {/*----------Child container for date----------*/}
        <article
          className="CalenderBox flex flex-col justify-center items-center w-full p-0
                     sm:w-11/12 sm:h-auto 
                     md:flex-col md:justify-center md:items-center md:w-11/12 md:h-auto md:pt-6 md:pb-2
                     lg:place-content-start lg:w-5/12 lg:p-1"
        >
        {/*----------Getting the Calender component for all the dates and views----------*/}
          <CalenderComponent onSelectTheater={onSelectTheater} />
        </article>
        
        {/*----------Child container for selecting seats----------*/}
        <article
          className="flex flex-row justify-center items-center w-11/12 h-auto mt-5 mb-5 glass_effect
                    sm:w-11/12
                    md:w-9/12 md:flex-col md:justify-center md:items-center md:pb-2
                    lg:pb-0 lg:mt-4 lg:w-3/12"
        >

        {/*----------Getting the component for selecting how many seats and agespan----------*/}
          <AmountTheaterSeats />
        </article>

      </section>
        </article>
    )
}