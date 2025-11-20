export default function Footer() {
    return (
        <footer className="h-[30vh] w-full flex flex-col justify-center items-center text-center mt-30 bg-gradient-to-t from-[#101c2b] to-[hsla(200,100%,50%,0)] text-white m-0" >
            <section className="md:w-1/3 h-full flex justify-center items-center mt-2">
                <h1 className="text-2xl">Filmsmedjan</h1>
            </section>

            <section className="md:w-1/3 h-full flex flex-col justify-center items-center mb-10 mt-5">
                <h1 className="text-2xl mb-2">Kontakt</h1>
                <p className="">Epost: info@filmsmedjan.se</p>
                <p className="">Telefon: 123-456 78 90</p>
                <p className="">Adress: Biogatan 1, 123 45, Filmstaden</p>
            </section>
        </footer>
    );
}

