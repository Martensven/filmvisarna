import { Link } from "react-router-dom";

export default function FrontPage() {
    return (
        <main className="w-screen flex flex-col items-center min-h-screen mt-36" >

            <section className=" w-4/5 mb-5 max-w-screen-lg border-black flex justify-around items-end flex-nowrap">
                <p>Filter &darr;</p>
                <p>Sortera &darr;</p>
            </section>

            <section className="h-96 w-4/5 max-w-screen-lg border border-black flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
                {Array.from({ length: 10 }).map((_, i) => (
                    <article key={i + 1} className="min-w-60 h-72 m-2 snap-center mx-8">
                        <Link to="/movie">
                            <p className="border h-72">Bild {i + 1}</p>
                            <p>Filmnamn {i + 1}</p>
                            <p>Genre {i + 1}</p>
                        </Link>
                    </article>
                ))}
            </section>

            <Link to="/theme" className="h-72 border-solid border-black border my-5 w-4/5 max-w-screen-lg justify-center flex flex-col">
                <img src="https://via.placeholder.com/150" alt="Placeholder" className="border h-64 m-2" />
                <article>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita necessitatibus itaque laudantium accusamus fugiat repellat excepturi architecto perspiciatis distinctio nulla veniam voluptates fuga ullam nam eum. Voluptatem, blanditiis dolor.</article>
            </Link>

        </main>
    );
}

