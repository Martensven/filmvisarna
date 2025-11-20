// bookingPage.tsx (robust version)
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import "./BookingPageStyle.css";
import "../../index.css";

import TheaterViewContainer from "./components/TheaterViewContainer";
import MovieInformation from "./components/MovieInformation";
import CalenderComponent from "./components/CalenderComponent";
import CheckoutComponent from "./components/CheckoutComponent";
import AmountTheaterSeats from "./components/AmountTheaterSeats";
import CheckoutRecipe from "./components/CheckoutRecipe";

import { SeatsProvider } from "./components/context/SeatsContext";
import { CheckoutProvider } from "./components/context/CheckoutContext";

export default function BookingPage({}: { isLoggedIn?: boolean }) {
  // Support för flera param-namn: movieId eller id
  const params = useParams<{ movieId?: string; id?: string }>();
  const location = useLocation();

  // försök i denna ordning: movieId -> id -> sista path-segment
  const paramId =
    params.movieId ?? params.id ?? location.pathname.split("/").pop() ?? null;

  const [movie, setMovie] = useState<any | null>(null);
  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [movieError, setMovieError] = useState<string | null>(null);

  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(
    null
  );
  const [selectedShowing, setSelectedShowing] = useState<string | null>(null);

  useEffect(() => {
    // Om inget id så logga och returnera
    if (!paramId) {
      setMovieError("No movie id in URL");
      console.warn("BookingPage: no movie id found in params or pathname.");
      return;
    }

    const fetchMovie = async () => {
      setLoadingMovie(true);
      setMovieError(null);
      try {
        console.log("BookingPage: fetching movie with id:", paramId);
        const res = await fetch(`/api/movie/${paramId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`);
        }

        const data = await res.json();
        console.log("BookingPage: movie data:", data);
        setMovie(data);
      } catch (err: any) {
        console.error("BookingPage: could not fetch movie:", err);
        setMovieError(err?.message ?? String(err));
        setMovie(null);
      } finally {
        setLoadingMovie(false);
      }
    };

    fetchMovie();
  }, [paramId]);

  // Fallback-UI (liten)
  if (!paramId) {
    return <div className="p-6">Ingen film vald (ogiltig url).</div>;
  }

  return (
    <>
      {/* SeatsProvider använder movie?.age; det är ok att det börjar som null */}
      <SeatsProvider movieAge={movie?.age ?? null}>
        <CheckoutProvider>
          <main className="min-h-screen w-full flex flex-col items-center pt-5 md:flex-row md:items-start md:justify-between lg:pt-10">
            <section className="flex flex-col items-center w-full md:w-3/4 lg:w-4/5 xl:w-3/4">
              {/* Mobile Recipe */}
              <article className="md:hidden sticky top-0 z-50 w-11/12 rounded-md mb-6">
                <CheckoutRecipe />
              </article>

              {/* Movie Info + Calendar */}
              <article className="w-11/12 mb-6 container_box flex flex-col sm:flex-row gap-4">
                {/* Passa movie och setMovie om MovieInformation kan uppdatera */}
                <MovieInformation />

                <CalenderComponent
                  onSelectTheaterId={setSelectedTheaterId}
                  onSelectShowing={setSelectedShowing}
                />
              </article>

              {/* Visa loading/error */}
              {loadingMovie && (
                <div className="text-sm text-gray-300">Laddar film...</div>
              )}
              {movieError && (
                <div className="text-sm text-red-400">Fel: {movieError}</div>
              )}

              {/* Theater View */}
              <article className="w-11/12 container_box flex flex-col items-center gap-6 xl:flex-row xl:justify-between">
                <AmountTheaterSeats />
                <TheaterViewContainer
                  selectTheaterId={selectedTheaterId}
                  selectShowing={selectedShowing}
                />
              </article>
            </section>

            {/* Desktop Recipe */}
            <section className="hidden md:flex sticky top-40 container_box rounded-md justify-center items-start ml-4 md:w-1/4 lg:w-1/5 xl:w-1/4 xl:p-10">
              <CheckoutRecipe />
            </section>
          </main>

          {/* Checkout */}
          <section className="w-full flex justify-center mt-10">
            <div className="w-full max-w-7xl">
              <CheckoutComponent />
            </div>
          </section>
        </CheckoutProvider>
      </SeatsProvider>
    </>
  );
}
