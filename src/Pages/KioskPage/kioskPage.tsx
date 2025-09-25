import kiosklist from "../../../Backend/kiosk";
import type { KioskItem } from "../../../Backend/kiosk";
import CategorySection from "./components/categorySection";

export default function KioskPage() {

  const drinks: KioskItem[] = kiosklist.filter((item) => item.category === "drink");
  const snacks: KioskItem[] = kiosklist.filter((item) => item.category === "snack");
  const candy: KioskItem[] = kiosklist.filter((item) => item.category === "candy");

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


// export default function KioskPage() {
//   return (
//     <main className="w-full flex flex-colpx-20">
//       <section className="w-full">
//         <header className="text-center">
//           <h1 className="text-center text-2xl mt-4">Kiosk</h1>
//           <h2 className="text-center text-xl">Vårt utbud i kiosken</h2>
//         </header>

//         <section className="w-full flex flex-wrap justify-center items-center">
//           <h3 className="w-full text-center text-xl m-4">Dryck:</h3>
//           <section className="w-full flex flex-wrap justify-center items-center gap-10">
           
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Cola"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Cola</h3>
//                 <p className="text-sm">50cl</p>
//                 <p className="text-sm">25kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Fanta"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Fanta</h3>
//                 <p className="text-sm">50cl</p>
//                 <p className="text-sm">25kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Ramlösa"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Ramlösa</h3>
//                 <p className="text-sm">50cl</p>
//                 <p className="text-sm">20kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Festis"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Festis</h3>
//                 <p className="text-sm">200ml</p>
//                 <p className="text-sm">15kr</p>
//               </section>
//             </article>
//           </section>
//         </section>

//         <section className="w-full flex flex-wrap justify-center items-center">
//           <h3 className="w-full text-center text-xl m-4">Snacks:</h3>
//           <section className="w-full flex flex-wrap justify-center items-center gap-10">
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Popcorn"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Popcorn</h3>
//                 <p className="text-sm">200g</p>
//                 <p className="text-sm">30kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Lättsaltade chips"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Lättsaltade chips</h3>
//                 <p className="text-sm">200g</p>
//                 <p className="text-sm">35kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Baconsnacks"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Baconsnacks</h3>
//                 <p className="text-sm">300g</p>
//                 <p className="text-sm">40kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Ostbågar"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Ostbågar</h3>
//                 <p className="text-sm">200g</p>
//                 <p className="text-sm">35kr</p>
//               </section>
//             </article>
//           </section>
//         </section>

//         <section className="w-full flex flex-wrap justify-center items-center">
//           <h3 className="w-full text-center text-xl m-4">Godis:</h3>
//           <section className="w-full flex flex-wrap justify-center items-center gap-10">
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Gott & Blandat"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Gott & Blandat</h3>
//                 <p className="text-sm">100g</p>
//                 <p className="text-sm">30kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Chokladkaka"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Chokladkaka</h3>
//                 <p className="text-sm">100g</p>
//                 <p className="text-sm">39kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Nappar"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Nappar</h3>
//                 <p className="text-sm">100g</p>
//                 <p className="text-sm">30kr</p>
//               </section>
//             </article>
//             <article className="w-48 h-64 border-2 border-gray-300 relative flex items-end justify-center text-center text-white">
//               <img
//                 src="image.jpg"
//                 alt="Sura nappar"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <section className="relative bg-black/50 w-full p-2">
//                 <h3 className="text-lg font-semibold">Sura nappar</h3>
//                 <p className="text-sm">100g</p>
//                 <p className="text-sm">30kr</p>
//               </section>
//             </article>
//           </section>
//         </section>
//       </section>
//     </main>
//   );
// }
