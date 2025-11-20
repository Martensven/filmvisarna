import { useSeats } from "./context/SeatsContext";

export default function AmountSeatsTheater() {
  const {
    ticketTypes,
    counts,
    setCount,
    totalTickets,
    totalPrice,
  } = useSeats();

  if (!ticketTypes.length) {
    return (
      <main className="flex justify-center items-center mt-10">
        <p className="text-gray-300">Inga biljetter tillgängliga just nu.</p>
      </main>
    );
  }

  const TicketRow = ({
    id,
    label,
    count,
    price,
  }: {
    id: string;
    label: string;
    count: number;
    price: number;
  }) => (
    <div
      className="flex flex-row justify-between items-center w-72 h-auto mt-2 
      md:w-10/12 md:m-1
      lg:w-11/12"
    >
      <h2 className="text-[#e4e1e1] text-sm m-1 md:text-sm md:m-5 xl:text-lg">
        {label} {price} kr
      </h2>
      <section className="flex flex-row items-center md:mr-2">
        <button
          className="seat_range_buttons w-7 h-7 mr-5 cursor-pointer 
          md:w-5 md:h-5 md:mr-3 md:flex md:justify-center md:items-center"
          onClick={() => setCount(id, Math.max(count - 1, 0))}
          aria-label={`Minska ${label.toLowerCase()} biljetter`}
        >
          -
        </button>
        <p className="text-m ml-2 mr-2 md:text-xs">{count}</p>
        <button
          className="seat_range_buttons w-7 h-7 ml-5 cursor-pointer
          md:w-5 md:h-5 md:ml-3 md:flex md:justify-center md:items-center"
          onClick={() => setCount(id, count + 1)}
          aria-label={`Öka ${label.toLowerCase()} biljetter`}
        >
          +
        </button>
      </section>
    </div>
  );

  return (
    <main
      className="flex flex-col justify-center items-center w-11/12 h-auto 
                 lg:w-11/12
                 xl:w-4/12 xl:justify-around xl:items-center"
    >
      {ticketTypes.map((type) => (
        <TicketRow
          key={type._id}
          id={type._id}
          label={type.displayName}
          count={counts[type._id] ?? 0}
          price={type.price}
        />
      ))}



      {/* <div className="flex flex-col justify-center items-start w-full mx-auto px-4 pt-5 text-left"> */}

      {/* </div> */}
    </main>
  );
}
