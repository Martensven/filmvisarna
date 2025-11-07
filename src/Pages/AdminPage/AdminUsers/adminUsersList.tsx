import React, { useState, useEffect } from "react";
import Toast from "../../../toast/toast";

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
};

export type Booking = {
  _id: string;
  screening_id?: {
    movie?: { title: string };
    auditorium?: { name: string };
    date: string;
    time: string;
  };
  totalPrice: number;
  created_at: string;
};

export function AdminUsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          credentials: "include",
        });

        if (!response.ok)
          throw new Error("Något gick fel vid hämtning av användare");
        const data: User[] = await response.json();
        setUsers(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Fel vid hämtning av användare:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!selectedUser) return;
      try {
        const response = await fetch(`/api/admin/bookings/${selectedUser._id}`, {
          credentials: "include",
        });
        if (!response.ok)
          throw new Error("Något gick fel vid hämtning av bokningar");
        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Fel vid hämtning av bokningar:", error);
      }
    };
    fetchUserBookings();
  }, [selectedUser]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setToastMessage(null);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setBookings([]);
    setToastMessage(null); 
  };

  const handleCancelBooking = async (bookingId: string) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill avboka denna bokning?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Kunde inte ta bort bokningen");

      setToastMessage("Bokningen har avbokats.");
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Fel vid avbokning av bokning:", error);
      setToastMessage("Ett fel uppstod vid avbokning av bokningen.");
    }
  };

  if (loading) {
    return <div>Laddar användare...</div>;
  }

  return (
    <div className="p-6 bg-[#243365] text-white max-w-4xl mx-auto rounded-xl">

  <div className="hidden md:grid grid-cols-3 text-sm font-semibold border-b border-gray-400 pb-2 mb-2 select-none">
    <div>Namn</div>
    <div>Email</div>
    <div>Välj</div>
  </div>

  {currentUsers.map((user) => (
    <div
      key={user._id}
      className="
        border-b border-gray-500 text-sm py-4
        flex flex-col gap-2
        md:grid md:grid-cols-3
      "
    >
      <div>
        <span className="text-xs text-gray-300 md:hidden">Namn: </span>
        {user.firstName} {user.lastName}
      </div>

      <div>
        <span className="text-xs text-gray-300 md:hidden">Email: </span>
        {user.email}
      </div>

      <div className="flex items-center">
        <button
          onClick={() => handleUserClick(user)}
          className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 mx-auto"
        >
          Öppna
        </button>
      </div>
    </div>
  ))}

  <div className="flex justify-center gap-4 mt-6">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
    >
      Föregående
    </button>
    <span className="px-2 py-1">
      Sida {currentPage} av {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
    >
      Nästa
    </button>
  </div>



      {selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="p-6 bg-[#243365] text-white max-w-2xl w-full rounded-xl min-h-[60vh] flex flex-col gap-4 relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl font-bold cursor-pointer"
        aria-label="Stäng modal"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold">
        {selectedUser.firstName} {selectedUser.lastName}
      </h2>

      <p><strong>Telefon:</strong> {selectedUser.phoneNumber}</p>
      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>Användar-ID:</strong> {selectedUser._id}</p>

      <h3 className="text-xl font-semibold mt-4">Bokningar</h3>

      {bookings.length === 0 ? (
        <p>Inga bokningar hittades.</p>
      ) : (
        <ul className="space-y-4 overflow-y-auto max-h-[40vh] pr-2">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border border-white/20 p-4 rounded-md bg-[#32437c]"
            >
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
    </div>
  </div>
)}


      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
