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

export default function BookingPage({ }: { isLoggedIn: boolean }) {
  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(null);
  const [selectedShowing, setSelectedShowing] = useState<string | null>(null);

  return (
    <>
      <SeatsProvider>
        <CheckoutProvider>

          <main
            className="
            min-h-screen w-full
            flex flex-col items-center
            pt-4
            lg:flex-row lg:items-start lg:justify-center lg:gap-10
            lg:pt-10"
          >

            {/* LEFT SIDE: Everything except desktop recipe */}
            <section
              className="
              flex flex-col items-center
              w-full
              sm:w-11/12
              md:w-4/5
              lg:w-3/5
              xl:w-1/2
              gap-6"
            >

              {/* Mobile/Tablet Recipe */}
              <article className="
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
