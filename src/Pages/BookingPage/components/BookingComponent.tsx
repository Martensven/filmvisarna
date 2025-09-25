export default function BookingComponent() {
  return (
    <main className="bg-[#24252C">
      {/*----------container for completing order which leads to an order confirmation and will be saved in my bookings and sent to mail----------*/}
      <section className="flex flex-col justify-center items-center container_box m-2 w-screen md:w-4/5 md:mb-5">
        <h1>Färdigställ beställning.</h1>
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
          <button className="container_box w-25 m-3 text-sm">Mina Sidor</button>
        </section>
      </section>
    </main>
  );
}
