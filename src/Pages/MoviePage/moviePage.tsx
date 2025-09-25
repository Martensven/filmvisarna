

export default function MoviePage() {
    return (
        <>
            <main className="w-screen flex flex-col items-center">
            <h1 className="text-center">Filmsida</h1>
            
            <section className="w-full px-20">
                <article className="border-2 mt-5 w-full h-120 text-center pt-60">Filmtrailer</article>
                
                <section className="flex gap-5 mt-5">
                    <section className="flex flex-col gap-5 w-2/3">
                        <article className="border-2 w-full h-40 text-center pt-20">Info om filmen</article>
                        <article className="border-2 w-full h-174 text-center pt-87">Beskrivning av filmen</article>
                    </section>
                
                    <aside className="border-2 w-1/3 h-219 text-center pt-110">Bild på filmen</aside>
                </section>
                <article className="border-2 mt-20 mb-20 mx-auto w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3 h-40 text-center pt-15">Boka knapp</article>
            </section>
            </main>
        </>
    );
}