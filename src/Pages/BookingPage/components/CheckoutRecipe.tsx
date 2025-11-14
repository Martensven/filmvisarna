import CheckoutComponent from "./CheckoutComponent";
import { useSeats } from "./context/SeatsContext";

export default function CheckoutRecipe() {
  const { ticketTypes, counts, totalTickets, totalPrice } = useSeats();

  // Fetch movie from local storage
  const storedMovie = localStorage.getItem("currentMovie");
  const currentMovie = storedMovie ? JSON.parse(storedMovie) : null;

  // Filter tickets based on age restriction
  const filteredTickets = ticketTypes.filter(ticket => {
    if (!currentMovie) return true;
    if (currentMovie.age >= 15 && ticket.displayName === "Barn") {
      return false;
    }
    return true;
  });

  if (!ticketTypes.length) {
    return (
      <main className="flex justify-center items-center mt-5">
        <p className="text-gray-300">Inga biljetter tillgängliga just nu.</p>
      </main>
    );
  }

  return (
    <>
      <aside
        className=" flex 
    w-11/12 sm:justify-center sm:gap-2 items-center 
    md:w-11/12 flex-col mt-10"
      >
        <section className="Type-of-tickets flex justify-between items-center w-70 h-auto border-t border-gray-400 text-sm
      sm:w-72 sm:text-sm md:flex-row
       p-1 md:text-base md:w-66 mt-5 pt-3">
          <p className="text-[#e4e1e1] text-xs md:text-base">
            Biljetter:
          </p>
          <p className="text-[#e4e1e1] text-xs md:text-base">{totalTickets} st</p>
        </section>
        <section className="flex items-center justify-between w-70 h-auto border-t border-gray-400 text-sm
      sm:w-72 sm:text-sm
      md:flex-col  md:text-base md:w-66">
          {/* Visa varje biljettyp */}
          {filteredTickets.map((type) => {
            const quantity = counts[type._id] || 0;
            const subtotal = quantity * type.price;

            return (
              <div
                key={type._id}
                className=" flex md:flex-row justify-between items-center 
        md:w-full my-1"
              >
                <p className="text-[#e4e1e1] text-xs  md:text-base m-1">{type.ticketName}:</p>
                {/* <p className="text-[#e4e1e1] text-sm m-2  md:text-base md:m-5 flex justify-center">
                {quantity} st × {type.price} kr
              </p> */}
                <p className="text-[#e4e1e1] text-xs  md:text-base">{subtotal} kr</p>
              </div>
            );
          })}
        </section>

        {/* Sammanställning */}
        <section className="Type-of-tickets flex justify-between items-center w-70 h-auto border-t border-gray-400 text-xs
      sm:w-72 sm:text-sm
       md:p-1 md:text-base md:w-66 md:flex-row pt-3">
          <p className="text-[#e4e1e1] text-xs md:text-base">
            Totalt:
          </p>

          <p className="text-[#e4e1e1] text-xs md:text-base ">
            {totalPrice} kr
          </p>
        </section>
        <CheckoutComponent />
      </aside>


    </>
  );
}
