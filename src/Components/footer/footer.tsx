export default function Footer() {
    return (
        <footer className="h-84 w-screen flex flex-col justify-center items-center text-center mt-32 bg-gradient-to-t from-[#243365] to-[#292929] text-white m-0" >
            <section className="md:w-1/3 h-full flex justify-center items-center mt-2">
                <h1 className="text-2xl">Filmvisarna</h1>
            </section>

            <section className="md:w-1/3 h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl mb-2">Kontakt</h1>
                <p className="">Epost: info@filmvisarna.se</p>
                <p className="">Telefon: 123-456 78 90</p>
                <p className="">Adress: Biogatan 1, 123 45, Filmstaden</p>
            </section>
        </footer>
    );
}

