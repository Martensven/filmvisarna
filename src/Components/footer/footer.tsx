export default function Footer() {
    return (
        <footer className="h-84 w-screen flex flex-col md:flex-row justify-center items-center text-center">
            <section className="md:w-1/3 h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl mb-2">Kontakt</h1>
                <p className="mx-10">Epost: info@filmvisarna.se</p>
                <p className="mx-10">Telefon: 123-456 78 90</p>
                <p className="mx-10">Adress: Biogatan 1, 123 45, Filmstaden</p>
            </section>

            <section className="md:w-1/3 h-full flex justify-center items-center">
                <h1 className="text-2xl">Filmvisarna</h1>
            </section>
            <section className="md:w-1/3 h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl mb-2">Om oss</h1>
                <p className="mx-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque distinctio quam rem minima. Eveniet impedit, ad vero nihil eum, veritatis, voluptate cum est quos odio porro magnam facere iste natus.</p>
            </section>
        </footer>
    );
}

// bg-gradient-to-t from-[#243365] to-[#292929] text-white