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
