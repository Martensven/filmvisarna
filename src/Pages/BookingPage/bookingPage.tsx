import "../../index.css";

export default function BookingPage() {
  return (
    <>
      <h1>BookingPage</h1>
      {/*Container for booking page*/}
      <main className="flex flex-col overscroll-y-auto container_box w-105 ">
        {/*Container for movie poster and title, Genre, age and time*/}
        <section className="flex flex-row items-center container_box w-105 h-65">
          {/*Container for movie poster*/}
          <img
            src=""
            alt="MOVIE POSTER"
            className="container_box w-40 h-60 m-1"
          />
          {/*Container */}
          <article className="flex flex-col container_box w-50 h-40">
            <h1 className="container_box w-50 h-15">TITLE</h1>
            <p className="container_box w-50 h-25">MOVIE INFO ARRAY</p>
          </article>
        </section>

        {/*Container for chosing how many people and what age to get the different prizes*/}
        <section className="flex flex-row justify-around container_box w-105 h-25 mt-1">
          {/*Container for chosing the amount of people that need tickets*/}
          <article className="flex flex-col">
            <h2>ANTAL PERSONER</h2>
            <select className="container_box"></select>
          </article>
          {/*Container for chosing age for different ticket prizes*/}
          <article className="flex flex-col justify-center items-center">
            <h2 className="text-xs">VAL FÖR ÅLDERSGRUPP (OLIKA PRISER)</h2>
            {/*Container for the selectbars for how many of different agespan*/}
            <article className="flex flex-col justify-center container_box w-30">
              <p className="flex flex-row w-30 justify-between">
                Vuxen
                <select className="container_box w-10" name="" id=""></select>
              </p>
              <p className="flex flex-row justify-between ">
                Senior
                <select className="container_box w-10" name="" id=""></select>
              </p>
              <p className="flex flex-row justify-between ">
                Barn
                <select className="container_box w-10" name="" id=""></select>
              </p>
            </article>
          </article>
        </section>
        {/*Container for a view of the salons*/}
        <section className="flex flex-col justify-between container_box w-105 h-65 mt-2">
          <article className="flex flex-col justify-between w-105 h-65 mt-2">
            <span>
              VISA SALONG 1/2, "karta" över stolar, interaktiv för val av
              platser.
            </span>
          </article>
        </section>
        {/*Container for chosing chairs-button*/}
        <section className="flex flex-row justify-end w-105">
          <button className="container_box w-20 m-2">Välj</button>
        </section>
        {/*container for completing order which leads to an order confirmation and will be saved in my bookings and sent to mail*/}
        <section className="container_box w-105">
          <p>Sista stegen innan bokning</p>

          <section className="container_box w-105">
            <h2>
              Din Epost-Adress:{" "}
              <input
                type="text"
                placeholder="Skriv din epost här"
                className="container_box"
              />
            </h2>
            <section className="flex flex-row justify-end ">
              <button className="container_box w-20 m-5">Boka</button>
            </section>
          </section>

          <span className="container_box w-105 mt-5">
            <h2>Biljetter bokade, ordernummer ..... </h2>
            <p>
              Orderbekräftelse med ordernummer skickad till din epost och sparad
              under "mina sidor"
            </p>
          </span>

          <section className="flex flex-row justify-around items-center container_box w-105 my-5">
            <button className="container_box w-20 mt-5">Hem</button>
            <button className="container_box w-20 mt-5">Mina Sidor</button>
          </section>
        </section>
      </main>
    </>
  );
}
