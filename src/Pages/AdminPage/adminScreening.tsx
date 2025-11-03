type ScreeningItem = {
  id: string;
  movieTitle: string;
  time: string;
  auditorium: string;
  bookedCount: number;
  totalSeats: number;
};

export default function AdminScreenings() {
  return (
    <section>
      <h2>Hantera Filmvisningar</h2>
      <p>Här kan du lägga till, redigera eller ta bort filmvisningar.</p>
    </section>
  );
}
