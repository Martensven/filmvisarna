import "../BookingPageStyle.css";

export default function CalenderComponent() {
  return (
    <main className="flex flex-col justify-center items-center">
      {/*----------Containers for calender days----------*/}
      <h2 className="text-[#e4e1e1] p-1 md:text-s">Dagens visningar</h2>
      <section
        className="flex flex-row m-1 container_content w-86 h-auto mb-10 overflow-x-auto overflow-y-hidden
             md:w-4/5 md:h-34"
      >
        <ul className="container_box calenderDatesContainer md:w-20 md:h-32 md:text-xs">
          <li>Tid: xx:xx</li>
          <li>Salong: 1</li>
        </ul>
        <ul className="container_box calenderDatesContainer md:w-20 md:h-32 md:text-xs">
          <li>Tid: xx:xx</li>
          <li>Salong: 1</li>
        </ul>
        <ul className="container_box calenderDatesContainer md:w-20 md:h-32 md:text-xs">
          <li>Tid: xx:xx</li>
          <li>Salong: 2</li>
        </ul>
        <ul className="container_box calenderDatesContainer md:w-20 md:h-32 md:text-xs">
          <li>Tid: xx:xx</li>
          <li>Salong: 2</li>
        </ul>
      </section>

      <h2 className="text-[#e4e1e1] p-1 md:text-s">Andra visningar</h2>
      <section
        className="flex flex-row m-1 container_content w-86 h-auto overflow-x-auto overflow-y-hidden
             md:w-4/5 md:h-34"
      >
        <span className="flex flex-row ">
          <ul className="container_box calenderDatesContainer w-36 md:w-20 md:h-32 md:text-xs">
            <li>Datum: xx/xx</li>
            <li>Tid: xx:xx</li>
            <li>Salong: 1</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-36 md:w-20 md:h-32 md:text-xs">
            <li>Datum: xx/xx</li>
            <li>Tid: xx:xx</li>
            <li>Salong: 1</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-36 md:w-20 md:h-32 md:text-xs">
            <li>Datum: xx/xx</li>
            <li>Tid: xx:xx</li>
            <li>Salong: 2</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-36 md:w-20 md:h-32 md:text-xs">
            <li>Datum: xx/xx</li>
            <li>Tid: xx:xx</li>
            <li>Salong: 2</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-36 md:w-20 md:h-32 md:text-xs">
            <li>Datum: xx/xx</li>
            <li>Tid: xx:xx</li>
            <li>Salong: 1</li>
          </ul>
          <ul className="container_box calenderDatesContainer w-36 md:w-20 md:h-32 md:text-xs">
            <li>Datum: xx/xx</li>
            <li>Tid: xx:xx</li>
            <li>Salong: 1</li>
          </ul>
        </span>
      </section>
    </main>
  );
}
