  import SeatsTheaters from "../../../../Backend/exampleSeatsTheater"
  import TheaterView from "./TheaterView"
//Component for the view of  theater.

  export default function TheaterViewContainer() {

    return(
        <main className="sm:w-4/5 sm:h-auto md:object-center md:w-11/12 ">
          <section>
          {SeatsTheaters.map(t => (
            <TheaterView key={t.id} theaterView={t} />
            ))}
          </section>
        </main>
   );
  }
  
  