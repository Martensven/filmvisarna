import { useSeats } from "./context/SeatsContext";

export default function CheckoutRecipe() {
  const { ticketTypes, counts, totalTickets, totalPrice } = useSeats();

  if (!ticketTypes.length) {
    return (
      <main className="flex justify-center items-center mt-10">
        <p className="text-gray-300">Inga biljetter tillgängliga just nu.</p>
      </main>
    );
  }

  return (
    <>
      <aside
        className="flex
    sm:w-11/12 sm:flex sm:flex-row sm:justify-center sm:gap-2 sm:items-center 
    md:w-11/12 md:flex-col"
      >
        <section className="">
          {/* Visa varje biljettyp */}
          {ticketTypes.map((type) => {
            const quantity = counts[type._id] || 0;
            const subtotal = quantity * type.price;

            return (
              <div
                key={type._id}
                className="flex justify-between
        md:w-full"
              >
                <h2 className="text-[#e4e1e1] text-sm m-1  md:text-base md:m-5">{type.ticketName}: {quantity} st</h2>
                {/* <p className="text-[#e4e1e1] text-sm m-2  md:text-base md:m-5 flex justify-center">
                {quantity} st × {type.price} kr
              </p> */}
                <p className="text-[#e4e1e1] text-sm m-2  md:text-base md:m-5">{subtotal} kr</p>
              </div>
            );
          })}
        </section>

        {/* Sammanställning */}
        <section className="Type-of-tickets flex flex-row justify-between items-center w-70 h-auto border-t border-gray-400 text-sm
      sm:w-72 sm:text-sm
      md:flex-col md:p-5 md:text-base md:w-66">
          <h2 className="text-[#e4e1e1] text-sm md:text-base font-semibold">
            Totalt:
          </h2>
          <p className="text-[#e4e1e1] text-sm md:text-base">
            {totalTickets} biljetter
          </p>
          <p className="text-[#e4e1e1] text-sm md:text-base font-bold">
            {totalPrice} kr
          </p>
        </section>
      </aside>


    </>
  );
}
