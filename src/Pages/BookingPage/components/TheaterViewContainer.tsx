import TheaterView from "./TheaterView";
import type { Theater } from "../../../Interfaces/type.ts";
import { useState, useEffect } from "react";
//Component for the view of  theater.

interface Props {
  selectTheaterId: string | null;
  selectShowing: string | null;
}

  export default function TheaterViewContainer( { selectTheaterId, selectShowing }: Props) {
    console.log(selectShowing);
    console.log(selectTheaterId);
    const [theater, setTheater] = useState<Theater | null>(null)

const fetchTheater = async () => {
  if (!selectTheaterId) return;
  try {
    const response = await fetch(`/api/auditoriums/${selectTheaterId}`);
    const data = await response.json();
    console.log("Fetched data:", data); // <---- add this line
    setTheater(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

    useEffect(() => {
      console.log("Fetching for ID:", selectTheaterId);
      if(selectTheaterId) fetchTheater();
    }, [selectTheaterId]);

    if (!theater) return null;
    return(
        <main className="w-full flex flex-col justify-center items-center
                        sm:w-11/12 sm:h-auto 
                        md:w-full md:flex md:justify-center md:items-center md:mt-5
                        lg:w-11/12 lg:h-auto lg:mt-5 ">
          <section className="w-11/12 
                              sm:w-full
                              md:w-full md:flex md:flex-col md:justify-center md:items-center
                              lg:h-auto">
          <TheaterView key={theater._id} theaterView={theater} selectShowing={selectShowing} />
          </section>
        </main>
   );
  }
  
  