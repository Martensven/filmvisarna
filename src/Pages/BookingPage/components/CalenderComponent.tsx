import "../BookingPageStyle.css";
import { useState } from "react";
//Component contains todays showing and other dates. This ones are going to be clickable

interface Props {
  onSelectTheater: (theater: string) => void;
}

export default function CalenderComponent({ onSelectTheater }: Props) {
  // State for active calender date with border when clicked
  const [active, setActive] = useState<number | null>(null);
  return (
    <main className="h-auto flex flex-col justify-center items-center md:w-11/12">
      {/*----------Containers for calender days----------*/}
      <h2 className="text-[#e4e1e1] p-1 md:text-s md:p-2">Dagens visningar</h2>
      <section
        className="flex flex-row container_content w-11/12 mb-1 overflow-x-auto overflow-y-hidden
         md:w-full md:place-items-center lg:h-auto"
      >
        <ul
          // Setting active state to mark selected calender date and onSelectTheater to get the selected theater
          // This will be used dynamically later on
          onClick={() => { setActive(1); onSelectTheater("Stora Salongen")}}
          className={`container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs cursor-pointer
          ${active === 1 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          
          <li className="pt-3 pb-3 text-lg font-bold">12:00</li>
          <li className="pb-1 text-sm md:text-md">Stora Salongen</li>
        </ul>
        <ul
          onClick={() => { setActive(2); onSelectTheater("Stora Salongen")}}
          className={`container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs cursor-pointer
          ${active === 2 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-3 pb-3 text-lg font-bold">14:00</li>
          <li className="pb-1 text-sm">Stora Salongen</li>
        </ul>
        <ul
          onClick={() => { setActive(3); onSelectTheater("Lilla Salongen")}}
          className={`container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs cursor-pointer
          ${active === 3 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-3 pb-3 text-lg font-bold">18:00</li>
          <li className="pb-1 text-sm">Lilla Salongen</li>
        </ul>
        <ul
          onClick={() => { setActive(4); onSelectTheater("Lilla Salongen")}}
          className={`container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs cursor-pointer
          ${active === 4 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-3 pb-3 text-lg font-bold">20:00</li>

          <li className="pb-1 text-sm">Lilla Salongen</li>
        </ul>
      </section>

      {/* Other dates */}

      <h2 className="text-[#e4e1e1] p-1 md:text-s">Andra visningar</h2>
      <section
        className="flex flex-row m-1 container_content w-11/12 h-auto overflow-x-auto overflow-y-hidden
        sm:w-11/12
        md:w-full md:h-auto
        lg:h-auto"
      >
        <ul
          onClick={() => { setActive(5); onSelectTheater("Stora Salongen")}}
          className={`container_box calenderDatesContainer w-24 
                          sm:w-32
                          md:w-20 md:h-32 md:text-xs
                          cursor-pointer
                          ${active === 5 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-1 pb-2 text-md font-bold">Torsdag 02/10</li>
          <li className="text-md">15:00</li>
          <li className="pt-3 text-sm font-bold">Stora Salongen</li>
        </ul>
        <ul
          onClick={() => { setActive(6); onSelectTheater("Stora Salongen")}}
          className={`container_box calenderDatesContainer w-24 
                        sm:w-32
                        md:w-20 md:h-32 md:text-xs
                        cursor-pointer
                        ${active === 6 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-1 pb-2 text-md font-bold">Torsdag 02/10</li>
          <li className="text-md">20:00</li>
          <li className="pt-3 text-sm font-bold">Stora Salongen</li>
        </ul>
        <ul
          onClick={() => { setActive(7); onSelectTheater("Stora Salongen")}}
          className={`container_box calenderDatesContainer w-24 
                        sm:w-32  
                        md:w-20 md:h-32 md:text-xs
                        cursor-pointer
                        ${active === 7 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-1 pb-2 text-md font-bold">Söndag 05/10</li>
          <li className="text-md">15:00</li>
          <li className="pt-3 text-sm font-bold">Stora Salongen</li>
        </ul>
        <ul
          onClick={() => { setActive(8); onSelectTheater("Lilla Salongen")}}
          className={`container_box calenderDatesContainer w-24 
                        sm:w-32
                        md:w-20 md:h-32 md:text-xs
                        cursor-pointer
                        ${active === 8 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-1 pb-2 text-md font-bold">Söndag 05/10 </li>
          <li className="text-md">20:00</li>
          <li className="pt-3 text-sm font-bold">Lilla Salongen</li>
        </ul>
        <ul
          onClick={() => { setActive(9); onSelectTheater("Lilla Salongen")}}
          className={`container_box calenderDatesContainer w-24 
                        sm:w-32
                        md:w-20 md:h-32 md:text-xs
                        cursor-pointer
                        ${active === 9 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-1 pb-2 text-md font-bold">Onsdag 08/10</li>
          <li className="text-md">12:00</li>
          <li className="pt-3 text-sm font-bold">Lilla Salongen</li>
        </ul>
        <ul
          onClick={() => { setActive(10); onSelectTheater("Stora Salongen")}}
          className={`container_box calenderDatesContainer w-24 
                        sm:w-32
                        md:w-20 md:h-32 md:text-xs
                        cursor-pointer
                        ${active === 10 ? "!border-4 !border-[#07ca00]" : ""}`}
        >
          <li className="pt-1 pb-2 text-md font-bold">Onsdag 08/10</li>
          <li className="text-md">18:00</li>
          <li className="pt-3 text-sm font-bold">Stora Salongen</li>
        </ul>

      </section>
    </main>
  );
}
