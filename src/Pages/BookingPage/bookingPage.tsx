import { useState } from "react";
import "./BookingPageStyle.css";
import "../../index.css";
import TheaterViewContainer from "./components/TheaterViewContainer";
import MovieInformation from "./components/MovieInformation";
import CalenderAndSeats from "./components/CalenderAndSeats";
import CheckoutComponent from "./components/CheckoutComponent";
import { SeatsProvider } from "./components/context/SeatsContext";


export default function BookingPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);

  return (
    <>
      <SeatsProvider>
      {/*----------Container for booking page----------*/}
      <main
        className="w-screen min-h-screen flex flex-col justify-center items-center overscroll-y-auto bg-[#292929] pt-10"
      >
        <MovieInformation />

        <div className="flex flex-col w-full h-auto justify-center items-center
                        md:flex-col md:justify-center md:items-center md:w-full 
                        lg:flex lg:flex-row">

          <CalenderAndSeats onSelectTheater={setSelectedTheater} />

          {/* Theater view based on selected showing */}
          {selectedTheater && <TheaterViewContainer selectTheater={selectedTheater} />}
          
        </div>

        <CheckoutComponent isLoggedIn={isLoggedIn} />
      </main>
      </SeatsProvider>
    </>
  );
}
