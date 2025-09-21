

export default function MoviePage() {
    return (
        <>
            <body className="max-h-screen w-full">
            <h1 className="text-center">Filmsida Wireframe</h1>
            
                <section className="border-2 ml-20 pr-5 mt-5 w-11/12 h-120"></section>
                    <p className="ml-230">Filmtrailer</p>
                        <article className="border-2 ml-20 mt-5 w-200 h-40"></article>
                            <p className="ml-100">Info om filmen</p>
                                <article className="border-2 ml-20 w-200 h-174"></article>
                                    <p className="ml-100">Beskrivning av filmen</p>
                                        <aside className="border-2 absolute ml-260 top-142 mr-5 w-200 h-220"></aside>
                                            <p className="relative left-350 bottom-5">Bild på film</p>
                                                <article className="border-2 ml-140 mr-100 w-200 h-40 text-center pt-15">Boka knapp</article>
            </body>
        </>
    );
}