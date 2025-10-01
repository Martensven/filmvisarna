import "./BookingPageStyle.css";
import "../../index.css";
import TheaterViewContainer from "./components/TheaterViewContainer";
import MovieInformation from "./components/MovieInformation";
import CalenderAndSeats from "./components/CalenderAndSeats";
import CheckoutComponent from "./components/CheckoutComponent";


export default function BookingPage() {
  return (
    <>
      {/*----------Container for booking page----------*/}
      <main
        className="flex flex-col justify-center items-center overscroll-y-auto w-screen min-h-screen bg-[#292929] pt-10"
      >
        <MovieInformation />

        <div className="flex flex-col w-screen h-auto
                        md:grid-cols-[2fr_1fr] md:gap-8">
          <CalenderAndSeats />
          <TheaterViewContainer />
        </div>
        <CheckoutComponent />
      </main>
    </>
  );
}
