  import SeatsTheaters from "../../../../Backend/exampleSeatsTheater"
  import TheaterView from "./TheaterView"
//Component for the view of  theater.

  export default function TheaterViewContainer() {

    return(
        <main className="w-full
                        sm:w-11/12 sm:h-auto 
                        md:w-full md:flex md:justify-center md:items-start ">
          <section className="w-11/12 flex flex-col justify-start items-start ml-9">
          {SeatsTheaters.map(t => (
            <TheaterView key={t.id} theaterView={t} />
            ))}
          </section>
        </main>
   );
  }
  
  