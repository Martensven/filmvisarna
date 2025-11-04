import { useState } from "react";
import "./BookingPageStyle.css";
import "../../index.css";
import TheaterViewContainer from "./components/TheaterViewContainer";
import MovieInformation from "./components/MovieInformation";
import CalenderComponent from "./components/CalenderComponent";
import CheckoutComponent from "./components/CheckoutComponent";
import AmountTheaterSeats from "./components/AmountTheaterSeats";
import { SeatsProvider } from "./components/context/SeatsContext";
import CheckoutRecipe from "./components/CheckoutRecipe";

export default function BookingPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(
    null
  );
  const [selectedShowing, setSelectedShowing] = useState<string | null>(null);

  return (
    <>
      <SeatsProvider>
        {/*----------Container for booking page----------*/}
        <main className="w-screen min-h-screen flex flex-col justify-center items-center overscroll-y-auto pt-5">


          <section className="Movie-Screening-Days flex flex-row container_box w-11/12 h-86 mb-4">
            <MovieInformation />
            <CalenderComponent
              onSelectTheaterId={setSelectedTheaterId}
              onSelectShowing={setSelectedShowing}
            />
          </section>

          <div
            className="Booking-component flex flex-col w-11/12 h-auto justify-center items-center container_box
                        md:flex-col md:justify-center md:items-center md:w-full 
                        lg:flex lg:flex-row lg:w-11/12 lg:justify-start lg:items-start"
          >
            <AmountTheaterSeats />

            <TheaterViewContainer
              selectTheaterId={selectedTheaterId}
              selectShowing={selectedShowing}
            />
            <CheckoutRecipe />
          </div>

          <CheckoutComponent isLoggedIn={isLoggedIn} />
        </main>
      </SeatsProvider>
    </>
  );
}
