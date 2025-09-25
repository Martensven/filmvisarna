import type { CategorySectionProps } from "../kioskPage";

export default function CategorySection({ title, items }: CategorySectionProps) {

    return (
        <section className="w-screen flex flex-wrap justify-center items-center">
            <h3 className="w-full text-center text-xl m-4">{title}</h3>
        </section>
    );
}