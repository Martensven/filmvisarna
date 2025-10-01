import CalenderComponent from "./CalenderComponent";
import AmountTheaterSeats from "./AmountTheaterSeats";

//Component for the calender with viewtimes and selecting seats

interface Props {
  onSelectTheater: (theater: string) => void;
}

export default function CalenderAndSeats({ onSelectTheater }: Props) {
    return(
        <article className="w-full flex justify-center items-center
                            md:w-6/12 md:flex md:justify-start md:items-start md:ml-10
                            lg:w-11/12 lg:h-auto lg:ml-0">
            
      {/*----------Parent Container for choosing date and tickets----------*/}
      <section
        className="flex flex-col justify-center items-center w-full
                   container_box  h-auto 
                   sm:w-11/12 sm:h-auto
                   md:w-11/12 md:h-auto
                   lg:h-auto"
      >
        {/*----------Child container for date----------*/}
        <article
          className="flex flex-col justify-center w-11/12
                     sm:w-11/12 sm:h-auto 
                     md:flex-col md:justify-center md:items-center md:w-11/12 md:h-auto md:pt-6 md:pb-2
                     lg:pb-0"
        >
        {/*----------Getting the Calender component for all the dates and views----------*/}
          <CalenderComponent onSelectTheater={onSelectTheater} />
        </article>
        
        {/*----------Child container for selecting seats----------*/}
        <article
          className="flex flex-row justify-center items-center w-11/12 h-auto mt-5 mb-5 container_content
                    sm:w-11/12
                     md:w-11/12 md:flex-col md:justify-center md:items-center md:pb-2
                     lg:pb-0 lg:mt-4"
        >

        {/*----------Getting the component for selecting how many seats and agespan----------*/}
          <AmountTheaterSeats />
        </article>
      </section>
        </article>
    )
}