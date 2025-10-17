import { useState } from "react";
import { useSeats } from "./context/SeatsContext";
// import { io } from "socket.io-client";  //Used for socket.io 



//Provides the function for theater overview with chairs that can be clicked and chosen.
interface Theater {
  id: string;
  name: string;
  seatsPerRow: number[];
  Funktionhinderanpassade: { row:number; seat:number }[];
}

interface TheaterViewProps {
  theaterView: Theater;
}
// const socket = io("http://localhost:4321"); // Varible declared after the localhost we running on. 
//Shall be used in useEffect for fetch API

export default function TheaterView(
  { theaterView }: TheaterViewProps
) {

  //State for selected seats using a Set to avoid duplicates.
  const [selectedSeat, setSelectedSeat] = useState<Set<string>>(new Set());

  //Getting total tickets from useSeats
  const { totalTickets } = useSeats();

  //Function for toggling the seats when clicked.
  const toggle = (rowI: number, seatI: number) => {
    const key = `${rowI}-${seatI}`;
    setSelectedSeat((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key); // Deselect the seat if already selected
      } else {
        if (newSet.size >= totalTickets) {
          return prev; // Do not add more seats if limit is reached
        }
        newSet.add(key); // Add the seat if not already selected
      }
      return newSet;
    });
  };

  {
    /*----------Container for a view of the salons----------*/
  }
  return (
    <section className="flex flex-col w-full h-auto jutify-center items-center mt-5 mb-5 container_box
                        sm:w-full sm:h-auto 
                        md:flex md:justify-center items-center md:w-11/12 md:mt-0 
                        lg:w-full
    ">
      <article className="flex flex-col justify-center w-11/12 h-auto m-3 container_content
                          md:w-11/12 md:h-auto 
                          lg:w-8/12 lg:h-auto lg:mt-20 lg:mb-10 lg:p-5 lg:scale-125">
        <h2 className="p-3">{theaterView.name}</h2>
        <div>
          {theaterView.seatsPerRow.map((seatCount, rowI) => (
            <div key={rowI}>
              {Array.from({ length: seatCount }).map((_, seatI) => {
                const key = `${rowI}-${seatI}`;
                const selected = selectedSeat.has(key);
                const isAccesible = theaterView.Funktionhinderanpassade?.some(
                  (s) => s.row === rowI && s.seat === seatI)

                return (
                  <button
                    key={seatI}
                    onClick={() => toggle(rowI, seatI)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: selected ? "green" : isAccesible ? "#dede39" : "#243365",
                      border: "1px solid white",
                      cursor: "pointer",
                    }}
                    title={`Rad ${rowI + 1}, stol ${seatI + 1} ${isAccesible ? "(Funktionshinderanpassade)" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <span>
          <strong className="font-medium">Valda Stolar:</strong> {Array.from(selectedSeat).join(", ")}
        </span>
      </article>

      {/*----------Container for chosing chairs-button----------*/}
      <section className="flex flex-row justify-end">
        <button className="main_buttons w-20 h-8 m-5 text-sm">Välj</button>

      </section>
      <p className="mb-2">Antal platser valda: {selectedSeat.size} / {totalTickets}</p>
    </section>
  );
}



