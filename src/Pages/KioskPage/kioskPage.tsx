import kiosklist from "../../../Backend/kiosk";
import type { KioskItem } from "../../../Backend/kiosk";
import CategorySection from "./components/categorySection";

export default function KioskPage() {
  const drinks: KioskItem[] = kiosklist.filter(
    (item) => item.category === "drink"
  );
  const snacks: KioskItem[] = kiosklist.filter(
    (item) => item.category === "snack"
  );
  const candy: KioskItem[] = kiosklist.filter(
    (item) => item.category === "candy"
  );

  return (
    <main className="w-screen bg-[#292929] text-white">
      <header className="text-center">
        <h1 className="text-2xl mt-4">Kiosk</h1>
        <h2 className="text-xl">Vårt utbud i kiosken</h2>

        <CategorySection title="Dryck" items={drinks} />
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

