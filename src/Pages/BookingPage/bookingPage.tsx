import "./BookingPageStyle.css";
import TheaterComponent from "./components/TheaterComponent"
import MovieInformation from "./components/MovieInformation"
import BookingComponent from "./components/BookingComponent"


export default function BookingPage() {
  return (
    <>
      
      {/*----------Container for booking page----------*/}
      <main className="flex flex-col justify-center items-center overscroll-y-auto w-screen min-h-screen bg-[#292929] z-0 md:grid md:grid-rows-1">
      <h1 className="p-5 text-lg text-white font-bold">Boka din biljett</h1>
       <MovieInformation />
        <TheaterComponent />
        <BookingComponent />
       
      

           
      </main>
    </>
  );
}
