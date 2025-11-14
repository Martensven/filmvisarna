import { useEffect, useState } from "react";
import { FaUsers, FaSearch } from "react-icons/fa";
import { AdminUsersList } from "./adminUsersList";
import { SearchUserModal } from "./adminSearchUser";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}

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
        const response = await fetch(`/api/admin/bookings/${selectedUser._id}?page=1&limit=5`);
        const data = await response.json();
        setBookings(data.data);
      } catch (error) {
        console.error("Fel vid hämtning av bokningar:", error);
      }
    };

    fetchBookings();
  }, [selectedUser]); 

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
    
  );
}

