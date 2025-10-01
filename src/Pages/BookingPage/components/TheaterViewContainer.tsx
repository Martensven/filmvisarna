  import SeatsTheaters from "../../../../Backend/exampleSeatsTheater"
  import TheaterView from "./TheaterView"
//Component for the view of  theater.

  export default function TheaterViewContainer() {

    return(
        <main className="w-full flex flex-col justify-center items-center
                        sm:w-11/12 sm:h-auto 
                        md:w-11/12 md:flex md:justify-center md:items-start ">
          <section className="w-11/12 
                              sm:w-full
                              md:w-full md:flex md:flex-col md:justify-start md:items-start md:mr-9">
          {SeatsTheaters.map(t => (
            <TheaterView key={t.id} theaterView={t} />
            ))}
          </section>
        </main>
   );
  }
  
  