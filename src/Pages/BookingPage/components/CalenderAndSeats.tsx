import CalenderComponent from "./CalenderComponent";
import AmountTheaterSeats from "./AmountTheaterSeats";

//Component for the calender with viewtimes and selecting seats

interface Props {
  onSelectTheater: (theater: string) => void;
}

export default function CalenderAndSeats({ onSelectTheater }: Props) {
    return(
        <article className="w-full flex justify-center items-center
                            md:w-1/3 md:flex md:justify-start md:items-start md:mr-7">
            
      {/*----------Parent Container for choosing date and tickets----------*/}
      <section
        className="flex flex-col justify-center items-center w-11/12
                   container_box  h-auto 
                   sm:w-11/12 sm:h-auto
                   md:w-full md:h-auto 
                   lg:h-80"
      >
        {/*----------Child container for date----------*/}
        <article
          className="flex flex-col justify-center w-11/12
                     sm:w-11/12 sm:h-auto 
                     md:flex-col md:justify-center md:items-center md:w-full md:h-auto"
        >
        {/*----------Getting the Calender component for all the dates and views----------*/}
          <CalenderComponent onSelectTheater={onSelectTheater} />
        </article>
        
        {/*----------Child container for selecting seats----------*/}
        <article
          className="flex flex-row justify-center items-center w-full h-auto mt-5 mb-5 container_content
                    sm:w-11/12
                     md:w-11/12 md:flex-col md:justify-center md:items-center"
        >

        {/*----------Getting the component for selecting how many seats and agespan----------*/}
          <AmountTheaterSeats />
        </article>
      </section>
        </article>
    )
}