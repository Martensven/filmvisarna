import { useEffect, useState } from "react";
import type { KioskItem } from "../../types/kiosk";
import CategorySection from "./components/categorySection";
import "./kioskStyle.css"

export default function KioskPage() {
  const [items, setItems] = useState<KioskItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/kiosk`)
      .then((response) => {
        if (!response.ok) throw new Error("Nätverksfel");
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error("Fel vid hämtning av kioskdata:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-white">Laddar...</p>;

  
  const drinks = items.filter((item) => item.category === "drink");
  const snacks = items.filter((item) => item.category === "snack");
  const candy = items.filter((item) => item.category === "candy");
  
  return (
    <main className="w-screen flex flex-col justify-center items-center text-white"> 
      <header className="flex justify-end items-center w-full h-auto my-2">
        <section className="KioskSign flex flex-col justify-center items-center mx-10 my-15 rotate-8 text-center w-3/6 min-w-xm h-30 
        sm:w-2/6 sm:min-w-sm
        md:mx-20 md:my-20 md:h-40
        lg:mt-2 lg:mb-20">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Kiosken
        </h1>
        <p className="text-[10px] text-center w-30 sm:text-[13px] sm:w-4/6 md:text-[15px] md:w-4/6 lg:text-[18px] lg:w-4/6">Snacks och godis gör bioupplevelsen komplett</p>
        </section>
      </header>

      <section className="flex flex-col justify-center items-center w-full px-4
      md:flex-col lg:justify-between
      lg:flex-row lg:justify-between">
        <CategorySection  title="Drycker" items={drinks} />
        <CategorySection title="Snacks" items={snacks} />
        <CategorySection title="Godis" items={candy} />
      </section>

      <div className="w-full flex flex-row justify-center items-start mt-10 ">
        <img src="public/images/kiosk/Cartoon-retro-kiosk.png" alt="Animerad gubbe" className="w-40 my-5"/>
        <p className="w-40 h-20 bg-[#f0e0c7] rounded-[50%] text-black text-sm flex justify-center items-center p-2">Finns att köpa på plats</p>
      </div>
    </main>
  );
}

export type CategorySectionProps = {
  title: string;
  items: KioskItem[];
};
