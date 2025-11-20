import { Link, useNavigate } from "react-router-dom";
import { useSeats } from "./context/SeatsContext";
import { useCheckout } from "./context/CheckoutContext";
import { useState } from "react";
import { useAuth } from "../../../context/authContext";

export default function UserOrderComponent() {
  const { totalPrice, ticketTypes, counts } = useSeats();
  const { screeningId, selectedSeats } = useCheckout();
  const { user } = useAuth();
  const [orderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      setLoading(true);

      const userId = user?._id ?? null;

      const ticketRequests = ticketTypes
        .filter((t) => counts[t._id] > 0)
        .map((t) => ({
          ticket_id: t._id,
          quantity: counts[t._id],
        }));

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          screening_id: screeningId,
          seat_ids: selectedSeats,
          tickets: ticketRequests,
        }),

      });

      if (!res.ok) throw new Error("Bokning misslyckades");

      const data = await res.json();

      navigate(`/checkout/${data._id}`);
    } catch (err) {
      console.error(err);
      alert("Kunde inte genomföra bokningen");
    } finally {
      setLoading(false);
    }
  };

  //     setOrderId(data._id);
  //     alert("Bokningen lyckades!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Kunde inte genomföra bokningen");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <main className="flex justify-center items-center container_box w-86 h-auto p-3 m-3 text-center">
      {orderId ? (
        <>
          <p className="m-3">Ordernummer {orderId} har sparats och skickats till din mejl</p>
          <Link to={"/"}>
            <button className="main_buttons w-30 h-8 m-3">Startsidan</button>
          </Link>
          <Link to="/my-page">
            <button className="main_buttons w-30 h-8 m-3">Mina sidor</button>
          </Link>
        </>
      ) : (
        <>
          <p className="m-3">Totalt att betala: {totalPrice} kr</p>
          <p className="m-3">Antal platser: {selectedSeats.length}</p>

          <button
            disabled={loading || selectedSeats.length === 0}
            onClick={handleBooking}
            className="main_buttons w-36 h-12 m-3 cursor-pointer"
          >
            {loading ? "Bokar..." : "Slutför bokning"}
          </button>
        </>
      )}
    </main>
  );
}
