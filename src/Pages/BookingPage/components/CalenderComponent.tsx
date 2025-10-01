import "../BookingPageStyle.css";

export default function CalenderComponent() {

  return (
    <main className="h-auto flex flex-col justify-center items-center md:w-4/5">
      {/*----------Containers for calender days----------*/}
      <h2 className="text-[#e4e1e1] p-1 md:text-s md:p-2">Dagens visningar</h2>
      <section
        className="flex flex-row container_content w-11/12 mb-1 overflow-x-auto overflow-y-hidden
         md:w-full md:place-items-center"
      >
        <ul className="container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs">
          <li className="pt-3 pb-3 text-lg font-bold">12:00</li>
          <li className="pb-1 text-sm md:text-md">Stora Salongen</li>
        </ul>
        <ul className="container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs">
          <li className="pt-3 pb-3 text-lg font-bold">14:00</li>
          <li className="pb-1 text-sm">Stora Salongen</li>
        </ul>
        <ul className="container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs">
          <li className="pt-3 pb-3 text-lg font-bold">18:00</li>
          <li className="pb-1 text-sm">Lilla Salongen</li>
        </ul>
        <ul className="container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs">
          <li className="pt-3 pb-3 text-lg font-bold">20:00</li>
          <li className="pb-1 text-sm">Lilla Salongen</li>
        </ul>
      </section>

      {/* Other dates */}

      <h2 className="text-[#e4e1e1] p-1 md:text-s">Andra visningar</h2>
      <section
        className="flex flex-row m-1 container_content w-11/12 h-auto overflow-x-auto overflow-y-hidden
        sm:w-4/5
        md:w-full md:h-auto"
      >
        <span className="flex flex-row h-auto">
          <ul  className="container_box calenderDatesContainer w-24
           md:w-20 md:h-32 md:text-xs">
            <li className="pt-1 pb-2 text-md font-bold">Torsdag 02/10</li>
            <li className="text-md">15:00</li>
            <li className="pt-3 text-sm font-bold">Stora Salongen</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-24 md:w-20 md:h-32 md:text-xs">
            <li className="pt-1 pb-2 text-md font-bold">Torsdag 02/10</li>
            <li className="text-md">20:00</li>
            <li className="pt-3 text-sm font-bold">Stora Salongen</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-24 md:w-20 md:h-32 md:text-xs">
            <li className="pt-1 pb-2 text-md font-bold">Söndag 05/10</li>
            <li className="text-md">15:00</li>
            <li className="pt-3 text-sm font-bold">Stora Salongen</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-24 md:w-20 md:h-32 md:text-xs">
            <li className="pt-1 pb-2 text-md font-bold">Söndag 05/10 </li>
            <li className="text-md">20:00</li>
            <li className="pt-3 text-sm font-bold">Lilla Salongen</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-24 md:w-20 md:h-32 md:text-xs">
            <li className="pt-1 pb-2 text-md font-bold">Onsdag 08/10</li>
            <li className="text-md">12:00</li>
            <li className="pt-3 text-sm font-bold">Lilla Salongen</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-24 md:w-20 md:h-32 md:text-xs">
            <li className="pt-1 pb-2 text-md font-bold">Onsdag 08/10</li>
            <li className="text-md">18:00</li>
            <li className="pt-3 text-sm font-bold">Stora Salongen</li>
          </ul>
        </span>
      </section>
    </main>
  );
}
