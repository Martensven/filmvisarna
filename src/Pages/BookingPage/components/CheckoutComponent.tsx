
import UserAsGuest from "./UserAsGuestComponent";
import UserOrderComponent from "./UserOrderComponent";
import { useState, useContext } from "react";
import { SeatsContext } from "../../BookingPage/components/context/SeatsContext";

export default function CheckoutComponent() {
  const [showGuestOrder, setShowGuestOrder] = useState(false);
  const [showUserOrder, setShowUserOrder] = useState(false);

  const seatsContext = useContext(SeatsContext);

  // ✅ Determine login state dynamically
  const isLoggedIn = !!seatsContext?.userId;

  return (
    <main className="flex flex-col justify-center items-center mt-10">
      <section className="flex flex-col justify-center items-center md:flex md:flex-row justify-between md:mb-10 md:w-96">
        {/* Gäst */}
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
              <UserAsGuest />
            )}
          </div>
        )}

        {/* Medlem */}
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
