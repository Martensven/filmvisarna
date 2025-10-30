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

export default function CalenderComponent({ onSelectTheaterId, onSelectShowing }: Props) {
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
    <main className="Container-for-daysandseats h-auto flex flex-col justify-center items-center 
    md:w-11/12
    lg:w-11/12 lg:flex lg:flex-row lg:justify-between lg:items-start lg:my-2 lg:mx-1 lg:gap-1">
      {/*----------Containers for calender days----------*/}
      
        
      <section
        className="Todays flex flex-col justify-center items-center glass_effect w-full mb-1 overflow-x-hidden overflow-y-auto
        [&::-webkit-scrollbar]:w-1  
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-[#24252C]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-[#cdd3fe24]
        md:w-full md:place-items-center 
        lg:flex lg:flex-col lg:justify-start lg:h-52 lg:w-5/12 lg:px-1 lg:p-1
        xl:w-5/12 xl:h-56"
      >
        <h2 className="text-[#e4e1e1] p-1 
        md:text-lg md:p-2
        lg:w-full lg:p-2">Dagens visningar</h2>
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
              className={`container_box calenderDatesContainer w-10/12 
                md:w-4/5 md:h-30 md:text-xs cursor-pointer
                lg:w-11/12 lg:h-30 lg:flex lg:justify-between lg:items-center
          ${active === screening._id ? "!border-4 !border-[#07ca00]" : ""}`}
            >
              <li className="pt-3 pb-3 text-lg font-bold 
              lg:text-base lg:px-2 lg:py-2">{screening.time}</li>
              <li className="pb-1 text-sm md:text-md
              lg:px-2 lg:py-2">
                {screening.auditorium.name}
              </li>
            </ul>
          ))
        ) : (
          <p className="flex justify-center items-center bg-[#e4e1e1] text-black  w-50 h-30 m-5 rounded shadow-xl/20">Ingen visning idag</p>
        )}
      </section>

      {/* Other dates */}

       
      <section
        className="Otherdays flex flex-row justify-start items-start glass_effect m-1 w-100 h-auto overflow-y-auto
        [&::-webkit-scrollbar]:w-1  
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-[#24252C]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-[#cdd3fe24]
        sm:w-11/12
        md:w-full md:h-auto
        lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:items-center lg:gap-1 lg:w-11/12 lg:h-61 lg:m-0
        xl:w-6/12 xl:h-56
        "
      >
       <h2 className="text-[#e4e1e1] p-5 
       md:text-lg
       lg:text-lg lg:p-2
      lg:w-full 
      xl:p-2 ">Andra visningar</h2>
        {otherDaysScrenning.length > 0 ? (
          otherDaysScrenning.map((date) => (
            <div key={date} className="flex flex-col justify-center items-center m-5 underline 
            lg:w-full lg:gap-1 lg:m-0 lg:p-0
            ">
              <h3 className="p-2
              xl:p-0">
                {new Date(date).toLocaleDateString("sv-SE", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                })}
              </h3>

              <div className="lg:w-11/12 lg:h-auto lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:items-center">
                {sortScreeningByDate[date].map((screening) => (
                  <ul
                    onClick={() => {
                      setActive(screening._id);
                      onSelectTheaterId(screening.auditorium._id);
                      onSelectShowing(screening._id);
                    }}
                    className={`container_box calenderDatesContainer cursor-pointer 
                          sm:w-32
                          md:w-20 md:h-32 md:text-xs
                          lg:w-5/12 lg:h-25 lg:p-2 lg:flex lg:flex-col lg:justify-center
                          xl:w-5/12 xl:h-20 xl:mt-1
                          
                          
                          ${active === screening._id ? "!border-4 !border-[#07ca00]" : ""}`}
                  >
                    <li className="
                    lg:text-base">{screening.time}</li>
                    <li className="
                    lg:text-sm">{screening.auditorium.name}</li>
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

