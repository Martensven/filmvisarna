import "../../index.css";

export default function BookingPage() {
  return (
    <>
      <h1>BookingPage</h1>
      {/*----------Container for booking page----------*/}
      <main className="grid gap-2 overscroll-y-auto w-screen md:grid md:grid-rows-1">
        {/*----------Container for movie poster and title, Genre, age and time----------*/}
        <section className="md:flex md:flex-row md:w-auto md:justify-center md:itmes-center">
          {" "}
          {/*This section is for bigger screens to mange responsive layout*/}
          <section className="flex flex-row items-center justify-center w-full container_box h-65 md:w-96 md:m-4">
            {/*----------Container for movie poster----------*/}
            <img
              src=""
              alt="FILM POSTER"
              className="container_box w-40 h-60 m-0.5 sm:w-70 md:w-96 md:m-1"
            />

            {/*----------Container movie info ----------*/}
            <article className="flex flex-col container_box h-40 ml-1 md:w-80 md:m-1">
              <h1 className="container_box w-44 h-15 md:w-45">TITLE</h1>
              <p className="container_box w-44 h-25 md:w-45">
                FILM INFORMATION
              </p>
            </article>
          </section>
          {/*----------Container for chosing how many seats and what date----------*/}
          <section className="flex flex-col justify-center items-center container_box h-36 w-full mt-1 sm:h-46 md:w-80 md:h-65 md:m-4 md:flex md:justify-center md:items-center">
            {/*----------Container for chosing the amount of people that need tickets----------*/}
            <article className="flex flex-col items-center w-screen h-34 md:w-auto md:h-65">
              <section className="flex flex-col justify-center w-auto md:flex-col md:justify-center md:items-center md:w-72 md:h-40">
                <h2 className="text-sm md:text-s">DATUM</h2>

                {/*----------Containers for calender days----------*/}
                <section className="flex flex-row  m-2 container_box w-auto h-15  md:w-72 md:h-34">
                  <span className="container_box w-full md:w-20 md:h-32 md:text-xs">DATUM - TID</span>
                   <span className="container_box w-full md:w-20 md:h-32 md:text-xs">DATUM - TID</span>
                   <span className="container_box w-full md:w-20 md:h-32 md:text-xs">DATUM - TID</span>
                   <span className="container_box w-full md:w-20 md:h-32 md:text-xs">DATUM - TID</span>
                </section>
              </section>

              <section className="flex flex-row justify-center w-40 md:w-72 md:flex-col md:justify-center md:items-center">
                <h2 className="text-sm md:text-s">ANTAL STOLAR</h2>
                <select className="md:w-20 md:h-5"></select>
              </section>
            </article>
          </section>
        </section>

        {/*----------Container for a view of the salons----------*/}
        <section className="flex flex-col justify-between w-auto container_box h-65 mt-2 sm:mx-2 sm:h-80 md:h-96 md:mx-2">
          <article className="flex flex-col justify-between w-auto h-65 my-2 md:h-96 md-m-1">
            <span>
              VISA SALONG 1/2, "karta" över stolar, interaktiv för val av
              platser.
            </span>
          </article>
        </section>
        {/*----------Container for chosing chairs-button----------*/}
        <section className="flex flex-row justify-end">
          <button className="container_box w-20 m-2 text-sm">Välj</button>
        </section>
        {/*----------container for completing order which leads to an order confirmation and will be saved in my bookings and sent to mail----------*/}
        <section className="flex flex-col justify-center items-center container_box md:m-2">
          <p>Sista stegen innan bokning</p>
          {/*----------Container for chosing age for different ticket prizes----------*/}
          <article className="flex flex-col justify-center items-center">
            <h2 className="text-xs">VAL FÖR ÅLDERSGRUPP (OLIKA PRISER)</h2>

            {/*----------Container for the selectbars for how many of different agespan----------*/}
            <article className="flex flex-row justify-center container_box w-90 md:w-80">
              <p className="flex flex-row w-28 justify-between md:flex-col">
                Vuxen
                <select className="w-8 md:w-24" name="" id=""></select>
              </p>
              <p className="flex flex-row justify-between w-28 md:flex-col">
                Senior
                <select className="w-8 md:w-24" name="" id=""></select>
              </p>
              <p className="flex flex-row justify-between w-28 md:flex-col">
                Barn
                <select className="w-8 md:w-24" name="" id=""></select>
              </p>
            </article>
            <section className="md:flex md:flex-row justify-between md:mb-10 md:w-96">
              <p className="md:p-2">Summa: </p>
              <button className="container_box w-20 m-2 text-sm">Boka</button>
            </section>

            <section className="w-90 md:w-96">
              <h2>
                För bokningsbekräftelse:{" "}
                <input
                  type="text"
                  placeholder="Skriv din epost här"
                  className="container_box m-1 text-center md:w-50"
                />
              </h2>
              <section className="flex flex-row justify-end ">
                <button className="container_box w-20 m-2 text-sm">Skicka</button>
              </section>
            </section>
          </article>
          <span className="w-90 container_box mt-5 md:w-96 p-2">
            <h2>Biljetter bokade, ordernummer ..... </h2>
            <p>
              Orderbekräftelse med ordernummer skickad till din epost och sparad
              under "mina sidor"
            </p>
          </span>

          <section className="flex flex-row justify-center items-center container_box w-55 my-5">
            <button className="container_box w-25 m-3 text-sm">Hem</button>
            <button className="container_box w-25 m-3 text-sm">
              Mina Sidor
            </button>
          </section>
        </section>
      </main>
    </>
  );
}
