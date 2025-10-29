import React, { useEffect, useState } from "react";
import Select from "react-select";
import type { User, Booking } from "./adminUsersList";

type Props = {
  onClose: () => void;
};

export function SearchUserModal({ onClose }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelMessage, setCancelMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fel vid hämtning av användare:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedUser) return;
      try {
        const response = await fetch(`/api/bookings/user/${selectedUser._id}`);
        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Fel vid hämtning av bokningar:", error);
      }
    };
    fetchBookings();
  }, [selectedUser]);

  const handleCancelBooking = async (bookingId: string) => {
    const confirmed = window.confirm("Är du säker på att du vill avboka denna bokning?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Kunde inte ta bort bokningen");
      setCancelMessage("Bokningen har avbokats.");
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Fel vid avbokning:", error);
      setCancelMessage("Ett fel uppstod vid avbokning.");
    }

    setTimeout(() => setCancelMessage(""), 3000);
  };

  const options = users.map((user) => ({
    value: user._id,
    label: `${user.firstName || ""} ${user.lastName || ""} | ${user.email} | ${user.phoneNumber}`,
    user,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg p-6 shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Sök användare</h2>
        <Select
          options={options}
          onChange={(option) => setSelectedUser(option?.user || null)}
          placeholder="Sök på namn, e-post, telefon eller ID..."
          isClearable
        />

        {selectedUser && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <p><strong>Telefon:</strong> {selectedUser.phoneNumber}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Användar-ID:</strong> {selectedUser._id}</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">Bokningar</h4>
            {bookings.length === 0 ? (
              <p>Inga bokningar hittades.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map((booking) => (
                  <li key={booking._id} className="border p-4 rounded-md bg-gray-100 text-black">
                    <p><strong>Film:</strong> {booking.screening_id?.movie?.title || "Okänd"}</p>
                    <p><strong>Datum:</strong> {booking.screening_id?.date}</p>
                    <p><strong>Tid:</strong> {booking.screening_id?.time}</p>
                    <p><strong>Salong:</strong> {booking.screening_id?.auditorium?.name || "Okänd"}</p>
                    <p><strong>Totalt pris:</strong> {booking.totalPrice} kr</p>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Avboka
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {cancelMessage && (
              <div className="mt-4 text-green-700 font-semibold">{cancelMessage}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
