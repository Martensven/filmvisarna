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
        <main className="w-full flex justify-center">
          <section className="w-11/12 flex flex-col justify-start items-center">
          
            <TheaterView key={theater.id} theaterView={theater} />
          
          </section>
        </main>
   );
  }
  
  