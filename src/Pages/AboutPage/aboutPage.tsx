export default function AboutPage() {
    return (
        <main className="w-screen flex flex-col items-center min-h-screen mt-36 font-[biorhyme]">
  <h1 className="text-4xl">Om Oss</h1>

  <section className="min-h-96 m-4 w-11/12 rounded-md shadow-md bg-[#24252C] text-white text-3xl leading-normal p-5 items-center justify-center flex flex-col space-y-10">
    
    <article className="flex flex-col md:flex-row items-center md:items-start">
      <img src="/images/movietheater.jpg" alt="biosalong" className="object-cover w-full md:w-1/2 rounded-md"/>
      <p className="m-5 md:m-5">
        Filmvisarna grundades i den charmiga staden Småstad, där bio alltid har varit mer än bara underhållning, det har varit en samlingsplats för drömmare, familjer och filmälskare i generationer. Idén föddes av en grupp passionerade cineaster som delade en och samma vision: att bevara den magi som klassisk film en gång gav publiken.
      </p>
    </article>

    <article className="flex flex-col md:flex-row items-center md:items-start">
        <img src="/images/projector.jpg" alt="filmprojektor" className="object-cover w-full md:w-1/2 rounded-md"/>
        <p className="m-5">
        I en tid då moderna blockbusters och digitala effekter dominerar ville Filmvisarna skapa något annorlunda, ett levande minnesrum för filmens guldår. Vår kärlek sträcker sig från de tidiga svartvita stumfilmerna från 1910-talet, genom Hollywoods gyllene era, 70- och 80-talets kultklassiker, ända fram till de ikoniska 90-talsfilmerna som formade en hel generation.
        </p>
    </article>

    <article className="flex flex-col md:flex-row items-center md:items-start">
      <img src="/images/popcornmachine.jpg" alt="Popkornmaskin" className="object-cover w-full md:w-1/2 rounded-md"/>
      <p className="m-5">
        Filmvisarna är mer än en biograf, det är en tidsmaskin. Vi brinner för att väcka nostalgiska känslor och låta publiken återuppleva filmhistoriens pärlor precis som de var tänkta att ses: med gemenskap, skratt, spänning och applåder i salongen.

        Oavsett om det är en storslagen matiné, en kultklassiker på kvällstid eller en familjevänlig nostalgifilm på helgen, strävar vi efter att skapa en unik och varm filmupplevelse. Vi vill bevara filmarvet, hylla historiens mästerverk och föra dem vidare till nya generationer.

        För hos Filmvisarna handlar det inte bara om att titta på film, det handlar om att minnas, känna och uppleva film på riktigt.
      </p>
    </article>

  </section>
</main>
    );
}
