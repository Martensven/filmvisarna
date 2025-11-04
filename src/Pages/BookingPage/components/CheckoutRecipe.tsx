
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
    <aside>
      <section className="flex flex-row justify-between w-72 h-auto border-t mt-1 border-gray-400">
        <h2 className="text-[#e4e1e1] text-sm m-1  md:text-sm md:m-5">
          Antal biljetter:
        </h2>
        <p className="text-[#e4e1e1] text-sm m-2  md:text-sm md:m-5">
          {totalTickets}{" "}
        </p>
      </section>

      <section className="flex flex-row justify-between w-70 h-auto border-t mt-1 p-1 border-gray-400 text-sm">
        <span className="flex justify-between space">
          <h2 className="mr-1">barn: </h2>
          <p>{childTotalPrice} kr</p>
        </span>
        <span className="flex justify-between space">
          <h2 className="mr-1">senior:  </h2>
          <p>{seniorTotalPrice} kr</p>
        </span>
        <span className="flex justify-between space">
          <h2 className="mr-1">vuxen: </h2>
          <p>{adultTotalPrice} kr</p>
        </span>
      </section>
      <section className="flex flex-row justify-between w-72 h-auto border-t mt-1 border-gray-400">
        <h2 className="text-[#e4e1e1] text-sm m-1  md:text-sm md:m-5">
          Totalt:
        </h2>
        <p className="text-[#e4e1e1] text-sm m-2  md:text-sm md:m-5">
          {totalPrice} kr
        </p>
      </section>
    </aside>
  );
}
