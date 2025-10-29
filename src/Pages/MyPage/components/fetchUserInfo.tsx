import { useState } from "react";
import { useAuth } from "../../../context/authContext";


export default function FetchUserInfo() {
    const { user, loading } = useAuth();


    if (loading) return <p className="text-white text-center mt-10">Laddar...</p>;
    if (!user) return <p className="text-white text-center mt-10">Ingen användare inloggad.</p>;

    return (
        <>
            <section className="mb-8 text-center leading-loose w-10/12 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-2">Användarinformation:</h2>
                <p>Namn: {`${user.firstName} ${user.lastName}`}</p>
                <p>Email: {user.email}</p>
                <p className="mb-4">Telefon: {user.phoneNumber}</p>

                <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 mb-4">
                    Redigera information
                </button>
                {user.role === "admin" && (
          <a
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Gå till Adminpanel
          </a>
        )}
            </section>


        </>
    );
}

