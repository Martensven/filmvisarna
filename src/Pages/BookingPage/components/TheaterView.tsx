  import SeatsTheaters  from "./../../../../Backend/exampleSeatsTheater"
  import TheaterComponent from "./TheaterComponent"


  export default function TheaterView() {
    return(
        <main>
        <section>
        {SeatsTheaters.map(t => (
            <TheaterComponent key={t.id} theaterView={t} />
            ))}
        </section>

        {/*----------Container for chosing chairs-button----------*/}
        <section className="flex flex-row justify-end">
          <button className="main_buttons w-20 h-8 m-3 text-sm">Välj</button>
        </section>


        </main>
    );
  }
  
  