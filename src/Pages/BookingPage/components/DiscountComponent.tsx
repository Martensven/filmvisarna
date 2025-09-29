
export default function DiscountComponent() {


  return (
    <main className="flex flex-col justify-center items-center w-86 h-auto container_content">
      <section>
        <h2 className="text-ms mt-2 mb-2">VAL FÖR ÅLDERSGRUPP (OLIKA PRISER)</h2>

        {/*----------Container for the age selectbars----------*/}
        <article className="flex flex-row justify-between items-center container_box w-80 p-2 md:w-80">
          <p className="flex flex-row w-20 justify-between p-2 md:flex-col">
            Vuxen 140kr
            <select className="w-10 md:w-24" name="" id=""></select>
          </p>
          <p className="flex flex-row justify-between w-20 md:flex-col">
            Senior 120kr
            <select className="w-10 md:w-24" name="" id=""></select>
          </p>
          <p className="flex flex-row justify-between w-20 md:flex-col">
            Barn 80kr
            <select className="w-10 md:w-24" name="" id=""></select>
          </p>
        </article>
    <p className="mt-2 md:p-2">Summa: </p>
      </section>
    </main>
  );
}
