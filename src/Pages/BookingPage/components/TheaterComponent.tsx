
export default function TheaterComponent() {
    return(
        <>
        {/*----------Container for a view of the salons----------*/}
        <section className="flex flex-col justify-center items-center w-auto container_box h-65 sm:h-80 md:w-4/5 md:h-96 lg:w-full">
          <article className="flex flex-col justify-between w-auto h-65 container_box md:h-96 lg:w-6/12 lg:h-4/5 lg:m-1">
            <span>
              VISA SALONG 1/2, "karta" över stolar, interaktiv för val av
              platser.
            </span>
          </article>
           {/*----------Container for chosing chairs-button----------*/}
        <section className="flex flex-row justify-end">
          <button className="container_box w-20 m-2 text-sm">Välj</button>
        </section>
        </section>
        </>
        
    )
}