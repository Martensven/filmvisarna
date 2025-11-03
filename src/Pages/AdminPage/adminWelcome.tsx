// Imort useAuth hook to get user info
import { useAuth } from "../../context/authContext";
export default function AdminWelcome() {
    const { user, loading } = useAuth();

    if (loading) return <p>Laddar...</p>;
    if (!user) return <p>Åtkomst nekad. Du måste vara inloggad som administratör.</p>;

    return (
      <>
        <section className="text-center h-fit bg-[#243365] flex items-center justify-center p-8 rounded-xl">
            <h2 className="text-xl font-bold">Välkommen, {user.firstName}!</h2>
        </section>
      </>
    );
}