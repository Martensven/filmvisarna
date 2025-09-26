// Sample data for kiosk items

export type KioskItem = {
  id: number;
  name: string;
  price: number;
  category: "drink" | "snack" | "candy"; 
  size: string;
  image: string;
};

const kiosklist: KioskItem[] = [
  { id: 1, name: "Cola", price: 25, category: "drink", size: "50cl", image: "../public/images/kiosk/cocacola-transparent.png" },
  { id: 2, name: "Fanta", price: 25, category: "drink", size: "50cl", image: "../public/images/kiosk/fanta-transparent.png" },
  { id: 3, name: "Ramlösa", price: 20, category: "drink", size: "50cl", image: "../public/images/kiosk/ramlosa-transparent.png" },
  { id: 4, name: "Festis", price: 15, category: "drink", size: "200ml", image: "../public/images/kiosk/festis-transparent.png" },
  { id: 5, name: "Popcorn", price: 30, category: "snack", size: "200g", image: "../public/images/kiosk/popcorn-transparent.png" },
  { id: 6, name: "Lättsaltade chips", price: 35, category: "snack", size: "200g", image: "../public/images/kiosk/chips-transparent.png" },
  { id: 7, name: "Baconsnacks", price: 40, category: "snack", size: "300g", image: "../public/images/kiosk/baconsnacks-transparent.png" },
  { id: 8, name: "Ostbågar", price: 35, category: "snack", size: "200g", image: "../public/images/kiosk/ostbagar-transparent.png" },
  { id: 9, name: "Gott & Blandat", price: 25, category: "candy", size: "100g", image: "../public/images/kiosk/gottochblandat-transparent.png" },
  { id: 10, name: "Chokladkaka", price: 30, category: "candy", size: "100g", image: "../public/images/kiosk/chokladkaka-transparent.png" },
  { id: 11, name: "Sura nappar", price: 20, category: "candy", size: "100g", image: "../public/images/kiosk/suranappar-transparent.png" },
  { id: 12, name: "Nappar", price: 20, category: "candy", size: "100g", image: "../public/images/kiosk/nappar-transparent.png" },
];

export default kiosklist;
