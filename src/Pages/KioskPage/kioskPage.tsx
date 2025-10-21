import { useEffect, useState } from "react";
import type { KioskItem } from "../../types/kiosk";
import CategorySection from "./components/categorySection";

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
    <main className="w-screen bg-[#292929] text-white">
      <header className="text-center">
        <h1 className="text-3xl shadow-md p-3 my-10 mx-auto bg-[#243365] w-10/12">
          Utbud i kiosken
        </h1>

        <CategorySection title="Drycker" items={drinks} />
        <CategorySection title="Snacks" items={snacks} />
        <CategorySection title="Godis" items={candy} />
      </header>
    </main>
  );
}

export type CategorySectionProps = {
  title: string;
  items: KioskItem[];
};
