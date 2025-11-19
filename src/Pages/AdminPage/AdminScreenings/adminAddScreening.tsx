import { useEffect, useState } from "react";
import Toast from "../../../toast/toast";

type Movie = { _id: string; title: string; themes?: { themeDesc?: string; weekDay?: string }  };
type Auditorium = { _id: string; name: string };

export default function AdminAddScreening() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieId, setMovieId] = useState("");
  const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);
  const [salonName, setSalonName] = useState("");
  const [date, setDate] = useState("");
  const [freeTimes, setFreeTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [movieTheme, setMovieTheme] = useState<string>("");

  // toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMovies = await fetch("/api/movie");
        setMovies(await resMovies.json());

        const resAud = await fetch("/api/admin/auditoriums");
        setAuditoriums(await resAud.json());
      } catch (err) {
        console.error("Fel vid hämtning:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!movieId) {
      setMovieTheme("");
      setSalonName("");
      setDate("");
      return;
    }
    const movie = movies.find((m) => m._id === movieId);
    const theme = movie?.themes?.themeDesc?.toLowerCase() || "";
    setMovieTheme(theme);

    if (theme.startsWith("tysta torsdagen")) {
      setSalonName("Lilla Salongen");
      setDate(getNextDate("thursday"));
    } else if (theme.startsWith("svenska söndagen")) {
      setSalonName("Lilla Salongen");
      setDate(getNextDate("sunday"));
    } else {
      setSalonName("");
      setDate("");
    }
  }, [movieId, movies]);

  useEffect(() => {
    if (!date || !salonName) {
      setFreeTimes([]);
      setSelectedTime("");
      return;
    }

    const fetchSchedule = async () => {
      try {
        const res = await fetch(
          `/api/admin/schedule?date=${date}&theaterName=${encodeURIComponent(
            salonName
          )}`
        );
        if (!res.ok) {
          setFreeTimes([]);
          return;
        }
        const data = await res.json();
        setFreeTimes(data.freeTimes);
        setSelectedTime("");
      } catch (err) {
        console.error("Fel vid hämtning av tider:", err);
        setFreeTimes([]);
      }
    };

    fetchSchedule();
  }, [date, salonName]);

  const handleSave = async () => {
    if (!movieId || !date || !salonName || !selectedTime) return;

    try {
      const scheduleType =
        salonName === "Lilla Salongen" ? "smallTheater" : "bigTheater";

      const res = await fetch("/api/admin/screenings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          date,
          time: selectedTime,
          salonName,
          scheduleType,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setToastType("error");
        setToastMessage(errData.error || "Fel vid skapande av visning");
        return;
      }

      setToastType("success");
      setToastMessage("Visning skapad!");

      setTimeout(() => {
        location.href = "/admin/screenings";
      }, 3000);
    } catch (err) {
      setToastType("error");
      setToastMessage("Serverfel vid skapande av visning");
    }
  };

  const getNextDate = (weekday: string) => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const now = new Date();
    const targetDay = days.indexOf(weekday);
    const diff = (targetDay + 7 - now.getDay()) % 7 || 7;
    const next = new Date(now);
    next.setDate(now.getDate() + diff);
    return next.toISOString().split("T")[0];
  };

  return (
    <div className="p-6 bg-[#243365] text-white w-full md:rounded-xl min-h-[70vh] flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Skapa visning</h1>

      <label className="flex flex-col">
        Film:
        <select
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="p-2 rounded-md mt-1 bg-white text-black border border-gray-300"
        >
          <option value="">-- välj film --</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id}>
              {m.title} | {m.themes?.weekDay || "Ingen tema"}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        Datum:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 rounded-md mt-1 bg-white text-black border border-gray-300"
        />
      </label>

      <label className="flex flex-col">
        Salong:
        <select
          value={salonName}
          onChange={(e) => setSalonName(e.target.value)}
          className="p-2 rounded-md mt-1 bg-white text-black border border-gray-300"
        >
          <option value="">-- välj salong --</option>
          {auditoriums.map((a) => (
            <option key={a._id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      </label>

      {freeTimes.length > 0 ? (
        <label className="flex flex-col">
          Tid:
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="p-2 rounded-md mt-1 bg-white text-black border border-gray-300"
          >
            <option value="">-- välj tid --</option>
            {freeTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      ) : date && salonName ? (
        <p>Inga tider tillgängliga</p>
      ) : null}

      <button
        onClick={handleSave}
        disabled={!movieId || !date || !salonName || !selectedTime}
        className="bg-green-500 p-2 rounded-md disabled:bg-gray-500 cursor-pointer"
      >
        Spara
      </button>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
}
