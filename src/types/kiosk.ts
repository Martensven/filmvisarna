export type KioskItem = {
  _id: string;      // ← kommer från MongoDB istället för id: number
  title: string;
  price: number;
  category: "drink" | "snack" | "candy";
  size: string;
  image: string;
};
