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
        className="w-screen min-h-screen flex flex-col justify-center items-center overscroll-y-auto bg-[#292929] pt-10"
      >
        <MovieInformation />

        <div className="flex flex-col w-full h-auto justify-center items-center
                        md:flex-row md:justify-center md:items-start md:w-full ">
          <TheaterViewContainer />
          <CalenderAndSeats />
          
        </div>

        <CheckoutComponent />
      </main>
    </>
  );
}
