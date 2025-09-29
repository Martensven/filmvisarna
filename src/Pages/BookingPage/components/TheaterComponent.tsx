import { useState } from "react";

interface Theater {
  id: string;
  name: string;
  seatsPerRow: number[];
}
interface PropsTheater {
  theaterView: Theater;
}

export default function TheaterComponent({ theaterView }: PropsTheater) {
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
    <section className="flex flex-col justify-center items-center w-100 h-100 mt-5 mb-5  container_box h-65 sm:h-80 md:w-4/5 md:h-96 lg:w-full">
      <article className="flex flex-col justify-between w-96 h-76 m-1 container_content md:h-96 lg:w-6/12 lg:h-4/5 lg:m-1">
        <h2 className="">{theaterView.name}</h2>
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
                      backgroundColor: selected ? "white" : "grey",
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
          <strong>Valda Stolar</strong> {Array.from(selectedSeat).join(", ")}
        </span>
      </article>
    </section>
  );
}
