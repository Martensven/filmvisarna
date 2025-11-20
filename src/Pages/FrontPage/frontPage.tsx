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
};

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
  const setError = useState<string | null>(null)[1];

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
        },
      });

      const responseThu = await fetch(`/api/theme/68ecd482dcb8359901cf375f`, {
        method: "GET",
        headers: {
          "Conent-Type": "application/json",
        },
      });

      if (!responseSun.ok || !responseThu.ok) {
        throw new Error(
          `Serverfel: ${responseSun.status}, ${responseThu.status}`
        );
      }

      const thuData = await responseThu.json();
      const sunData = await responseSun.json();

      setThuTheme(thuData);
      setSunTheme(sunData);
    } catch (error: any) {
      console.error("Error fetching themes", error);
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

      {/*Welcome sign with function calling the user if it is logged in. Or else just showing FILMVISARNA. */}
      <div className="welcome-sign w-10/12 h-50 mb-5
      sm:w-9/12
      md:w-8/12 md:mb-40
      lg:w-8/12 lg:mb-40">
        <div className="w-full border-t-2 border-b-2 border-[#737373] mt-2 
        lg:mt-3">
          <h1
            className="text-center text-base mt-1 mb-1 font-bold
        sm:text-xl
        md:text-2xl
        lg:text-2xl"
          >
            {user ? (
              <>
                VÄLKOMMEN TILL FILMVISARNA,{" "}
                <span className="text-black font-bold uppercase">
                  {user.firstName}!
                </span>
              </>
            ) : (
              "VÄLKOMMEN TILL FILMVISARNA!"
            )}
          </h1>
        </div>

        <div className="w-full border-b-2 border-[#737373]">
          <p
            className="text-center text-[10px] font-bold my-2 uppercase
            sm:text-base
            md:text-base
            lg:text-base"
          >
            Stort utbud av filmer från 1900-tal till 2000-tal.
          </p>
        </div>

        <div className="w-full border-b-2 border-[#737373] mt-1 mb-1
        lg:mb-3">
          <p className="mt-1 mb-1 font-bold text-sm uppercase
          lg:text-lg">
            &#9733;  Boka din bioupplevelse hos oss  &#9733;</p>
        </div>
      </div>


    <div className="Header-container-box w-10/12 mt-10 flex flex-col justify-center items-center">
        <h2 className="w-full stroked-text text-red-800 text-center text-3xl  uppercase font-extrabold my-6 px-2
        sm:text-4xl
        md:text-5xl
        lg:text-5xl
        xl:text-5xl
        ">Visas just nu</h2>
       

      {/* Filter & Sort */}
      <section className="w-10/12 h-auto p-2 flex flex-col sm:flex-row  justify-center items-center relative text-white ">
      
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
                        absolute bg-[#18203ad0] shadow-md rounded p-5 w-72
                        sm:w-86 mt-1 z-50
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
                    className="flex items-center gap-2 px-2 py-1  mb-2 w-30 h-8 text-sm
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
              <ul className="absolute bg-[#18203ad0] mt-1 rounded shadow w-40 lg:w-76">
                <li
                  className="px-2 py-1 hover:underline cursor-pointer"
                  onClick={() => {
                    setSortOption("atoz");
                    setSortOpen(false);
                  }}
                >
                  A–Ö
                </li>
                <li
                  className="px-2 py-1 hover:underline cursor-pointer"
                  onClick={() => {
                    setSortOption("ztoa");
                    setSortOpen(false);
                  }}
                >
                  Ö–A
                </li>
                <li
                  className="px-2 py-1 hover:underline cursor-pointer"
                  onClick={() => {
                    setSortOption("newest");
                    setSortOpen(false);
                  }}
                >
                  Nyast först
                </li>
                <li
                  className="px-2 py-1 hover:underline cursor-pointer"
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
          <div
            className="search-date-box px-2 py-2 
        w-11/12
        sm:w-1/2
        flex
        flex-col
      "
          >
            <label className="block text-sm mb-1">Datum:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full h-7 bg-white text-sm text-black rounded px-1 py-1 mb-3 "
            />
          </div>

          {/* Schedule Type */}
          <div
            className="search-hall-box px-2 py-2 w-11/12
        sm:w-1/2
        flex
        flex-col
        "
          >
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
      </div>

      {/* Movies container*/}
      <section
        className="
    h-96 w-11/12 mx-5 my-5
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

  "
      >
        {sortedMovies.length === 0 ? (
          <p className="m-auto">Inga filmer hittades.</p>
        ) : (
          sortedMovies.map((movie) => (
            <article
              key={movie._id}
              className="flex justify-center items-center h-auto min-w-56 snap-center m-2 p-5
                            lg:h-auto 
                            xl:h-auto"
            >
              <section
                className="flex flex-col items-center justify-start h-auto
                            sm:h-auto m-0
                            lg:h-auto"
              >
                <p
                  className="mt-2 
                             text-xs
                              flex items-center justify-center
                             h-12
                             md:h-14
                                lg:m-0 
                                lg:text-md
                                xl:text-lg
                                "
                >
                  {movie.title}
                </p>
                <img
                  src={movie.imageSrc}
                  alt={movie.title}
                  className="shadow-md w-auto  object-cover rounded-md p-0 
                  h-56
                  md:h-60
                  lg:h-64
                  xl:h-72
                  2xl:h-80"
                />

                <p
                  className="text-sm
                  h-16
                  flex items-center justify-center
                             lg:m-0
                             lg:text-md
                             xl:text-lg
                             "
                >
                  {Array.isArray(movie.genres)
                    ? movie.genres
                      .map((genre: { title: string }) => genre.title)
                      .join(", ")
                    : movie.genres.title}
                </p>
                <section className="mb-10">
                  <Link
                    to={`/movie/${movie._id}`}
                    className="cursor-pointer p-0 m-0"
                  >
                    <button className="main_buttons px-3 py-1 mr-2 cursor-pointer hover:scale-105 active:scale-95">
                      Info
                    </button>
                  </Link>
                  <Link to={`/booking/${movie._id}`} className="cursor-pointer">
                    <button className="main_buttons px-3 py-1 ml-2 cursor-pointer hover:scale-105 active:scale-95">
                      Boka
                    </button>
                  </Link>
                </section>
              </section>
            </article>
          ))
        )}
      </section>

      {/* Theme days container*/}
      <section
        className="flex flex-col justify-center items-center w-full mt-1
             md:flex md:flex-col md:mt-20
             lg:flex-col lg:h-auto "
      >
        <div className="Header-container-box w-10/12 mb-10 mt-20 flex justify-center items-center">
          <h2 className="stroked-text text-red-800 text-center text-2xl uppercase font-extrabold my-5 px-20
        sm:text-3xl
        md:text-4xl
        lg:text-5xl
        xl:text-5xl">
            Temadagar
          </h2>
        </div>


        <article
          className="min-h-96 w-8/12 my-5 popOut-box
        flex flex-col justify-center items-center text-white
        lg:mb-20 "
          id="thuTheme"
        >
          <h2
            className="stroked-text text-red-800 text-center text-3xl uppercase font-extrabold my-5 px-20
                     "
          >
            {thuTheme?.weekDay}
          </h2>
          <section
            className="flex flex-col justify-center items-center
                    sm:flex-col 
                    md:flex-col 
                    lg:flex-col lg:p-0"
          >
            <Slideshow day="thursday" />
            <div className=" w-10/12 flex flex-col justify-center items-center text-center my-10 mx-5 uppercase text-sm
            sm:text-base
            md:w-9/12 md:mb-20 md:mr-1 md:text-lg
            lg:mx-10 lg:w-8/12 lg:uppercase lg:text-xl lg:mb-20
            xl:text-2xl">
              <p
                className="flex flex-col justify-center items-center text-center  
               lg:"
              >
                under hela torsdagen spelas filmer från tidigt 1900-tal upp. Res tillbaka i tiden och njut!
                <br />
                <p className="italic text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">Boka biljett för enskild film vid ankomst eller på vår bokningssida.</p>
              </p>
            </div>
          </section>
        </article>

        <article
          className="min-h-96 w-8/12 my-5 popOut-box
        flex flex-col justify-center items-center text-white
        lg:mb-20"
          id="sunTheme"
        >
          <h2
            className="stroked-text text-red-800 text-center text-3xl uppercase font-extrabold my-5 px-20 
                     "
          >
            {sunTheme?.weekDay}
          </h2>
          <section
            className="flex flex-col justify-center items-center 
                    sm:flex-col
                    md:flex-col  
                    lg:flex-col "
          >
            <Slideshow day="sunday" />
            <div className="w-10/12 flex flex-col justify-center items-end text-center my-10 mx-5 uppercase text-sm
            sm:text-base
            md:w-9/12 md:mb-20 md:mr-1 md:text-lg
            lg:mx-5 lg:w-8/12 lg:text-xl lg:mb-20
            xl:text-2xl">
              <p
                className="flex flex-col justify-center items-center text-center"
              >
                Vår lilla salong spelar gamla goda svenska klassiker under hela söndagen, morgon till kväll. <br />
                <p className="italic text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">Boka biljett för enskild film vid ankomst eller på vår bokningssida.</p>
              </p>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}
