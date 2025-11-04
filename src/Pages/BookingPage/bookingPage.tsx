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
        <main
          className="w-screen min-h-screen flex flex-col justify-center items-center overscroll-y-auto pt-5 relative
        md:w-12/13 md:flex md:items-start md:ml-8 md:mr-8 "
        >
          <section
            className="Recipe w-11/12 flex justify-center items-center h-30 mb-5 sticky top-10 container_box z-1 rounded-md
          md:flex md:justify-center md:items-center md:fixed md:top-[190px] md:right-[30px] md:w-5/13 md:h-80 md:container_box"
          >
            <CheckoutRecipe />
          </section>

          <section
            className="Movie-Screening-Days flex flex-row container_box w-11/12 h-100 mb-4
          md:flex-col md:w-7/13 md:h-auto"
          >
            <MovieInformation />
            <CalenderComponent
              onSelectTheaterId={setSelectedTheaterId}
              onSelectShowing={setSelectedShowing}
            />
          </section>

          <div
            className="Booking-component flex flex-col w-11/12 h-auto justify-center items-center container_box
                        md:flex-col md:justify-center md:items-center md:w-7/13 
                        lg:flex lg:flex-row lg:w-11/12 lg:justify-start lg:items-start"
          >
            <AmountTheaterSeats />

            <TheaterViewContainer
              selectTheaterId={selectedTheaterId}
              selectShowing={selectedShowing}
            />
          </div>

          <CheckoutComponent isLoggedIn={isLoggedIn} />
        </main>
      </SeatsProvider>
    </>
  );
}
