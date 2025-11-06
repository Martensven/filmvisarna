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
    <aside
      className="flex flex-col justify-center items-center w-11/12 h-auto 
      md:w-10/12 lg:w-8/12 xl:w-6/12 mt-4 p-3 border-t border-gray-600"
    >
      {/* Visa varje biljettyp */}
      {ticketTypes.map((type) => {
        const quantity = counts[type._id] || 0;
        const subtotal = quantity * type.price;

        return (
          <div
            key={type._id}
            className="flex flex-row justify-between items-center w-full text-[#e4e1e1] py-2 border-b border-gray-700"
          >
            <h2 className="text-sm md:text-base capitalize">{type.ticketName}</h2>
            <p className="text-sm md:text-base">
              {quantity} st × {type.price} kr
            </p>
            <p className="text-sm md:text-base font-semibold">{subtotal} kr</p>
          </div>
        );
      })}

      {/* Sammanställning */}
      <section className="flex flex-row justify-between items-center w-full border-t border-gray-400 mt-3 pt-2">
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
  );
}
