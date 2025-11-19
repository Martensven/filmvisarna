import type { User, Booking } from "./adminUsersPage";

type Props = {
  user: User;
  bookings: Booking[];
  onCancelBooking?: (bookingId: string) => void;
  cancelMessage?: string;
};

export function UserDetail({ user, bookings = [], onCancelBooking, cancelMessage }: Props) {
  return (
    <div className="mt-6 bg-[#243365] p-6 rounded-xl">
      <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
      <p><strong>Telefon:</strong> {user.phoneNumber}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Användar-ID:</strong> {user._id}</p>

      <h3 className="text-xl font-semibold mt-4">Bokningar</h3>
      {(!bookings || bookings.length === 0) ? (
        <p>Inga bokningar hittades.</p>
      ) : (
<ul className="space-y-4 mt-2 pr-2">
          {bookings.map((booking) => (
            <li key={booking._id} className="border border-white/20 p-4 rounded-md bg-[#32437c]">
              <p><strong>Film:</strong> {booking.screening_id?.movie?.title || "Okänd"}</p>
              <p><strong>Datum:</strong> {booking.screening_id?.date}</p>
              <p><strong>Tid:</strong> {booking.screening_id?.time}</p>
              <p><strong>Salong:</strong> {booking.screening_id?.auditorium?.name || "Okänd"}</p>
              <p><strong>Totalt pris:</strong> {booking.totalPrice} kr</p>

              {onCancelBooking && (
                <button
                  onClick={() => onCancelBooking(booking._id)}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                >
                  Avboka
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {cancelMessage && <div className="mt-4 text-green-700 font-semibold">{cancelMessage}</div>}
    </div>
  );
}

