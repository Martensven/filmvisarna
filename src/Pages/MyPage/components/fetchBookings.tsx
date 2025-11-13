import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";

export default function FetchBookings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null); // För popup
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

    const userId = user?.userId ? user.userId : "";

    const fetchUserBookings = async () => {
        try {
            const response = await fetch(`/api/bookings/user/${userId}?type=upcoming`);
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


    const handleDeleteBooking = async (bookingId: string) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                // Hantera alla möjliga felmeddelanden från servern
                throw new Error(
                    data.errorMSG || "Kunde inte avboka"
                );
            }

            // Ta bort bokningen från listan utan att ladda om
            setBookings((prev) => prev.filter((b) => b._id !== bookingId));
            setAlertMessage("Avbokning genomförd!");
            setAlertType("success")
        } catch (err: any) {
            console.error("Fel vid avbokning:", err);
            setAlertMessage(err.message);
            setAlertType("error");
        } finally {
            setSelectedBooking(null);
        }
    };

    if (loading) return <p className="text-white text-center mt-10">Laddar...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">Fel: {error}</p>;

    return (
        <>
            {/* pop-up for cancellation confirmation */}
            {selectedBooking && (
                <div className="flex z-50 inset-50 sticky mb-10">
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center w-80">
                        <h3 className="text-lg font-semibold mb-4 text-white">
                            Är du säker att du vill avboka?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            {selectedBooking.screening_id.movie.title} <br />
                            {selectedBooking.screening_id.date} – {selectedBooking.screening_id.time}
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => handleDeleteBooking(selectedBooking._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Ja, avboka
                            </button>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Nej, avbryt
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {alertMessage && (
                <div className={`flex z-50 inset-50 sticky mb-10`}>
                    <div className={`p-6 rounded-xl shadow-lg text-center w-80 transition-all duration-300 
                        ${alertType === "success" ? "bg-green-600" : "bg-red-600"}`}>
                            <h3 className="text-white text-lg font-semibold mb-3">{alertType === "success" ? "Klart!" : "Fel inträffade"}</h3>
                            <p className="text-white mb-5">{alertMessage}</p>
                            <button onClick={() => setAlertMessage(null)} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
                                Stäng
                            </button>
                    </div>
                </div>
            )}
            {bookings.length === 0 ? (
                <p className="text-white text-center mt-10">Inga bokningar hittades.</p>
            ) : (

                <section className="current space-y-6 leading-loose w-10/12">
                <h2 className="text-xl font-semibold">Dina bokningar</h2>
                {bookings.map((b: any, index: number) => (
                    <div key={b._id || index} className="border-b border-gray-700 pb-4">
                        <p className="font-bold">{b.screening_id.movie.title}</p>
                        <p>
                            Datum: {b.screening_id.date} – {b.screening_id.time}
                        </p>
                        <p>Salong: {b.screening_id.auditoriumName}</p>

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

                        <p>
                            Biljetter:{" "}
                            {b.tickets.map((t: any) => `${t.ticketName} x${t.quantity}`).join(", ")}
                        </p>

                        <p className="font-medium">Pris: {b.totalPrice} kr</p>
                        {/* <p>Bokat: {b.created_at}</p> */}
                        <p>Bokningsnummer: {b.bookingNumber}</p>

                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-3"
                            onClick={() => setSelectedBooking(b)}
                        >
                            Avboka
                        </button>
                    </div>
                ))}
            </section>
            )}
        </>
    );
}
