import { useState, useEffect } from "react";
// Imort useAuth hook to get user info
import { useAuth } from "../../../context/authContext";
export default function AdminWelcome() {
  const { user, loading } = useAuth();
  const [totalBookings, setTotalBookings] = useState(0);

  const fetchTotalBookings = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await fetch(
        `/api/admin/screenings/today/bookings/count?date=${today}`
      );
      const data = await response.json();
      setTotalBookings(data.count);
    } catch (error) {
      console.error("Error fetching total bookings:", error);
    }
  };

  if (loading) return <p>Laddar...</p>;
  if (!user)
    return <p>Åtkomst nekad. Du måste vara inloggad som administratör.</p>;

  // Fetch total bookings when component mounts
  useEffect(() => {
    fetchTotalBookings();
  }, []);

  return (
    <>
      <section className="text-center h-fit bg-[#243365] flex flex-col items-center justify-center p-6 md:rounded-xl">
        <h2 className="text-xl font-bold">Välkommen, {user.firstName} {user.lastName}!</h2>
        <p className="mt-2">Idag har vi {totalBookings} gäster.</p>
      </section>
    </>
  );
}
