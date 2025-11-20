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

export default function BookingPage({ }: { isLoggedIn?: boolean }) {

  const params = useParams<{ movieId?: string; id?: string }>();
  const location = useLocation();

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

  if (!paramId) {
    return <div className="p-6">Ingen film vald (ogiltig url).</div>;
  }

  return (
    <>
      <SeatsProvider movieAge={movie?.age ?? null}>
        <CheckoutProvider>

          <main
            className="
            min-h-screen w-screen
            flex flex-col items-center justify-center
            pt-4
            lg:flex-row lg:items-start lg:justify-center lg:gap-10
            lg:pt-10"
          >

            {/* LEFT SIDE: Everything except desktop recipe */}
            <section
              className="
              flex flex-col items-center
              w-11/12
              md:w-4/5
              lg:w-3/5
              xl:w-1/2
              gap-6"
            >

              {/* Mobile/Tablet Recipe */}
              <article className="
              flex justify-center items-center
                lg:hidden 
                sticky top-0 z-50
                w-full
                container_box rounded-md
                p-4
              ">
                <CheckoutRecipe />
              </article>

              {/* Movie Info + Calendar */}
              <article
                className="
                w-full
                container_box
                flex flex-col items-center gap-4
                sm:flex-row sm:justify-between
                p-4
              ">
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
              <article
                className="
                w-full
                container_box
                flex flex-col items-center gap-4
                xl:flex-row xl:justify-between
                p-4
              ">
                <AmountTheaterSeats />
                <TheaterViewContainer
                  selectTheaterId={selectedTheaterId}
                  selectShowing={selectedShowing}
                />
              </article>
            </section>

            {/* RIGHT SIDE: Desktop Recipe */}
            <section
              className="
              hidden lg:flex
              sticky top-40
              container_box rounded-md
              justify-center items-start
              p-6 xl:p-10
              w-75 xl:w-80
            ">
              <CheckoutRecipe />
            </section>
          </main>

          {/* Checkout */}
          <section className="w-full flex justify-center mt-10">
            <div className="w-full">
              <CheckoutComponent />
            </div>
          </section>

        </CheckoutProvider>
      </SeatsProvider>
    </>
  );
}
