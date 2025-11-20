import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import "../BookingPage/BookingPageStyle.css";
import "../../index.css";
import WelcomeSign from "./components/welcomeSign.tsx";
import FilterSortMovies from "./components/filterSortMovies.tsx";
import ThemeContainers from "./components/themeContainers.tsx";

export default function FrontPage() {
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const [themesLoaded, setThemesLoaded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (!moviesLoaded || !themesLoaded) return;
    }, 100)

    const scrollTo = location.state?.scrollTo;
    if (!scrollTo) return;

    setTimeout(() => {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [moviesLoaded, themesLoaded, location.state?.scrollTo]);

  return (
    <main className="w-screen flex flex-col items-center justify-center min-h-screen mt-14">
      {/*Welcome sign with function calling the user if it is logged in. Or else just showing FILMVISARNA. */}
      <WelcomeSign />

      {/*Filter & Sort & Movies*/}
      <FilterSortMovies onLoaded={() => setMoviesLoaded(true)} />

      {/* Theme days container*/}
      <ThemeContainers onLoaded={() => setThemesLoaded(true)} />
    </main>
  );
}