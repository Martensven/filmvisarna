import React, { useState, useEffect } from "react";

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
  const [cancelMessage, setCancelMessage] = useState("");
  // State for pagination, we want to show 10 users per page
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Get the index of the last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  // Get the index of the first user on the current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Slice the users array to get only the users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av användare");
        }

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
        const response = await fetch(`/api/bookings/user/${selectedUser._id}`);
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av bokningar");
        }
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
    setCancelMessage("");
  };

  const closeModal = () => {
    setSelectedUser(null);
    setBookings([]);
    setCancelMessage("");
  };

  const handleCancelBooking = async (bookingId: string) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill avboka denna bokning?"
    );
    if (!confirmed) return;

    try {
      const respone = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
      });
      if (!respone.ok) throw new Error("Kunde inte ta bort bokningen");
      setCancelMessage("Bokningen har avbokats.");
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Fel vid avbokning av bokning:", error);
      setCancelMessage("Ett fel uppstod vid avbokning av bokningen.");
    }

    setTimeout(() => {
      setCancelMessage("");
    }, 3000);
  };

  if (loading) {
    return <div>Laddar användare...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Användare</h1>
      <ul className="space-y-2">
        {currentUsers.map((user) => (
          <li
            key={user._id}
            className="cursor-pointer hover:underline"
            onClick={() => handleUserClick(user)}
          >
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Föregående
        </button>
        <span className="px-2 py-1">
          Sida {currentPage} av {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Nästa
        </button>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Stäng modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-2">
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <p>
              <strong>Telefon:</strong> {selectedUser.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Användar-ID:</strong> {selectedUser._id}
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Bokningar</h3>
            {bookings.length === 0 ? (
              <p>Inga bokningar hittades.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map((booking) => (
                  <li
                    key={booking._id}
                    className="border p-4 rounded-md bg-gray-100 text-black"
                  >
                    <p>
                      <strong>Film:</strong>{" "}
                      {booking.screening_id?.movie?.title || "Okänd"}
                    </p>
                    <p>
                      <strong>Datum:</strong> {booking.screening_id?.date}
                    </p>
                    <p>
                      <strong>Tid:</strong> {booking.screening_id?.time}
                    </p>
                    <p>
                      <strong>Salong:</strong>{" "}
                      {booking.screening_id?.auditorium?.name || "Okänd"}
                    </p>
                    <p>
                      <strong>Totalt pris:</strong> {booking.totalPrice} kr
                    </p>
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
              <div className="mt-4 text-green-700 font-semibold">
                {cancelMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
