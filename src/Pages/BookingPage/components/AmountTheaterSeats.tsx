import { useSeats } from "./context/SeatsContext";

export default function AmountSeatsTheater() {
  const {
    countAdult,
    setCountAdult,
    countSenior,
    setCountSenior,
    countChild,
    setCountChild,
    
  } = useSeats();



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
    <main className="flex flex-col justify-center items-center w-11/12 h-auto 
                    lg:w-11/12
                    xl:w-4/12 xl:justify-around xl:items-center xl:h-80">
      <div className="flex flex-row justify-between w-72 h-auto mt-2 p-2 
      md:w-10/12 md:m-1 md:justify-between
      lg:w-11/12 lg:justify-between lg:mt-2 lg:p-1">
        <h2 className="text-[#e4e1e1] text-sm m-1 md:text-sm md:m-5 xl:text-lg">Vuxen 140kr</h2>
        <section className="flex flex-row items-center md:mr-2">
          <button
            className="seat_range_buttons w-7 h-7 mr-5 align cursor-pointer 
            md:w-5 md:h-5 md:mr-3 md:flex md:justify-center md:items-center"
            onClick={decrementAdult}
            aria-label="Minska biljetter"
          >
            -
          </button>
          <p className="text-m ml-2 mr-2 md:text-xs">{countAdult}</p>
          <button
            className="seat_range_buttons w-7 h-7 ml-5 cursor-pointer
            md:w-5 md:h-5 md:ml-3 md:flex md:justify-center md:items-center"
            onClick={incrementAdult}
            aria-label="Öka biljetter"
          >
            +
          </button>
        </section>
      </div>

      <div className="flex flex-row justify-between w-72 h-auto mt-2 p-2 
      md:w-10/12 md:m-1 md:justify-between
      lg:w-11/12 lg:justify-between lg:mt-2 lg:p-1 lg:text-base">
        <h2 className="text-[#e4e1e1] text-s m-2 md:text-sm md:m-5 xl:text-lg">Senior 120kr</h2>
        <section className="flex flex-row justify-content items-center md:mr-2">
          <button
            className="seat_range_buttons w-7 h-7 mr-5 align cursor-pointer
            md:w-5 md:h-5 md:mr-3 md:flex md:justify-center md:items-center"
            onClick={decrementSenior}
            aria-label="Minska biljetter"
          >
            -
          </button>
          <p className="text-m ml-2 mr-2 md:text-xs">{countSenior}</p>
          <button
            className="seat_range_buttons w-7 h-7 ml-5 cursor-pointer
            md:w-5 md:h-5 md:ml-3 md:flex md:justify-center md:items-center"
            onClick={incrementSenior}
            aria-label="Öka biljetter"
          >
            +
          </button>
        </section>
      </div>

      <div className="flex flex-row justify-between w-72 h-auto mt-2 p-2 
      md:w-10/12 md:m-1 md:justify-between
      lg:w-11/12 lg:justify-between lg:mt-2 lg:p-1">
        <h2 className="text-[#e4e1e1] text-s m-2  md:text-sm md:m-5 xl:text-lg">Barn 80kr</h2>
        <section className="flex flex-row justify-content items-center md:mr-2">
          <button
            className="seat_range_buttons w-7 h-7 mr-5 align cursor-pointer
            md:w-5 md:h-5 md:mr-3 md:flex md:justify-center md:items-center"
            onClick={decrementChild}
            aria-label="Minska biljetter"
          >
            -
          </button>
          <p className="text-m ml-2 mr-2 md:text-xs">{countChild}</p>
          <button
            className="seat_range_buttons w-7 h-7 ml-5 cursor-pointer
            md:w-5 md:h-5 md:ml-3 md:flex md:justify-center md:items-center"
            onClick={incrementChild}
            aria-label="Öka biljetter"
          >
            +
          </button>
        </section>


      </div>
      </main>
  );
}



