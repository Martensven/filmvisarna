import TheaterView from "./TheaterView";
import type { Theater, Showing } from "../../../Interfaces/type.ts";
import { useState, useEffect } from "react";

interface Props {
  selectTheaterId: string | null;
  selectShowing: string | null; // Screening ID now, not movie ID
}

export default function TheaterViewContainer({ selectTheaterId, selectShowing }: Props) {
  const [theater, setTheater] = useState<Theater | null>(null);
  const [currentShowing, setCurrentShowing] = useState<Showing | null>(null);

  // Fetch the auditorium info
  useEffect(() => {
    if (!selectTheaterId) return;

    const fetchTheater = async () => {
      try {
        const res = await fetch(`/api/auditoriums/${selectTheaterId}`, {
          method: "GET",
          headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();
        console.log("This is auditorium data:", data);
        setTheater(data);
      } catch (err) {
        console.error("Failed to fetch theater:", err);
      }
    };

    fetchTheater();
  }, [selectTheaterId]);

  // Fetch the selected showing (screening)
  useEffect(() => {
    if (!selectShowing) return;

    const fetchShowing = async () => {
      try {
        const res = await fetch(`/api/screening/${selectShowing}`, {
          method: "GET",
          headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();
        console.log("this is screening data:", data);
        setCurrentShowing(data);
      } catch (err) {
        console.error("Failed to fetch showing:", err);
      }
    };

    fetchShowing();
  }, [selectShowing]);

  if (!theater) return <p className="TheaterSide w-full flex flex-col justify-start items-start 
    sm:w-11/12 sm:h-auto 
    md:w-full md:flex md:justify-center md:items-center md:mt-5 
    lg:w-9/12 lg:h-auto lg:mt-7 lg:flex lg:justify-start lg:items-center ">Laddar salong...</p>;
  if (!currentShowing) return <p>Laddar föreställning...</p>;
  if (!theater) return null;
  if (!currentShowing) return null;

  return (
    <main>
      <section className="Theaterbox h-auto flex justify-center items-center p-2 w-full
      sm:w-full 
      md:w-full md:flex md:flex-col md:justify-center md:items-center 
      lg:w-full lg:flex lg:justify-center lg:items-center lg:h-200 lg:mt-0">
        <TheaterView key={currentShowing._id} selectShowing={currentShowing} />
      </section>
    </main>
  );
}
