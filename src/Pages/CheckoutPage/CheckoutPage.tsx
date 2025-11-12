import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Seat {
  seat_id: string;
  seatNumber: number;
}

interface Ticket {
  ticketName: string;
  quantity: number;
  pricePerTicket: number;
  totalPrice: number;
}

interface Movie {
  title: string;
  imageSrc: string;
  length: number;
}

interface Auditorium {
  name: string;
}

interface Screening {
  movie: Movie;
  auditorium: Auditorium;
  date: string;
  time: string;
}

interface Booking {
  _id: string;
  user_id: { firstName: string; lastName: string; email: string };
  screening_id: Screening;
  seats: Seat[];
  tickets: Ticket[];
  totalPrice: number;
  created_at: string;
}

export default function CheckoutPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p className="text-center mt-10 text-white">Laddar bokningsinformation...</p>;
  if (!booking) return <p className="text-center mt-10 text-white">Hittar inte bokningen.</p>;

  const { user_id, screening_id, seats, tickets, totalPrice } = booking;

  return (
    <div className="max-w-3xl mx-auto glass_effect rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">🎬 Bokningsinformation</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={screening_id.movie.imageSrc}
          alt={screening_id.movie.title}
          className="w-48 rounded-lg shadow-md"
        />

        <div className="text-xl font-semibold text-white">
          <h3 className="text-xl font-semibold text-white">{screening_id.movie.title}</h3>
          <p>
            <strong>Datum & Tid:</strong> {screening_id.date} – {screening_id.time}
          </p>
          <p>
            <strong>Salong:</strong> {screening_id.auditorium.name}
          </p>
          <p>
            <strong>Längd:</strong> {screening_id.movie.length} min
          </p>
        </div>
      </div>

      <hr className="my-4" />

      <section>
        <h3 className="text-lg font-semibold mb-2 text-white">Stolsnummer</h3>
        <p>{seats.length ? seats.map((s) => s.seatNumber).join(", ") : "Inga platser"}</p>
      </section>

      <section className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Biljetter</h3>
        <ul>
          {tickets.length ? (
            tickets.map((t, i) => (
              <li key={i}>
                {t.ticketName} – {t.quantity} × {t.pricePerTicket} kr = {t.totalPrice} kr
              </li>
            ))
          ) : (
            <li>Inga biljetter</li>
          )}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Användarinformation</h3>
        {user_id ? (
          <>
            <p>
              {user_id.firstName} {user_id.lastName}
            </p>
            <p>{user_id.email}</p>
          </>
        ) : (
          <p>Gästbokning</p>
        )}
      </section>

      <div className="text-right mt-6">
        <h3 className="text-xl font-bold text-white">Summa: {totalPrice} kr</h3>
      </div>
    </div>
  );
}