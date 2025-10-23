import { useState } from "react";

const FAQ = () => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return <section className="p-4 bg-[#817E7E] rounded-lg">

        <section className="py-2 w-10/12 flex flex-col items-center justify-center mx-auto text-white">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-between w-full">
                <h2>Tidigare bokningar</h2>
                {accordionOpen ? <h2>-</h2> : <h2>+</h2>}

            </button>
            <section className={`grid overflow-hidden transition-all duration-300 ease-in-out text-sm  ${accordionOpen
                ? 'grid-rows[1fr] opacity-100'
                : 'grid-rows[0fr] opacity-0'
                }`}>
                <p className="overflow-hidden flex">Film 1</p>
                <p className="overflow-hidden flex">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, debitis distinctio repudiandae magnam reiciendis dolorem illum laboriosam atque, sapiente cumque, animi corrupti voluptatem corporis sequi unde saepe doloribus adipisci itaque?</p>
                <p className="overflow-hidden flex">Film 2</p>
                <p className="overflow-hidden flex">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, facere libero! Vel iusto accusamus id voluptate facere beatae ullam labore deserunt, facilis ipsa explicabo quas perferendis quos. Deserunt, necessitatibus soluta.</p>
                <p className="overflow-hidden flex">Film 3</p>
                <p className="overflow-hidden flex">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur suscipit laudantium neque nostrum delectus amet, blanditiis ullam dolor? Iste cum quis incidunt sapiente cumque architecto totam, amet dolore natus placeat.</p>
            </section>
        </section>
    </section>
};

export default FAQ;