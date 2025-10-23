import { useEffect, useState } from "react";
import { useParams } from "react-router";


export default function FetchUserInfo() {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);


    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`);
            if (!response.ok) throw new Error(`Serverfel: ${response.status}`);

            const data = await response.json();
            console.log("Fetched user:", data);
            setUser(data);
        } catch (err: any) {
            console.error("Error fetching user:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [userId]);

    if (loading) return <p className="text-white text-center mt-10">Laddar...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">Fel: {error}</p>;
    if (!user) return <p className="text-white text-center mt-10">Ingen användare hittades.</p>;
    return (
        <>
            {/* Användar info */}
            <section className="mb-8 text-center leading-loose w-10/12 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-2">Användarinformation:</h2>
                <p>Namn: {`${user.firstName} ${user.lastName}`}</p>
                <p>Email: {user.email}</p>
                <p className="mb-4">Telefon: {user.phoneNumber}</p>

                <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 mb-4">
                    Redigera information
                </button>
            </section>
        </>
    );
}