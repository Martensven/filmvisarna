import { useEffect, useState } from "react";
import { FaUsers, FaSearch } from "react-icons/fa";
import { AdminUsersList } from "./adminUsersList";
import { AdminSearchUser } from "./adminSearchUser";
import { UserDetail } from "./adminUserDetails";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
};

export type Booking = {
  _id: string;
  screening_id?: {
    movie?: { title: string };
    date: string;
    time: string;
    auditorium?: { name: string };
  };
  totalPrice: number;
};

export default function AdminUsersPage() {
  // view state to toggle between menu, list users, and search usersviews
  const [view, setView] = useState<"menu" | "list" | "search">("menu");
  // State to manage selected user
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // State to manage bookings of the selected user
  const [bookings, setBookings] = useState<Booking[]>([]);
  // State to manage cancellation message
  const [cancelMessage, setCancelMessage] = useState("");

  useEffect(() => {
    // Fetch bookings when selectedUser changes
    const fetchBookings = async () => {
      if (!selectedUser) return;
      try {
        const response = await fetch(
          `/api/admin/bookings/${selectedUser._id}?page=1&limit=5`
        );
        const data = await response.json();
        setBookings(data.data);
      } catch (error) {
        console.error("Fel vid hämtning av bokningar:", error);
      }
    };

    fetchBookings();
  
  }, [selectedUser]); // Fetch bookings when selectedUser changes

  // Function to handle booking cancellation
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
      setCancelMessage("Bokningen har avbokats.");
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Fel vid avbokning:", error);
      setCancelMessage("Ett fel uppstod vid avbokning.");
    }
    setTimeout(() => setCancelMessage(""), 3000);
  };

  return (
    <main className="max-w-3xl my-8 mx-auto bg-[#243365] text-white p-6 flex flex-col min-h-30vh md:rounded-xl">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold inline-block px-6 text-white">
          Användare
        </h1>
      </header>

      {/* If view is menu and no user is selected menu is shown */}
      {view === "menu" && !selectedUser && (
        <nav className="flex justify-center items-center mb-8 gap-10">
          <FaSearch
            size={70}
            className="cursor-pointer"
            // sets view to search when clicked
            onClick={() => setView("search")}
          />
          <FaUsers
            size={80}
            className="cursor-pointer"
            // sets view to list when clicked
            onClick={() => setView("list")}
          />
        </nav>
      )}

      {(view !== "menu" || selectedUser) && (
        <button
          className="mb-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 cursor-pointer w-fit cursor-pointer mx-auto"
          onClick={() => {
            if (selectedUser) setSelectedUser(null);
            else setView("menu");
          }}
        >
          ← Tillbaka
        </button>
      )}

      {/* List or Search view */}
      {!selectedUser && view === "list" && (
        <AdminUsersList onSelectUser={setSelectedUser} />
      )}
      {!selectedUser && view === "search" && (
        <AdminSearchUser onSelectUser={setSelectedUser} />
      )}

      {/* If a user is selected, show their details in the UserDetail component. UserDetail receives selected user and bookings as props */}
      {selectedUser && (
        <UserDetail
          user={selectedUser}
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
          cancelMessage={cancelMessage}
        />
      )}
    </main>
  );
}
