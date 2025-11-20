import { useParams } from "react-router";
import "../BookingPageStyle.css";
import { useState, useEffect } from "react";
//Component contains todays showing and other dates. This ones are going to be clickable

interface Props {
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
        const response = await fetch(`/api/screenings/movie/${id}`);

        if (!response.ok) {
          throw new Error(`Kan inte hämta data: ${response.status}`);
        }

        const data = await response.json();
        setScreenings(data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreeningTimes();
  }, [id]);

  // Group up in date categories
  const sortScreeningByDate = screenings.reduce((acc, s) => {
    // Create a localKey without time to group by date only
    const d = new Date(s.date);
    const localKey = d.toISOString().split("T")[0];

    if (!acc[localKey]) acc[localKey] = [];
    acc[localKey].push(s);

    return acc;
  }, {} as Record<string, screening[]>);

  const today = new Date().toISOString().split("T")[0];
  const now = new Date();

  // Future or today (date-wise)
  const futureOrTodayDates = Object.keys(sortScreeningByDate)
    .filter((date) => new Date(date) >= new Date(today))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Remove screenings earlier than current time
  const todaysScreening = (sortScreeningByDate[today] ?? []).filter((s) => {
    // Combine date and time to compare with now
    const screeningDateTime = new Date(`${s.date}T${s.time}`);
    // Only keep screenings later than now
    return screeningDateTime >= now;
  });
  // Other days than today
  const otherDaysScrenning = futureOrTodayDates.filter((d) => d !== today);

  // Dropdown list of extra dates (AFTER the first 4)
  const extraScreenings: screening[] = otherDaysScrenning
    .slice(4)
    .flatMap((date) =>
      sortScreeningByDate[date]
        .slice()
        .sort((a, b) => {
          const [ax, ay] = a.time.split(":").map(Number);
          const [bx, by] = b.time.split(":").map(Number);
          return ax * 60 + ay - (bx * 60 + by);
        })
    );

  // Auto-select first available screening
  useEffect(() => {
    if (active) return;

    let firstAvailable: screening | undefined;

    if (todaysScreening.length > 0) {
      firstAvailable = [...todaysScreening].sort((a, b) => {
        const [ax, ay] = a.time.split(":").map(Number);
        const [bx, by] = b.time.split(":").map(Number);
        return ax * 60 + ay - (bx * 60 + by);
      })[0];
    } else if (otherDaysScrenning.length > 0) {
      const firstDate = otherDaysScrenning[0];
      firstAvailable = [...sortScreeningByDate[firstDate]].sort((a, b) => {
      
        const [ax, ay] = a.time.split(":").map(Number);
        const [bx, by] = b.time.split(":").map(Number);
        return ax * 60 + ay - (bx * 60 + by);
      })[0];
    }

    if (firstAvailable) {
      setActive(firstAvailable._id);
      onSelectTheaterId(firstAvailable.auditorium._id);
      onSelectShowing(firstAvailable._id);
    }
  }, [
    active,
    todaysScreening,
    otherDaysScrenning,
    sortScreeningByDate,
    onSelectTheaterId,
    onSelectShowing,
  ]);

  if (loading) return <p>Laddar data…</p>;
  if (!screenings) return <p>Ingen filmdata hämtad</p>;

  return (
    <main
      className="Container-for-days w-7/12 flex flex-col justify-center items-center
      md:w-full lg:w-6/12 xl:w-8/12"
    >
      {/* Todays screenings */}
      <div className="todays-container flex flex-col items-center mt-2 w-full md:w-11/12">
        <h2 className="text-[#e4e1e1] text-sm md:text-lg">Dagens visningar</h2>

        <section className="Todays flex flex-col items-center w-11/12 rounded-md md:flex-row md:w-5/12 lg:w-10/12 xl:w-7/12">
          {todaysScreening.length > 0 ? (
            todaysScreening.map((screening) => (
              <ul
                key={screening._id}
                onClick={() => {
                  setActive(screening._id);
                  onSelectTheaterId(screening.auditorium._id);
                  onSelectShowing(screening._id);
                }}
                className={`calenderDatesContainer container_box bg-[#e4e1e1] w-9/12 h-auto cursor-pointer mb-2
                ${active === screening._id ? "!border-4 !border-[#07ca00]" : ""}`}
              >
                <li className="pt-1 pb-1 text-base font-bold">
                  {screening.time}
                </li>
                <li className="px-1 pb-1 text-xs">{screening.auditorium.name}</li>
              </ul>
            ))
          ) : (
            <p className="flex h-20 px-2 items-center bg-[#e4e1e1] text-black mt-2 rounded-sm">
              Ingen visning idag
            </p>
          )}
        </section>
      </div>

      {/* Other screenings */}
      <div className="other-days-container flex flex-col items-center w-full md:mt-2">
        <h2 className="text-[#e4e1e1] mt-2 text-sm md:text-lg">
          Andra visningar
        </h2>

        <section
          className="Otherdays flex flex-col items-center mt-1 w-11/12 rounded-md
          md:w-11/12 lg:gap-2 lg:w-full xl:grid xl:grid-cols-2 xl:mt-2"
        >
          {otherDaysScrenning.length > 0 ? (
            otherDaysScrenning.slice(0, 4).map((date) => (
              <div key={date} className="flex flex-col items-center underline w-56 lg:w-full">
                <h3 className="text-sm md:text-base">
                  {new Date(date).toLocaleDateString("sv-SE", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </h3>

                <div className="w-full flex flex-col items-center md:mt-2 lg:grid lg:grid-cols-1">
                  {sortScreeningByDate[date]
                    .slice()
                    .sort((a, b) => {
                      const [ax, ay] = a.time.split(":").map(Number);
                      const [bx, by] = b.time.split(":").map(Number);
                      return ax * 60 + ay - (bx * 60 + by);
                    })
                    .map((screening) => (
                      <ul
                        key={screening._id}
                        onClick={() => {
                          setActive(screening._id);
                          onSelectTheaterId(screening.auditorium._id);
                          onSelectShowing(screening._id);
                        }}
                        className={`container_box calenderDatesContainer min-w-36 cursor-pointer w-9/12 flex flex-col items-center
                          ${
                            active === screening._id
                              ? "!border-4 !border-[#07ca00]"
                              : ""
                          }`}
                      >
                        <li className="pt-1 text-sm font-bold">
                          {screening.time.slice(0, 5)}
                        </li>
                        <li className="pb-1 px-1 text-xs">{screening.auditorium.name}</li>
                      </ul>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p>Inga andra visningar</p>
          )}
        </section>

        {/* Dropdown for the extra screenings */}
        {extraScreenings.length > 0 && (
          <select
            className={`mt-2 mb-5 p-2 rounded-md bg-[#e4e1e1] text-black
            ${extraScreenings.some((s) => s._id === active) ? "border-4 border-[#07ca00]" : ""}`}
            onChange={(e) => {
              const selected = screenings.find((s) => s._id === e.target.value);
              if (selected) {
                setActive(selected._id);
                onSelectTheaterId(selected.auditorium._id);
                onSelectShowing(selected._id);
              }
            }}
            value={extraScreenings.some((s) => s._id === active) ? active! : ""}
          >
            <option value="">Fler visningar…</option>

            {extraScreenings.map((screening) => (
              <option key={screening._id} value={screening._id}>
                {new Date(screening.date).toLocaleDateString("sv-SE", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                })}{" "}
                {screening.time.slice(0, 5)} – {screening.auditorium.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </main>
  );
}
