import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Slideshow from "../../Components/themepageSlideshow/slideshowComponent.tsx";
import "../BookingPage/BookingPageStyle.css";
import "../../index.css";
import { useAuth } from "../../../src/context/authContext.tsx";

type Theme = {
  _id: string;
  themeDesc: string;
  weekDay: string;
}

export default function FrontPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [scheduledType, setScheduledType] = useState<string>("");
  const { user } = useAuth();

  const [movie, setMovie] = useState<any[]>([]); // State to hold fetched movies
  const [sunTheme, setSunTheme] = useState<Theme>();
  const [thuTheme, setThuTheme] = useState<Theme>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  const location = useLocation();

  // fetch movies from backend
  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/movie", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Serverfel: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setMovie(data);
    } catch (error: any) {
      console.error("Error fetching movies:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchThemes = async () => {
    try {
      const responseSun = await fetch(`api/theme/68ecd4f7dcb8359901cf3761`, {
        method: "GET",
        headers: {
          "Conent-Type": "application/json",
        }
      });

      const responseThu = await fetch(`/api/theme/68ecd482dcb8359901cf375f`, {
        method: "GET",
        headers: {
          "Conent-Type": "application/json",
        }
      });

      if (!responseSun.ok || !responseThu.ok) {
        throw new Error(`Serverfel: ${responseSun.status}, ${responseThu.status}`);
      }

      const thuData = await responseThu.json();
      const sunData = await responseSun.json();

      setThuTheme(thuData);
      setSunTheme(sunData);
    } catch (error: any) {
      console.error('Error fetching themes', error);
    }
  };


  const filterMovies = async () => {
    try {
      setLoading(true);

      //create query parameters based on selected filters
      const params = new URLSearchParams();

      // Genres
      if (selectedGenres.length > 0) {
        selectedGenres.forEach((genre) => params.append("genre", genre));
      }

      // Age Limits
      if (selectedAges.length > 0) {
        selectedAges.forEach((age) =>
          params.append("ageLimit", age.toString())
        );
      }

      // Screening filters
      if (selectedDate) params.append("screeningDate", selectedDate);
      if (scheduledType) params.append("scheduleType", scheduledType);

      const queryString = params.toString();
      const url = queryString
        ? `/api/movie/filter?${queryString}`
        : "/api/movie/filter";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Serverfel: ${response.status}`);
      }

      const data = await response.json();
      setMovie(data);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching filtered movies:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchThemes();
  }, []);

  useEffect(() => {
    if (
      selectedGenres.length === 0 &&
      selectedAges.length === 0 &&
      !selectedDate &&
      !scheduledType
    ) {
      fetchMovies();
    } else {
      filterMovies();
    }
  }, [selectedGenres, selectedAges, selectedDate, scheduledType]);

  useEffect(() => {
    if (loading) return; // don't scroll until data is ready

    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location, loading]);

  // Sort based on selected option. (A-Z, Z-A, Newest)
  const sortedMovies = [...movie].sort((a, b) => {
    if (sortOption === "atoz") return a.title.localeCompare(b.title);
    if (sortOption === "ztoa") return b.title.localeCompare(a.title);
    if (sortOption === "newest") return b.releaseYear - a.releaseYear;
    if (sortOption === "oldest") return a.releaseYear - b.releaseYear;
    return 0;
  });

  // Handle genre checkbox
  const handleGenreChange = (genre: string) => {
    setSelectedGenres(
      (prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre) // remove if already selected
          : [...prev, genre] // add if not selected
    );
  };

  // Handle age checkbox
  const handleAgeChange = (age: number) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  // Age options for filtering
  const ageOptions = [
    { label: "Film utan åldersgräns (Barntillåten)", value: 0 },
    { label: "7 år (0 år i vuxet sällskap)", value: 7 },
    { label: "11 år (7 år i vuxet sällskap)", value: 11 },
    { label: "15 år (11 år i vuxet sällskap)", value: 15 },
  ];

  return (
    <main className="w-screen flex flex-col items-center min-h-screen mt-14">
      <h1
        className="text-center text-lg mb-4 w-11/12
        sm:text-xl
        md:text-2xl"
      >
        {user ? (
          <>
            Hej, {" "}
            <span className="text-green-600 font-bold">
              {user.firstName}
            </span>!
            <br />
            Välkommen till Filmvisarna!
          </>
        ) : (
          "Välkommen till Filmvisarna!"
        )}
      </h1>
      <p
        className="text-center text-sm mb-10 w-11/12
            sm:text-base
            md:text-base"
      >
        Här kan du se filmer som verkligen tar dig bakåt i tiden. Vi erbjuder
        filmer från 1910 talet fram till början på 2000 talet. Är detta något
        för dig se då till att se dig runt bland våra filmer och boka en tid
        som passar dig!
      </p>



      {/* Filter & Sort */}
      <section className="w-11/12 mb-5 rounded-md shadow-md flex flex-col sm:flex-row  justify-center items-center relative glass_effect text-white ">
        <section className="flex flex-row w-1/2 justify-around items-center sm:w-full">
          {/* Filter */}
          <nav className="relative ">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-2 py-1 cursor-pointer
                        sm:text-lg 
                        md:text-lg"
            >
              Filter &darr;
            </button>
            {filterOpen && (
              <div
                className="flex flex-row flex-wrap justify-center items-center 
                        absolute -left-14 mt-5 bg-[#292929] shadow-md rounded p-5 w-72
                        sm:w-86 sm:mt-1 z-50
                        lg:max-h-[80vh]
                        
                        "
              >
                {/* Genres */}
                {[
                  "Action",
                  "Drama",
                  "Komedi",
                  "Skräck",
                  "Äventyr",
                  "Thriller",
                  "Mystik",
                ].map((genre) => (
                  <label
                    key={genre}
                    className="flex items-center gap-2 px-2 py-1 mt-1 mb-2 w-30 h-8 text-sm
                                hover:underline
                                sm:text-base
                                md:text-base"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                    />
                    {genre}
                  </label>
                ))}
                {/* Age Limits */}
                {ageOptions.map((age) => (
                  <label
                    key={age.value}
                    className="flex items-center gap-2 px-2 py-1 mt-2 text-sm text-left
                                sm:text-base
                                md:text-base"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAges.includes(age.value)}
                      onChange={() => handleAgeChange(age.value)}
                    />
                    {age.label}
                  </label>
                ))}
              </div>
            )}
          </nav>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="px-2 py-1 cursor-pointer
                        sm:text-base
                        md:text-lg"
            >
              Sortera &darr;
            </button>
            {sortOpen && (
              <ul className="absolute mt-2 bg-[#292929] rounded shadow p-2 -right-9 w-72">
                <li
                  className="px-2 py-1 hover:bg-gray-100 hover:text-black cursor-pointer"
                  onClick={() => {
                    setSortOption("atoz");
                    setSortOpen(false);
                  }}
                >
                  A–Ö
                </li>
                <li
                  className="px-2 py-1 hover:bg-gray-100 hover:text-black cursor-pointer"
                  onClick={() => {
                    setSortOption("ztoa");
                    setSortOpen(false);
                  }}
                >
                  Ö–A
                </li>
                <li
                  className="px-2 py-1 hover:bg-gray-100 hover:text-black cursor-pointer"
                  onClick={() => {
                    setSortOption("newest");
                    setSortOpen(false);
                  }}
                >
                  Nyast först
                </li>
                <li
                  className="px-2 py-1 hover:bg-gray-100 hover:text-black cursor-pointer"
                  onClick={() => {
                    setSortOption("oldest");
                    setSortOpen(false);
                  }}
                >
                  Äldst först
                </li>
              </ul>
            )}
          </div>
        </section>


        <section className="flex w-full">
          {/* Screening Date */}
          <div className="search-date-box px-2 py-2 
        w-11/12
        sm:w-1/2
        flex
        flex-col
      ">
            <label className="block text-sm mb-1">Datum:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full h-7 bg-white text-sm text-black rounded px-1 py-1 mb-3 "
            />
          </div>


          {/* Schedule Type */}
          <div className="search-hall-box px-2 py-2 w-11/12
        sm:w-1/2
        flex
        flex-col
        ">
            <label className="block text-sm mb-1">Salong:</label>
            <select
              value={scheduledType}
              onChange={(e) => setScheduledType(e.target.value)}
              className="w-full bg-white text-black text-sm rounded px-2 py-1 mb-3 focus:outline-none focus:ring-2 focus:ring-[#24252C]"
            >
              <option value="">Alla salonger</option>
              <option value="smallTheater">Lilla Salongen</option>
              <option value="bigTheater">Stora Salongen</option>
            </select>
          </div>
        </section>
      </section>



      {/* Movies container*/}
      <section
        className="
    h-96 w-11/12 mx-5
    flex flex-row overflow-x-auto overflow-y-hidden
    [&::-webkit-scrollbar]:h-2  
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-[#24252C]
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-[#cdd3fe24]
    snap-x snap-mandatory text-white

    

    lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:h-auto
    xl:h-auto xl:p-2 xl:grid xl:grid-cols-4  
    xl:w-8/12

  ">
        {sortedMovies.length === 0 ? (
          <p className="m-auto">Inga filmer hittades.</p>
        ) : (
          sortedMovies.map((movie) => (
            <article
              key={movie._id}
              className="flex justify-center items-center h-auto min-w-56 snap-center m-3 p-5
                            lg:h-auto lg:hover:scale-105
                            xl:h-auto xl:mt-10"
            >
              <Link
                to={`/movie/${movie._id}`}
                className="flex flex-col items-center justify-start h-auto
                            sm:h-auto m-0
                            lg:h-auto"
              >
                <img
                  src={movie.imageSrc}
                  alt={movie.title}
                  className="shadow-2xl w-auto h-4/5 object-cover rounded-md p-0 "
                />
                <p
                  className="mt-2
                             text-sm
                                lg:m-0
                                lg:text-md
                                xl:text-lg
                                2xl:text-xl"
                >
                  {movie.title}
                </p>

                <p
                  className="text-sm
                             lg:m-0
                             lg:text-md
                             xl:text-lg
                             2xl:text-xl"
                >
                  {Array.isArray(movie.genres)
                    ? movie.genres
                      .map((genre: { title: string }) => genre.title)
                      .join(", ")
                    : movie.genres.title}
                </p>
              </Link>
            </article>
          ))
        )}

      </section>

      {/* Theme days container*/}
      <section
        className="flex flex-col justify-center items-center w-11/12 mt-2
             md:flex md:flex-col "
      >
        <h2 className="w-full glass_effect py-5 rounded-md shadow-md text-lg flex justify-center items-center">
          Temadagar
        </h2>

        <article className="min-h-96 max-w-9/12 my-5 justify-center items-center flex flex-col text-white" id="thuTheme
        ">
          <h2
            className="text-center text-xl uppercase font-bold my-2 px-20 py-5 
                     lg:underline"
          >
            {thuTheme?.weekDay}
          </h2>
          <section
            className="flex flex-col justify-center items-center 
                    sm:flex-col 
                    md:flex-row 
                    lg:flex-row "
          >
            <Slideshow day="thursday" />
            <p
              className="flex flex-col justify-center items-center w-11/12 text-center md:px-20 py-20 
                         lg:h-80 shadow-md rounded-md"
            >{thuTheme?.themeDesc}</p>
          </section>
        </article>

        <article className="min-h-96 max-w-9/12 justify-center items-center flex  flex-col text-white" id="sunTheme">
          <h2
            className="text-center text-xl uppercase font-bold my-2 px-20 py-5 
                     lg:underline"
          >
            {sunTheme?.weekDay}
          </h2>
          <section
            className="flex flex-col justify-center items-center 
                    sm:flex-col
                    md:flex-row-reverse  
                    lg:flex-row-reverse "
          >
            <Slideshow day="sunday" />
            <p
              className="flex flex-col justify-center items-center w-11/12 text-center md:px-20 py-20 
                         lg:h-80 rounded-md shadow-md"
            >{sunTheme?.themeDesc}</p>
          </section>
        </article>
      </section>
    </main>
  );
}
