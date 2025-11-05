
import { useSeats } from "./context/SeatsContext";


export default function CheckoutRecipe() {
    const {
    countAdult,
    countSenior,
    countChild,
    totalTickets,
    totalPrice,
    adultPrice,
    seniorPrice,
    childPrice,
  } = useSeats();

  //Total price for each ticket type
  const adultTotalPrice = countAdult * adultPrice;
  const seniorTotalPrice = countSenior * seniorPrice;
  const childTotalPrice = countChild * childPrice;


  return (
    <aside className="flex
    sm:w-11/12 sm:flex sm:flex-row sm:justify-center sm:gap-2 sm:items-center 
    md:w-11/12 md:flex-col">
      <section className="Amount-of-tickets flex flex-row justify-between items-center w-72 h-auto border-t mt-1 border-gray-400
      sm:w-42 
      md:w-66 ">
        <h2 className="text-[#e4e1e1] text-sm m-1  md:text-base md:m-5">
          Antal biljetter:
        </h2>
        <p className="text-[#e4e1e1] text-sm m-2  md:text-base md:m-5">
          {totalTickets}{" st"}
        </p>
      </section>

      <section className="Type-of-tickets flex flex-row justify-between items-center w-70 h-auto border-t border-gray-400 text-sm
      sm:w-72 sm:text-sm
      md:flex-col md:p-5 md:text-base md:w-66">
        <span className="flex justify-between space m-1
        md:w-full">
          <h2 className="mr-1">barn: </h2>
          <p>{childTotalPrice} kr</p>
        </span>
        <span className="flex justify-between space
        md:w-full">
          <h2 className="mr-1">senior:  </h2>
          <p>{seniorTotalPrice} kr</p>
        </span>
        <span className="flex justify-between space
        md:w-full">
          <h2 className="mr-1">vuxen: </h2>
          <p>{adultTotalPrice} kr</p>
        </span>
      </section>
      <section className="Total flex flex-row justify-between items-center w-72 h-auto border-t mt-1 border-gray-400
      sm:w-36
      md:w-66">
        <h2 className="text-[#e4e1e1] text-sm m-1  
        md:text-base md:m-5">
          Totalt:
        </h2>
        <p className="text-[#e4e1e1] text-sm m-2  md:text-base md:m-5">
          {totalPrice} kr
        </p>
      </section>
    </aside>
  );
}
