import "../BookingPage/BookingPageStyle.css";
import "../../index.css";
import WelcomeSign from "./components/welcomeSign.tsx";
import FilterSortMovies from "./components/filterSortMovies.tsx";
import ThemeContainers from "./components/themeContainers.tsx";

export default function FrontPage() {

  return (
    <main className="w-screen flex flex-col items-center justify-center min-h-screen mt-14">
      {/*Welcome sign with function calling the user if it is logged in. Or else just showing FILMVISARNA. */}
      <WelcomeSign />

      {/*Filter & Sort & Movies*/}
      <FilterSortMovies />

      {/* Theme days container*/}
      <ThemeContainers />
    </main>
  );
}