  import SeatsTheaters from "../../../../Backend/exampleSeatsTheater"
  import TheaterView from "./TheaterView"
//Component for the view of  theater.

interface Props {
  selectTheater: string;
}

  export default function TheaterViewContainer( { selectTheater }: Props) {
    const theater = SeatsTheaters.find(t => t.name === selectTheater);
    if (!theater) {
      return ;
    }

    return(
        <main className="w-full flex flex-col justify-center items-center
                        sm:w-11/12 sm:h-auto 
                        md:w-11/12 md:flex md:justify-center md:items-start
                        lg:h-auto lg:mt-5 ">
          <section className="w-11/12 
                              sm:w-full
                              md:w-full md:flex md:flex-col md:justify-start md:items-start md:mr-9
                              lg:h-auto">
            <TheaterView key={theater.id} theaterView={theater} />
          
          </section>
        </main>
   );
  }
  
  