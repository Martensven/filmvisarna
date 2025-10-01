import { useState } from "react";
//Provides the function for theater overview with chairs that can be clicked and chosen.
interface Theater {
  id: string;
  name: string;
  seatsPerRow: number[];
}
interface PropsTheater {
  theaterView: Theater;
}

export default function TheaterView({ theaterView }: PropsTheater) {
  const [selectedSeat, setSelectedSeat] = useState<Set<string>>(new Set());

  const toggle = (rowI: number, seatI: number) => {
    const key = `${rowI}-${seatI}`;
    setSelectedSeat((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
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
                          lg:w-6/12 lg:h-4/5 lg:m-1">
        <h2 className="p-3">{theaterView.name}</h2>
        <div>
          {theaterView.seatsPerRow.map((seatCount, rowI) => (
            <div key={rowI}>
              {Array.from({ length: seatCount }).map((_, seatI) => {
                const key = `${rowI}-${seatI}`;
                const selected = selectedSeat.has(key);

                return (
                  <button
                    key={seatI}
                    onClick={() => toggle(rowI, seatI)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: selected ? "green" : "#243365",
                      border: "1px solid white",
                      cursor: "pointer",
                    }}
                    title={`Rad ${rowI + 1}, stol ${seatI + 1}`}
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
    </section>
  );
}
