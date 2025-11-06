import { useState } from "react";
import GuestOrderComponent from "./UserAsGuestComponent";
import UserOrderComponent from "./UserOrderComponent";
import { useAuth } from "../../../context/authContext";

export default function CheckoutComponent() {
  const { user, loading } = useAuth(); // <-- använd useAuth istället för prop
  const [showGuestOrder, setShowGuestOrder] = useState(false);
  const [showUserOrder, setShowUserOrder] = useState(false);

  // Om vi fortfarande laddar användardata
  if (loading) {
    return (
      <main className="flex flex-col justify-center items-center mt-10">
        <p>Laddar användarinformation...</p>
      </main>
    );
  }

  const isLoggedIn = !!user; // enklare flagga

  return (
    <main className="flex flex-col justify-center items-center mt-10">
      <section className="flex flex-col justify-center items-center md:flex md:flex-row md:mb-10 md:w-96">
        {/* Gästvy */}
        {!isLoggedIn && (
          <div className="flex flex-col justify-center items-center">
            {!showGuestOrder ? (
              <button
                onClick={() => setShowGuestOrder(true)}
                className="main_buttons w-36 m-2 h-10 text-sm"
              >
                Boka som Gäst
              </button>
            ) : (
              <GuestOrderComponent />
            )}
          </div>
        )}

        {/* Inloggad vy */}
        {isLoggedIn && (
          <div className="flex flex-col justify-center items-center">
            {!showUserOrder ? (
              <button
                onClick={() => setShowUserOrder(true)}
                className="main_buttons w-36 m-2 h-10 text-sm"
              >
                Boka som Medlem
              </button>
            ) : (
              <UserOrderComponent />
            )}
          </div>
        )}
      </section>
    </main>
  );
}
