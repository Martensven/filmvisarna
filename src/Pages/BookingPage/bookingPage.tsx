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
          <main className=" 
          min-h-screen w-full
          flex flex-col items-center pt-5
          md:flex-row md:items-start md:justify-between
          lg:pt-10">
            <section className="flex flex-col items-center w-full md:w-3/4 lg:w-4/5 xl:w-3/4">
              {/* Mobile Recipe */}
              <article className="md:hidden sticky top-0 z-50 w-11/12 rounded-md mb-6">
                <CheckoutRecipe />
              </article>
            
              {/* Movie Info + Calendar */}
              <article className=" w-11/12 mb-6 container_box flex flex-col sm:flex-row gap-4">
                <MovieInformation />
                <CalenderComponent onSelectTheaterId={setSelectedTheaterId} onSelectShowing={setSelectedShowing}/>
              </article>

              {/* Theater View */}
              <article className=" w-11/12 container_box flex flex-col items-center gap-6
              xl:flex-row xl:justify-between">
                <AmountTheaterSeats />
                <TheaterViewContainer selectTheaterId={selectedTheaterId} selectShowing={selectedShowing}/>
              </article>
            </section>
            
            {/* Desktop Recipe */}
            <section className="hidden md:flex sticky top-40 container_box rounded-md justify-center items-start ml-4
            md:w-1/4 lg:w-1/5 xl:w-1/4 xl:p-10">
              <CheckoutRecipe />
            </section>
          </main>
          
          <section className="w-full flex justify-center mt-10">
            <div className="w-full max-w-screen-xl">
              <CheckoutComponent />
            </div>
          </section>
        </CheckoutProvider>
      </SeatsProvider>
    </>
  );
}
