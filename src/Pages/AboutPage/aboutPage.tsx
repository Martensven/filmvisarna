import "./../../index.css";

export default function AboutPage() {
  return (
    <main className="w-screen flex flex-col items-center min-h-screen mt-20 ">

      <header className="Header-container-box w-10/12 h-20 mb-5
      lg:w-10/12">
        <h1 className="w-full stroked-text text-red-800 text-center text-4xl">Om Oss</h1>
      </header>
      

      <section className="popOut-box m-4 w-10/12 h-auto rounded-md text-black text-3xl leading-normal items-center justify-center flex flex-col space-y-10
      lg:flex-col lg:w-10/12 lg:m-2 lg:justify-center lg:items-center lg:mt-10 lg:gap-3">

      <div className="m-4 w-9/12 h-auto rounded-md text-black text-3xl leading-normal items-center justify-center flex flex-col space-y-10
      lg:flex lg:flex-col lg:w-11/12 lg:m-2 lg:justify-center lg:items-center lg:mt-10 lg:gap-3
      xl:w-11/12">

         <article className="flex flex-col w-full h-full items-center
        lg:w-11/12 lg:flex-col lg:justify-center lg:items-center
        xl:flex-col">
          <img
            src="/images/movietheater.jpg"
            alt="biosalong"
            className="w-10/12 h-auto object-contain rounded-md shadow-lg mt-5 
            md:w-9/12 
            lg:w-7/12"
          />
          <p className="text-sm mt-5 w-full
          md:text-base
          lg:text-lg lg:text-center lg:mx-5">
            Filmvisarna grundades i den charmiga staden Småstad, där bio alltid
            har varit mer än bara underhållning, det har varit en samlingsplats
            för drömmare, familjer och filmälskare i generationer. Idén föddes
            av en grupp passionerade cineaster som delade en och samma vision:
            att bevara den magi som klassisk film en gång gav publiken.
          </p>
        </article>

        <article className="flex flex-col w-full h-full items-center
        lg:w-11/12 lg:flex-col lg:justify-center lg:items-center
        xl:flex-col">
          <img
            src="/images/projector2.png"
            alt="filmprojektor"
            className="w-10/12 h-auto object-contain rounded-md shadow-lg mt-5 
            md:w-9/12 
            lg:w-7/12 "
          />
          <p className="text-sm mt-5 w-full
          md:text-base
          lg:text-lg lg:text-center lg:mx-5">
            I en tid då moderna blockbusters och digitala effekter dominerar
            ville Filmvisarna skapa något annorlunda, ett levande minnesrum för
            filmens guldår. Vår kärlek sträcker sig från de tidiga svartvita
            stumfilmerna från 1910-talet, genom Hollywoods gyllene era, 70- och
            80-talets kultklassiker, ända fram till de ikoniska 90-talsfilmerna
            som formade en hel generation.
          </p>
        </article>

        <article className="flex flex-col w-full items-center
        lg:w-11/12 lg:flex-col lg:justify-start
        xl:flex-col">
          <img
            src="/images/popcorn2.jpg"
            alt="Popkorn"
            className="w-10/12 h-auto object-contain rounded-md shadow-lg mt-5 
            md:w-9/12 
            lg:w-7/12 "
          />
          <p className="text-sm mt-5 w-full
          md:text-base
          lg:text-lg lg:text-center lg:mx-5">
            Filmvisarna är mer än en biograf, det är en tidsmaskin. Vi brinner
            för att väcka nostalgiska känslor och låta publiken återuppleva
            filmhistoriens pärlor precis som de var tänkta att ses: med
            gemenskap, skratt, spänning och applåder i salongen. Oavsett om det
            är en storslagen matiné, en kultklassiker på kvällstid eller en
            familjevänlig nostalgifilm på helgen, strävar vi efter att skapa en
            unik och varm filmupplevelse. Vi vill bevara filmarvet, hylla
            historiens mästerverk och föra dem vidare till nya generationer. För
            hos Filmvisarna handlar det inte bara om att titta på film, det
            handlar om att minnas, känna och uppleva film på riktigt.
          </p>
        </article>
      </div>
       
      <div className="w-10/12 flex flex-col justify-center items-center
      lg:flex-col lg:justify-center lg:items-center">
        <h3 className="underline text-sm mt-5 mb-1 text-center w-60
        lg:mt-0">Hitta oss</h3>
        <img src="/images/Karta-filmvisarna.png" alt="Karta över filmvisarna adress"
         className="w-60 mb-15" />
      </div>
        
      </section>
    </main>
  );
}
