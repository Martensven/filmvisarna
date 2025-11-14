import { useState } from "react";
import "./BookingPageStyle.css";
import "../../index.css";
import TheaterViewContainer from "./components/TheaterViewContainer";
import MovieInformation from "./components/MovieInformation";
import CalenderComponent from "./components/CalenderComponent";
import CheckoutComponent from "./components/CheckoutComponent";
import AmountTheaterSeats from "./components/AmountTheaterSeats";
import { SeatsProvider } from "./components/context/SeatsContext";
import { CheckoutProvider } from "./components/context/CheckoutContext";
import CheckoutRecipe from "./components/CheckoutRecipe";



export default function BookingPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(
    null
  );
  const [selectedShowing, setSelectedShowing] = useState<string | null>(null);

  return (
    <>
      <SeatsProvider>
        <CheckoutProvider>
          {/*----------Container for booking page----------*/}
          <main
            className="Bookingpage w-screen min-h-screen flex flex-col justify-center items-center overscroll-y-auto pt-5 relative
          sm:pt-0
          md:w-full md:flex md:items-start md:justify-around  
          lg:w-12/13 lg:mt-10 
          xl:w-full"
          >
            <section
              className="Movie-Screening-Days flex flex-col  sm:flex-row container_box w-11/12 mb-4
            justify-center items-center
            md:w-7/14 md:ml-10
            lg:w-8/14 lg:ml-11
            xl:ml-18 xl:w-6/12"
            >
              <MovieInformation />
              <CalenderComponent
                onSelectTheaterId={setSelectedTheaterId}
                onSelectShowing={setSelectedShowing}
              />
            </section>

            <div
              className="Booking-component flex flex-col w-11/12 h-auto justify-center items-center container_box
                        md:flex-col md:justify-center md:items-center md:w-7/14 md:ml-10
                        lg:flex lg:flex-col lg:w-8/14 lg:justify-center lg:items-center lg:ml-11
                        xl:flex-row xl:ml-18 xl:justify-around xl:w-6/12"
            >
              <AmountTheaterSeats />

              <TheaterViewContainer
                selectTheaterId={selectedTheaterId}
                selectShowing={selectedShowing}
              />
            </div>

            <div className="relative">
              <section
              className="Recipe w-11/12 flex justify-center items-center h-50 mb-5 sticky top-10 container_box z-1 rounded-md
              md:flex md:justify-center md:items-center md:fixed md:top-[170px] md:right-[30px] md:w-5/13 md:h-80 md:container_box 
              lg:right-[35px] lg:top-[180px]
              xl:right-[60px] xl:top-[220px]"
              >
                <CheckoutRecipe />
              </section>
            </div>
            <CheckoutComponent />
          </main>
        </CheckoutProvider>
      </SeatsProvider>
    </>
  );
}
