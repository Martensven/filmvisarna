import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSeats } from "./context/SeatsContext";
import { useCheckout } from "./context/CheckoutContext";

export default function GuestOrderComponent() {
  const { totalPrice, ticketTypes, counts } = useSeats();
  const { screeningId, selectedSeats } = useCheckout();
  const [orderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!firstName || !lastName || !email) {
        setError("Fyll i alla kontaktuppgifter.");
        return;
      }

      if (!screeningId || selectedSeats.length === 0) {
        setError("Du måste välja visning och platser först.");
        return;
      }

      // Bygg ticketRequests som backend förväntar sig
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
          user_id: null, // Gäst
          screening_id: screeningId,
          seat_ids: selectedSeats,
          tickets: ticketRequests,
          guestInfo: {
            firstName,
            lastName,
            email,
          },
        }),
      });

      if (!res.ok) throw new Error("Bokning misslyckades");

      const data = await res.json();

      navigate(`/checkout/${data._id}`);
    } catch (err) {
      console.error(err);
      setError("Kunde inte genomföra bokningen.");
    } finally {
      setLoading(false);
    }
  };

  //     setOrderId(data._id);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Kunde inte genomföra bokningen.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <main className="flex flex-col justify-center items-center container_box w-86 h-auto p-3 m-3 text-center">
      {orderId ? (
        <>
          <p className="m-3">
            Ordernummer {orderId} har sparats och skickats till {email}.
          </p>
          <Link to={"/"}>
            <button className="main_buttons w-30 h-8 m-3">Startsidan</button>
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-lg mb-3">Boka som gäst</h2>

          <div className="container_box flex flex-col justify-center items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Förnamn"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 rounded w-60 "
            />
            <input
              type="text"
              placeholder="Efternamn"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 rounded w-60 "
            />
            <input
              type="email"
              placeholder="E-postadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded w-60 "
            />
          </div>

          <p className="m-3">Totalt att betala: {totalPrice} kr</p>
          <p className="m-3">Antal platser: {selectedSeats.length}</p>

          {error && <p className="text-red-400 mb-2">{error}</p>}

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
