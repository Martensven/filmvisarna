import type { CategorySectionProps } from "../kioskPage";

export default function CategorySection({
  title,
  items,
}: CategorySectionProps) {
  return (
    <section className="w-screen">
      <h3 className="text-center text-xl m-4">{title}</h3>
      <section className="w-full flex flex-wrap justify-center items-center gap-5">
        {items.map((item) => (
          <article
            key={item._id}
            className="w-48 h-64 relative flex items-end justify-center text-center text-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover hover:rotate-10 transition-all duration-300"
            />
            <section className="relative bg-[#243365]/80 w-full p-2 rounded-md backdrop-blur-sm">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm">{item.size}</p>
              <p className="text-sm">{item.price}kr</p>
            </section>
          </article>
        ))}
      </section>
    </section>
  );
}
