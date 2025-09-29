import "./BookingPageStyle.css";
import "../../index.css";
import TheaterView from "./components/TheaterView";
import MovieInformation from "./components/MovieInformation";
import BookingComponent from "./components/BookingComponent";



export default function BookingPage() {
  return (
    <>
      {/*----------Container for booking page----------*/}
      <main
        className="flex flex-col justify-center items-center overscroll-y-auto w-screen min-h-screen bg-[#292929] pt-10 
      md:grid md:grid-rows-1"
      >
        <MovieInformation />
        <TheaterView />
        <BookingComponent />
      </main>
    </>
  );
}
