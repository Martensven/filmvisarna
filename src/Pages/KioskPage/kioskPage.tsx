  import kiosklist from "../../../Backend/kiosk";
import type { KioskItem } from "../../../Backend/kiosk";
import CategorySection from "./components/categorySection";
import { useEffect, useState } from "react";



export default function KioskPage() {

const [items, setItems] = useState([]);

useEffect(() => {
  fetch("http://localhost:4321/api/kiosk")
    .then((response) => response.json())
    .then((data) => setItems(data))
    .catch((error) => console.error("Fel vid hämtning av kioskdata:", error));
}, []);


  // const drinks: KioskItem[] = kiosklist.filter(
  //   (item) => item.category === "drink"
  // );
  // const snacks: KioskItem[] = kiosklist.filter(
  //   (item) => item.category === "snack"
  // );
  // const candy: KioskItem[] = kiosklist.filter(
  //   (item) => item.category === "candy"
  // );

  return (
    <main className="w-screen bg-[#292929] text-white">
      <header className="text-center">
        <h1 className="text-3xl shadow-md p-3 my-10 lg:mx-auto xs:mx-auto text-center bg-[#243365] xs:w-10/12 text-center">
          Utbud i kiosken
        </h1>

        <CategorySection title="Alla produkter" items={items} />
        {/* <CategorySection title="Snacks" items={snacks} />
        <CategorySection title="Godis" items={candy} /> */}
      </header>
    </main>
  );
}

export type CategorySectionProps = {
  title: string;
  items: KioskItem[];
};
