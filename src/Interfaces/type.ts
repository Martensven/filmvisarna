// types.ts
export interface Seat {
  _id: string;
  rowNumber: number;
  seatNumber: number;
  accessible: boolean;
  auditoriumId: string;
}

export interface Theater {
  _id: string;
  name: string;
  seats: Seat[];
}

interface Auditorium { 
  _id: string; 
  name: string; 
  seats: Seat[]; 
} 
interface Movie { 
  _id: string; 
  title: string; 
  imageSrc: string; 
} 
export interface Showing { 
  _id: string; 
  auditorium: Auditorium; 
  bookedSeats: string[]; 
  pendingSeats: string[]; 
  date: string; 
  movie: Movie; 
  scheduleType: "smallTheater" | "largeTheater"; 
  showTime: string; 
  time: string; }