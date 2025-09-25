export default function SeatsTheater() {



  return (
    <main className="flex flex-col justify-center items-center w-86">
      <h2 className="text-[#e4e1e1] text-s m-2 md:text-s">Biljetter</h2>
      <section className="flex flex-row justify-content items-center">
        <button className="seat_range_buttons w-8 h-8 mr-5 align">-</button>
        <p className="text-lg ml-2 mr-2">1</p>
        <button className="seat_range_buttons w-8 h-8 ml-5">+</button>
      </section>
    </main>
  );
}
