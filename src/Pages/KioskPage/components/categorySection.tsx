import type { CategorySectionProps } from "../kioskPage";
import "./../kioskStyle.css";

export default function CategorySection({
  title,
  items,
}: CategorySectionProps) {
  return (
    <section className="StallContainer KioskTopRoof w-full flex flex-col justify-center items-center  relative">
        <img src="public/images/kiosk/Markis-opacity.png" alt="Markisen" className="mb-5 w-full h-30
        md:w-4/5
        lg:w-11/12"/>
      <div className="flex flex-col justify-center items-center mb-10
      md:w-3/4
      lg:w-full">
        <h3 className="flex justify-center items-center text-lg mb-[-20px] bg-[#455896] rounded-[50%] border w-30 h-15 p-1 z-[1]">
          {title}
        </h3>
      <section className="w-4/5 h-full flex flex-wrap justify-center items-center bg-[#0417209f] gap-4 px-8 py-5 rounded-lg 
      sm:px-15
      lg:px-2 lg:w-11/12">
        {items.map((item) => (
          <article
            key={item._id}
            className="w-30 h-55 relative flex flex-col items-end justify-center text-center text-white mt-5
            sm:w-40 sm:h-60 sm:mt-5
            md:w-35"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-45 object-cover sm:object-cover hover:rotate-5 transition-all duration-300 "
            />
            <section className="bg-[#243365]/80 w-full h-16 sm:h-20 rounded-md backdrop-blur-sm mt-15 p-1 flex flex-col justify-center items-center">
              <h3 className="text-[12px] font-semibold">{item.title}</h3>
              <p className="text-xs">{item.size}</p>
              <p className="text-xs">{item.price}kr</p>
            </section>
          </article>
        ))}
      </section>
      </div>
    </section>
  );
}
