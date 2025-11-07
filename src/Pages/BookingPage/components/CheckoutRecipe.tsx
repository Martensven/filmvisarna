
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
    <aside className="flex flex-col justify-between items-center w-11/12 
    sm:w-11/12 sm:flex sm:flex-row sm:justify-center sm:gap-1 sm:items-center 
    md:w-11/12 md:flex-col">
      <section className="Amount-of-tickets flex flex-row justify-between items-center w-full h-auto 
      sm:w-42 
      md:w-66 md:border-t md:mt-1 md:border-gray-400 ">
        <h2 className="text-[#e4e1e1] text-sm m-1  md:text-base md:m-5">
          Antal biljetter:
        </h2>
        <p className="text-[#e4e1e1] text-sm m-2  md:text-base md:m-5">
          {totalTickets}{" st"}
        </p>
      </section>

      <section className="Type-of-tickets flex flex-row grid-2 justify-between items-center w-full h-auto text-sm border-t border-b border-gray-400 mx-2 my-2
      sm:w-72 sm:text-sm
      md:flex-col md:p-5 md:text-base md:w-66 md:border-t md:border-gray-400 ">
        <span className="flex justify-center space w-9/12 m-1  
        md:w-full">
          <h2 className="">barn:  {childTotalPrice} kr</h2>
        </span>
        <span className="flex justify-center space w-9/12 m-1 
        md:w-full">
          <h2 className="">senior:  {seniorTotalPrice} kr</h2>
        </span>
        <span className="flex justify-center space w-9/12 m-1    
        md:w-full">
          <h2 className="">vuxen:  {adultTotalPrice} kr</h2>
        </span>
      </section>
      <section className="Total flex flex-row justify-between items-center w-full h-auto 
      sm:w-36
      md:w-66 md:border-t md:mt-1 ">
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
