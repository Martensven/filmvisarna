import { useParams } from "react-router";
import "../BookingPageStyle.css";
import { useState, useEffect } from "react";
//Component contains todays showing and other dates. This ones are going to be clickable

interface Props {
  // movieId: string;
  onSelectTheaterId: (theaterId: string) => void;
  onSelectShowing: (showing: string) => void;
}
interface screening {
  movie: {
    _id: string;
    title: string;
  };
  _id: string;
  auditorium: {
    _id: string;
    name: string;
  };
  date: string;
  time: string;
}

export default function CalenderComponent({
  onSelectTheaterId,
  onSelectShowing,
}: Props) {
  // State for active calender date with border when clicked
  const [active, setActive] = useState<string | null>(null);
  const [screenings, setScreenings] = useState<screening[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchScreeningTimes = async () => {
      try {
        const response = await fetch(`/api/screenings/movie/${id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Kan inte hämta data: ${response.status}`);
        }
        const data = await response.json();
        console.log("Hämtad screening data: ", data);
        setScreenings(data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScreeningTimes();
  }, [id]);

  if (loading) {
    return <p>Laddar data</p>;
  }

  if (!screenings) {
    return <p>Ingen filmdata hämtad</p>;
  }

  // Group up in date categories
  const sortScreeningByDate = screenings.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = [];
    acc[s.date].push(s);
    return acc;
  }, {} as Record<string, screening[]>);

  //Seperate todays screening with other screenings
  const today = new Date().toISOString().split("T")[0]; // Declare today with current day date.
  const todaysScreening = sortScreeningByDate[today] || [];
  const otherDaysScrenning = Object.keys(sortScreeningByDate).filter(
    (date) => date > today
  );

  return (
    <main
      className="Container-for-days w-7/12  flex flex-col justify-center items-center
      sm:justify-center sm:items-center sm:mb-5
      md:w-full md:flex-col md:justify-center md:items-center
      lg:w-6/12 
      xl:w-8/12"
    >
      {/*----------Containers for calender days----------*/}
      <div className="todays-container flex flex-col justify-center items-center mt-2 h-auto w-full
      md:w-11/12 md:justify-center md:items-center
      lg:w-11/12
      xl:w-11/12">
        <h2
          className="text-[#e4e1e1] text-sm
        md:text-lg md:p-2
        lg:w-10/12 lg:p-2 "
        >
          Dagens visningar
        </h2>
        <section
          className="Todays flex flex-col justify-center items-center w-11/12 rounded-md          
          md:flex-row md:w-5/12 md:justify-center md:items-center
          lg:flex lg:flex-row lg:justify-center lg:w-10/12 
          xl:w-7/12 "
        >
          {todaysScreening.length > 0 ? (
            todaysScreening.map((screening) => (
              <ul
                // Setting active state to mark selected calender date and onSelectTheater to get the selected theater
                // This will be used dynamically later on
                key={screening._id}
                onClick={() => {
                  setActive(screening._id);
                  onSelectTheaterId(screening.auditorium._id);
                  onSelectShowing(screening._id);
                }}
                className={`calenderDatesContainer container_box bg-[#e4e1e1] w-9/12 h-auto shadow-xl/20
                sm:mb-2 
                md:w-full md:text-base md:justify-center md:items-center cursor-pointer
                lg:w-11/12 lg:flex lg:flex-col lg:justify-between lg:items-center">
          ${active === screening._id ? "!border-4 !border-[#07ca00]" : ""}`}
              >
                <li
                  className="pt-1 pb-1 text-base font-bold 
                  md:p-0
              "
                >
                  {screening.time}
                </li>
                <li
                  className="px-1 pb-1 text-xs 
              md:text-xs md:pb-2 
              "
                >
                  {screening.auditorium.name}
                </li>
              </ul>
            ))
          ) : (
            <p className="flex h-20 px-2 justify-center items-center bg-[#e4e1e1] text-black mt-2 rounded-sm shadow-xl/20
             ">
              Ingen visning idag
            </p>
          )}
        </section>
      </div>

      {/* Other dates */}
      <div className="other-days-container flex flex-col justify-center items-center w-full
       md:mt-2 
       ">
        <h2
          className="text-[#e4e1e1] mt-2 text-sm 
       md:text-lg
       lg:text-lg lg:p-2
       lg:w-full lg:mt-1 lg:pb-1 
       xl:p-0 "
        >
          Andra visningar
        </h2>
        <section
          className="Otherdays flex flex-col justify-start items-center mt-1 w-11/12 rounded-md
          md:w-11/12  md:mb-7
          lg:justify-center lg:gap-2 lg:w-full lg:m-0
          xl:w-full  xl:flex-row xl:justify-start xl:items-start xl:grid xl:grid-cols-2 xl:mt-2
        "
        >
          {otherDaysScrenning.length > 0 ? (
            otherDaysScrenning.slice(0).map((date) => (
              <div
                key={date}
                className="flex flex-col justify-center items-center underline w-56
                lg:w-full lg:m-0 lg:p-0
                
                "
              >
                <h3
                  className="text-sm
                  md:text-base"
                >
                  {new Date(date).toLocaleDateString("sv-SE", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </h3>

                <div
                  className="w-full flex flex-col justify-center items-center 
                  sm:w-11/12 sm:mb-2 
                   md:mt-2 md:mb-2 lg:grid lg:grid-cols-1
                   lg:h-auto lg:justify-center xl:grid xl:grid-col-2
                  "
                >
                  {sortScreeningByDate[date].map((screening) => (
                    <ul
                      onClick={() => {
                        setActive(screening._id);
                        onSelectTheaterId(screening.auditorium._id);
                        onSelectShowing(screening._id);
                      }}
                      className={`container_box calenderDatesContainer min-w-36 cursor-pointer w-9/12 h-15 flex flex-col justify-center items-center
                          sm:w-11/12 sm:h-15
                          md:w-11/12 md:h-12 md:text-xs
                          lg:w-11/12 lg:h-20
                          xl:w-10/12 xl:h-20 xl:mt-1 
                          
                          
                          ${active === screening._id
                          ? "!border-4 !border-[#07ca00]"
                          : ""
                        }`}
                    >
                      <li
                        className="pt-1 text-sm font-bold
                    lg:text-base"
                      >
                        {screening.time.slice(0, 5)}  {/*Getting rid of the seconds area when fetching screening time*/}
                      </li>
                      <li
                        className="pb-1 px-1 text-xs 
                    lg:text-sm"
                      >
                        {screening.auditorium.name}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>Inga andra visningar</p>
          )}
        </section>
      </div>
    </main>
  );
}
