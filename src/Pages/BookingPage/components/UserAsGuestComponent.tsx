import { useState } from "react";

//This child component is for the guest checkout that's included in CheckoutComponent.

export default function UserAsGuest() {
  const [showMessage, setShowMessage] = useState(false);
  const [showCheckoutInput, setShowCheckoutInput] = useState(true);
  const [checkoutEmail, setCheckoutEmail] = useState("");

  const handleClick = () => {
    setShowMessage(true);
    setShowCheckoutInput(false);
  };

  return (
    <main className="container_box w-86 h-auto p-3 m-3">
      <p className="m-3">Genomför beställning:</p>
      <div className="w-86 h-auto p-5">
        {showCheckoutInput && (
          <>
            <input
              className="w-3/5 m-2"
              type="text"
              placeholder="Ange e-post"
              value={checkoutEmail}
              onChange={(e) => setCheckoutEmail(e.target.value)}
            />
            <button
              onClick={handleClick}
              className="main_buttons w-20 h-8"
            >
              Beställ
            </button>
          </>
        )}
      </div>

      {showMessage && (
        <>
          <p className="m-3">Beställning med bokningsnummer 123456789 genomförd!</p>
          <p className="m-3">Du får en bokningsbekräftelse till: {checkoutEmail}</p>
          <p className="m-3">Tack för din beställning!</p>
        </>
      )}
    </main>
  );
}