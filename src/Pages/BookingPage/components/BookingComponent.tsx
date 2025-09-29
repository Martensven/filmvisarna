import UserAsGuestComponent from "./UserAsGuestComponent";

export default function BookingComponent() {
  return (
    <main className="bg-[#24252C]">
      {/*----------container for completing order which leads to an order confirmation and will be saved in my bookings and sent to mail----------*/}
      <section className="flex flex-col justify-center items-center container_box m-2 w-screen md:w-4/5 md:mb-5">
        <h1>Färdigställ beställning.</h1>
        {/*----------Container for chosing age for different ticket prizes----------*/}
        
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
