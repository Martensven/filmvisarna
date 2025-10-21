import { useParams } from "react-router";
import "../BookingPageStyle.css";
import { useState, useEffect } from "react";
//Component contains todays showing and other dates. This ones are going to be clickable

interface Props {
  // movieId: string;
  onSelectTheater: (theater: string) => void;
}
interface screening {
  movie: { title: string };
  _id: string;
  auditorium: { name: string };
  date: string;
  time: string;
}

export default function CalenderComponent({ onSelectTheater }: Props) {
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
        console.log("Hämtad data: ", data);
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
    <main className="h-auto flex flex-col justify-center items-center md:w-11/12">
      {/*----------Containers for calender days----------*/}
      <h2 className="text-[#e4e1e1] p-1 md:text-lg md:p-2">Dagens visningar</h2>
      <section
        className="flex flex-col justify-center items-center glass_effect w-full mb-1 overflow-x-auto overflow-y-hidden
         md:w-full md:place-items-center lg:h-auto lg:w-5/8"
      >
        {todaysScreening.length > 0 ? (
          todaysScreening.map((screening) => (
            <ul
              // Setting active state to mark selected calender date and onSelectTheater to get the selected theater
              // This will be used dynamically later on
              key={screening._id}
              onClick={() => {
                setActive(screening._id);
                onSelectTheater("Stora Salongen");
              }}
              className={`container_box calenderDatesContainer w-36 md:w-4/5 md:h-30 md:text-xs cursor-pointer
          ${active === screening._id ? "!border-4 !border-[#07ca00]" : ""}`}
            >
              <li className="pt-3 pb-3 text-lg font-bold">{screening.time}</li>
              <li className="pb-1 text-sm md:text-md">
                {screening.auditorium.name}
              </li>
            </ul>
          ))
        ) : (
          <p className="flex justify-center items-center bg-[#e4e1e1] text-black  w-50 h-30 m-5 rounded shadow-xl/20">Ingen visning idag</p>
        )}
      </section>

      {/* Other dates */}

      <h2 className="text-[#e4e1e1] p-5 md:text-lg">Andra visningar</h2>
      <section
        className="flex flex-row justify-start items-start glass_effect m-1 w-100 h-auto overflow-x-auto overflow-y-hidden
        sm:w-11/12
        md:w-full md:h-auto
        lg:h-auto lg:m-2 "
      >
        {otherDaysScrenning.length > 0 ? (
          otherDaysScrenning.map((date) => (
            <div key={date} className="flex flex-col justify-center items-center m-5 ">
              <h3 className="p-2">
                {new Date(date).toLocaleDateString("sv-SE", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                })}
              </h3>

              <div className="">
                {sortScreeningByDate[date].map((screening) => (
                  <ul
                    onClick={() => {
                      setActive(screening._id);
                      onSelectTheater("Stora Salongen");
                    }}
                    className={`container_box calenderDatesContainer w-24 
                          sm:w-32
                          md:w-20 md:h-32 md:text-xs
                          cursor-pointer
                          ${active === screening._id ? "!border-4 !border-[#07ca00]" : ""}`}
                  >
                    <li className="">{screening.time}</li>
                    <li className="">{screening.auditorium.name}</li>
                  </ul>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Inga andra visningar</p>
        )}
      </section>
    </main>
  );
}

