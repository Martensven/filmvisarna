  import SeatsTheaters from "./../../../../Backend/exampleSeatsTheater"
  import TheaterComponent from "./TheaterComponent"
//Component for the view of  theater.

  export default function TheaterView() {

    return(
        <main className="sm:w-4/5 sm:h-auto md:object-center md:w-11/12 ">
          <section>
          {SeatsTheaters.map(t => (
            <TheaterComponent key={t.id} theaterView={t} />
            ))}
          </section>
        </main>
   );
  }
  
  