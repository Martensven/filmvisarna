import { useNavigate } from "react-router-dom";
import { useSeats } from "../../BookingPage/components/context/SeatsContext";

export default function UserAsGuestComponent() {
  const navigate = useNavigate();
  const { selectedSeats, selectedScreening, selectedTickets } = useSeats();

  const handleGuestBooking = async () => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user_id: null, // Guest booking
          screening_id: selectedScreening?._id,
          seat_ids: selectedSeats.map((s) => s._id),
          tickets: selectedTickets.map((t) => ({
            ticket_id: t._id,
            quantity: t.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      const data = await res.json();
      navigate(`/checkout/${data._id}`); // ✅ Redirect to confirmation page
    } catch (err) {
      console.error("Guest booking error:", err);
      alert("Kunde inte skapa bokning.");
    }
  };

  return (
    <main className="container_box w-86 h-auto p-3 m-3 text-center">
      <p className="m-3">Bekräfta bokning som gäst:</p>
      <button
        onClick={handleGuestBooking}
        className="main_buttons w-36 h-10 text-sm"
      >
        Bekräfta bokning
      </button>
    </main>
  );
}