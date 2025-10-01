
import UserAsGuest from "./UserAsGuestComponent";
import UserOrderComponent from "./UserOrderComponent";
import { useState } from "react"

//Booking component itself, when chosing date and time plus seats. This component will show when going to "checkout"

export default function CheckoutComponent() {
 const [showGuestOrder, setShowGuestOrder] = useState(false);
 const [showUserOrder, setShowUserOrder] = useState(false);

  return (
    <main className="flex flex-col justify-center items-center">
      

        <section className="flex flex-col justify-center items-center md:flex md:flex-row justify-between md:mb-10 md:w-96">
          <div className="flex flex-col justify-center items-center">
             {!showGuestOrder ? (
                <button onClick ={() => setShowGuestOrder(true)} className="main_buttons w-36 m-2 h-10 text-sm">Boka som Gäst</button>
            ): (<UserAsGuest />
            )}
          </div>
           
           <div>
            {!showUserOrder ? (
              <button onClick={() => setShowUserOrder(true)} className="main_buttons w-36 m-2 h-10 text-sm">Boka som Medlem</button>
            ): (<UserOrderComponent />
            )}
           </div>
          
          
        </section>

</main>
  );
}
