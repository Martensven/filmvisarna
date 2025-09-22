

export default function MoviePage() {
    return (
        <>
            <body className="max-h-screen w-full">
            <h1 className="text-center">Filmsida Wireframe</h1>
            
                <section className="border-2 ml-20 pr-5 mt-5 w-11/12 h-120 text-center pt-60">Filmtrailer</section>
                    <article className="border-2 ml-20 mt-5 w-200 h-40 text-center pt-20">Info om filmen</article>
                        <article className="border-2 ml-20 w-200 h-174 mt-5 text-center pt-87">Beskrivning av filmen</article>
                            <aside className="border-2 ml-260 absolute top-136 mr-5 w-200 h-220 text-center pt-110">Bild på filmen</aside>
                                <article className="border-2 ml-140 mt-20 mb-20 mr-100 w-200 h-40 text-center pt-15">Boka knapp</article>
            </body>
        </>
    );
}