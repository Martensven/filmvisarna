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
    (date) => date !== today
  );

  return (
    <main
      className="Container-for-days w-full h-full flex flex-col justify-center items-center"
    >
      {/*----------Containers for calender days----------*/}
      <div className="todays-container flex flex-col justify-center items-center mt-2 h-auto
      lg:w-6/12">
        <h2
          className="text-[#e4e1e1] text-base
        md:text-lg md:p-2
        lg:w-10/12 lg:p-2 lg:h-10"
        >
          Dagens visningar
        </h2>
        <section
          className="Todays flex flex-row justify-start items-start w-11/12 h-20 rounded-md          
          overflow-y-hidden overflow-x-auto
          [&::-webkit-scrollbar]:h-1  
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-[#24252C]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#cdd3fe24]

          md:w-full md:place-items-center 
          lg:flex lg:flex-row lg:justify-start lg:h-52 lg:w-11/12 lg:px-1 lg:p-1
          xl:w-7/12 xl:h-40"
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
                className={`calenderDatesContainer container_box bg-[#e4e1e1] w-full h-auto shadow-xl/20"> 
                md:w-4/5 md:h-30 md:text-xs cursor-pointer
                lg:w-11/12 lg:h-22 lg:flex lg:flex-col lg:justify-between lg:items-center
          ${active === screening._id ? "!border-4 !border-[#07ca00]" : ""}`}
              >
                <li
                  className="pt-1 pb-1 text-base font-bold 
              lg:text-base lg:px-2 lg:py-2"
                >
                  {screening.time}
                </li>
                <li
                  className="px-1 pb-1 text-xs 
              md:text-md
              lg:px-1 lg:py-1"
                >
                  {screening.auditorium.name}
                </li>
              </ul>
            ))
          ) : (
            <p className="flex justify-center items-center bg-[#e4e1e1] text-black w-50 h-10 mt-2 rounded-sm shadow-xl/20
            lg:w-50 lg:h-20">
              Ingen visning idag
            </p>
          )}
        </section>
      </div>

      {/* Other dates */}
      <div className="other-days-container flex flex-col justify-center items-center h-auto
      lg:w-6/12 lg:">
        <h2
          className="text-[#e4e1e1] mt-2 text-base 
       md:text-lg
       lg:text-lg lg:p-2
       lg:w-full 
       xl:p-2 "
        >
          Andra visningar
        </h2>
        <section
          className="Otherdays flex flex-col  justify-start items-start mt-1 w-11/12 h-42 rounded-md
          overflow-y-auto overflow-x-hidden
          [&::-webkit-scrollbar]:w-1  
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-[#24252C]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#cdd3fe24]

          sm:w-11/12
          md:w-full md:h-auto
          lg:flex lg:flex-row lg:justify-center lg:items-center lg:gap-3 lg:w-8/12 lg:h-49 lg:m-0
          xl:w-10/12 xl:h-40 xl:flex-row xl:justify-start xl:items-center
        "
        >
          {otherDaysScrenning.length > 0 ? (
            otherDaysScrenning.slice(0, 3).map((date) => (
              <div
                key={date}
                className="flex flex-col justify-center items-center underline w-full
                lg:w-full lg:gap-1 lg:m-0 lg:p-0
                xl:w-full xl:flew-row xl:justify-start
                "
              >
                <h3
                  className="text-sm w-full
              xl:p-0 xl:w-11/12"
                >
                  {new Date(date).toLocaleDateString("sv-SE", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </h3>

                <div
                  className="w-full flex flex-col justify-center items-center grid grid-cols-2
                  sm:w-11/12
                  lg:w-11/12 lg:h-auto lg:flex lg:flex-row lg:justify-start lg:items-center
                  xl:w-11/12"
                >
                  {sortScreeningByDate[date].map((screening) => (
                    <ul
                      onClick={() => {
                        setActive(screening._id);
                        onSelectTheaterId(screening.auditorium._id);
                        onSelectShowing(screening._id);
                      }}
                      className={`container_box calenderDatesContainer cursor-pointer w-11/12 h-15 flex flex-col justify-center items-center
                          sm:w-6/12
                          md:w-20 md:h-32 md:text-xs
                          lg:w-5/12 lg:h-25 lg:p-2 lg:flex lg:flex-col lg:justify-center
                          xl:w-5/12 xl:h-20 xl:mt-1
                          
                          
                          ${
                            active === screening._id
                              ? "!border-4 !border-[#07ca00]"
                              : ""
                          }`}
                    >
                      <li
                        className="pt-1 text-sm font-bold
                    lg:text-base"
                      >
                        {screening.time}
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
