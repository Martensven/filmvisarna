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
    <main className="w-screen flex flex-col justify-center items-end text-white
    lg:items-end"> 
      <header className="KioskSign flex flex-col justify-center items-center w-50 h-30 text-center mx-10 my-10 rotate-10
      lg:mr-[50px] lg:rotate-[10deg]">
        <h1 className="text-lg">
          Kiosken
        </h1>
        <p className="text-[10px] text-center w-30 ">Snacks och godis gör bioupplevelsen komplett</p>
      </header>

      <section>
        <div className="flex justify-center items-center">
          <CategorySection title="Drycker" items={drinks} />
        </div>
        
        <CategorySection title="Snacks" items={snacks} />
        <CategorySection title="Godis" items={candy} />
      </section>
    </main>
  );
}

export type CategorySectionProps = {
  title: string;
  items: KioskItem[];
};
