import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";

export default function FetchBookings() {

    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookings, setBookings] = useState<any[]>([]);


    const userId = user?.userId ? user.userId : "";
    console.log(userId);


    const fetchUserBookings = async () => {
        try {
            const response = await fetch(`/api/bookings/user/${userId}?type=upcoming`, {});
            if (!response.ok) throw new Error(`Serverfel: ${response.status}`);

            const data = await response.json();
            setBookings(data);
        } catch (err: any) {
            console.error("Error fetching bookings:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserBookings();
        }
    }, [userId]);

    if (loading) return <p className="text-white text-center mt-10">Laddar...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">Fel: {error}</p>;
    if (bookings.length === 0) return <p className="text-white text-center mt-10">Inga bokningar hittades.</p>;
    console.log(bookings);

    return (

        <>
            <section className="current space-y-6 leading-loose w-10/12">
                <h2 className="text-xl font-semibold">Dina bokningar</h2>

                {bookings.map((b: any, index: number) => (
                    <div key={b._id || index} className="border-b border-gray-700 pb-4">
                        {/* Movie Title */}
                        <p className="font-bold">{b.screening_id.movie.title}</p>

                        {/* Date & Time */}
                        <p>
                            Datum:
                            {b.screening_id.date} – {b.screening_id.time}
                        </p>

                        {/* Auditorium */}
                        <p>Salong: {b.screening_id.auditoriumName}</p>

                        {/* Seats */}
                        <p>
                            Plats(er):{" "}
                            {b.seats?.length
                                ? b.seats
                                    .map((s: any) =>
                                        s?.seat_id
                                            ? `Rad: ${s.seat_id.rowNumber}, Plats: ${s.seat_id.seatNumber}`
                                            : "Okänd plats"
                                    )
                                    .join(", ")
                                : "Inga platser"}
                        </p>

                        {/* Tickets */}
                        <p>
                            Biljetter:{" "}
                            {b.tickets
                                .map((t: any) => `${t.ticketName} x${t.quantity}`)
                                .join(", ")}
                        </p>

                        {/* Total cost */}
                        <p className="font-medium">Pris: {b.totalPrice} kr</p>

                        <p>Bokat: {b.created_at}</p>

                        <p>Bokningsnummer: {b._id}</p>

                        <button className="text-red-400 hover:underline mt-1">
                            Avboka
                        </button>
                    </div>
                ))}
            </section>


        </>
    );
}

