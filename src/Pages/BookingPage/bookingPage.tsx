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


  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(null);
  const [selectedShowing, setSelectedShowing] = useState<string | null>(null);



  return (
    <>
      <SeatsProvider>
        <CheckoutProvider>
          {/*----------Container for booking page----------*/}
          <main
            className="Bookingpage min-w-screen min-h-screen flex flex-col justify-center items-center overscroll-y-auto pt-5 relative
          sm:pt-0
          md:w-full md:flex md:items-start md:justify-around md:flex-row
          lg:w-12/13 lg:mt-10 
          xl:w-full"
          >
            <div className="flex justify-center items-center flex-col min-w-screen md:justify-start md:items-start md:min-w-0 md:w-full">
            <section
              className="Recipe md:hidden flex justify-center items-center sticky container_box rounded-md sticky top-20 w-11/12 h-50 z-50 m-10"
            >
              <CheckoutRecipe />
            </section>
            <section
              className="Movie-Screening-Days flex flex-col sm:flex-row container_box w-11/12 mb-4
            justify-center items-center
            md:w-12/15 md:ml-15
            lg:w-12/14 lg:ml-20
            xl:ml-18 xl:w-8/10"
            >
              <MovieInformation />
              <CalenderComponent
                onSelectTheaterId={setSelectedTheaterId}
                onSelectShowing={setSelectedShowing}
              />
            </section>

            <div
              className="Booking-component flex flex-col w-11/12 h-auto justify-center items-center container_box
                        md:flex-col md:justify-center md:items-center md:w-12/15 md:ml-15
                        lg:flex lg:flex-col lg:w-12/14 lg:justify-center lg:items-center lg:ml-20
                        xl:flex-row xl:ml-18 xl:justify-around xl:w-8/10"
            >
              <AmountTheaterSeats />

              <TheaterViewContainer
                selectTheaterId={selectedTheaterId}
                selectShowing={selectedShowing}
              />
            </div>
            </div>
            <section
              className="Recipe hidden sticky
            md:flex md:justify-center md:items-center md:self-start md:top-[170px] md:right-[10px] md:w-5/13 md:h-80 container_box rounded-md 
            lg:right-[35px] lg:top-[180px]
            xl:right-[60px] xl:top-[220px]"
            >
              <CheckoutRecipe />
            </section>
          </main>
          <section className="flex justify-center items-center m-10">
            <section className="w-screen xl:mt-10">
              <CheckoutComponent />
            </section>

          </section>
        </CheckoutProvider>
      </SeatsProvider>
    </>
  );
}
