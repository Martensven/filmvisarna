  import SeatsTheaters from "./../../../../Backend/exampleSeatsTheater"
  import TheaterComponent from "./TheaterComponent"
//Component for the view of  theater.

  export default function TheaterView() {

    return(
        <main>
          <section>
          {SeatsTheaters.map(t => (
            <TheaterComponent key={t.id} theaterView={t} />
            ))}
          </section>
        </main>
   );
  }
  
  