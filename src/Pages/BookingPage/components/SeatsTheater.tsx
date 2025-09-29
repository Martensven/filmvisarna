import { useState } from "react";

export default function SeatsTheater() {
  //Creating useState method to give user a ticket counter.
  const [countAdult, setCountAdult] = useState<number>(1); //Always a start with 1
  const [countSenior, setCountSenior] = useState<number>(1);
  const [countChild, setCountChild] = useState<number>(1);

  //Adult ticket count.
  const incrementAdult: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCountAdult((prev) => prev + 1);
  };
  const decrementAdult: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCountAdult((prev) => (prev > 0 ? prev - 1 : 0));
  }; //decrement but prevents a number under 0

  //Senior ticket count.
  const incrementSenior: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCountSenior((prev) => prev + 1);
  };
  const decrementSenior: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCountSenior((prev) => (prev > 0 ? prev - 1 : 0));
  };

  //Child ticket count.
  const incrementChild: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCountChild((prev) => prev + 1);
  };
  const decrementChild: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCountChild((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <main className="flex flex-col justify-center items-center w-86 h-auto">
      <div className="flex flex-row justify-between w-72 h-auto">
        <h2 className="text-[#e4e1e1] text-s m-2 md:text-s">Vuxen 140kr</h2>
        <section className="flex flex-row justify-content items-center">
          <button
            className="seat_range_buttons w-7 h-7 mr-5 align cursor-pointer"
            onClick={decrementAdult}
            aria-label="Minska biljetter"
          >
            -
          </button>
          <p className="text-m ml-2 mr-2">{countAdult}</p>
          <button
            className="seat_range_buttons w-7 h-7 ml-5 cursor-pointer"
            onClick={incrementAdult}
            aria-label="Öka biljetter"
          >
            +
          </button>
        </section>
      </div>

      <div className="flex flex-row justify-between w-72 h-auto">
        <h2 className="text-[#e4e1e1] text-s m-2 md:text-s">Senior 120kr</h2>
        <section className="flex flex-row justify-content items-center">
          <button
            className="seat_range_buttons w-7 h-7 mr-5 align cursor-pointer"
            onClick={decrementSenior}
            aria-label="Minska biljetter"
          >
            -
          </button>
          <p className="text-m ml-2 mr-2">{countSenior}</p>
          <button
            className="seat_range_buttons w-7 h-7 ml-5 cursor-pointer"
            onClick={incrementSenior}
            aria-label="Öka biljetter"
          >
            +
          </button>
        </section>
      </div>

      <div className="flex flex-row justify-between w-72 auto">
        <h2 className="text-[#e4e1e1] text-s m-2 md:text-s">Barn 80kr</h2>
        <section className="flex flex-row justify-content items-center">
          <button
            className="seat_range_buttons w-7 h-7 mr-5 align cursor-pointer"
            onClick={decrementChild}
            aria-label="Minska biljetter"
          >
            -
          </button>
          <p className="text-m ml-2 mr-2">{countChild}</p>
          <button
            className="seat_range_buttons w-7 h-7 ml-5 cursor-pointer"
            onClick={incrementChild}
            aria-label="Öka biljetter"
          >
            +
          </button>
        </section>
      </div>

      <button className="main_buttons w-36 m-4 cursor-pointer">Välj</button>
    </main>
  );
}
