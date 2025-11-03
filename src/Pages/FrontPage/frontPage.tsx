import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slideshow from "../../Components/themepageSlideshow/slideshowComponent.tsx";
import "../BookingPage/BookingPageStyle.css";
import "../../index.css";

export default function FrontPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [scheduledType, setScheduledType] = useState<string>("");

  const [movie, setMovie] = useState<any[]>([]); // State to hold fetched movies
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

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
    <main className="w-screen flex flex-col items-center min-h-screen mt-14 bg-[#292929]">
      <h1
        className="text-center text-lg mb-4 w-11/12
            sm:text-xl
            md:text-2xl"
      >
        Välkommen till Filmvisarna!
      </h1>
      <p
        className="text-center text-sm mb-10 w-11/12
            sm:text-base
            md:text-base"
      >
        Här kan du se filmer som verkligen tar dig bakåt i tiden. Vi erbjuder
        filmer från 1910 talet fram till början på 2000 talet. Är detta något
        för dig se då till att se dig runt bland våra filmer och boka en tid som
        passar dig!
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
    2xl:h-auto 2xl:p-2 2xl:grid 2xl:grid-cols-5

  ">
        {sortedMovies.length === 0 ? (
          <p className="m-auto">Inga filmer hittades.</p>
        ) : (
          sortedMovies.map((movie) => (
            <article
              key={movie._id}
              className="flex justify-center items-center h-76 min-w-56 snap-center m-3
                            lg:h-auto lg:hover:shadow-[0_0_15px_rgba(70,106,228,0.4)] lg:hover:scale-105
                            xl:h-auto xl:mt-10"
            >
              <Link
                to={`/movie/${movie._id}`}
                className="flex flex-col items-center justify-start
                            sm:h-auto m-0
                            lg:h-auto"
              >
                <img
                  src={movie.imageSrc}
                  alt={movie.title}
                  className="shadow-2xl w-auto h-auto object-cover rounded-md
                                    sm:w-auto sm:h-auto
                                    md:w-auto md:h-auto
                                    lg:w-auto
                                    xl:w-auto p-0 "
                />
                <p
                  className="mt-2
                             text-sm
                                lg:m-0"
                >
                  {movie.title}
                </p>

                <p
                  className="text-sm"
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
            md:mt-10 md:flex md:flex-col"
      >
        <h2 className="w-full mt-10 rounded-md shadow-md text-lg glass_effect p-1 justify-center items-center">
          Temadagar
        </h2>
        <article
          className="min-h-96 w-full rounded-md shadow-md my-5 justify-center items-center flex flex-col bg-[#24252C] text-white
                "
        >
          <h2
            className=" text-center text-xl uppercase font-bold my-2
                    lg:mt-5 lg:underline"
          >
            Tysta Torsdagen
          </h2>
          <section
            className=" flex flex-col justify-center items-center 
                    sm:flex-col sm:p-5
                    md:flex-row 
                    lg:flex-row  "
          >
            <Slideshow day="thursday" />
            <p
              className="w-11/12 m-2 text-center
                            sm:w-11/12
                            md:w-7/12 md:px-2"
            >
              Varje Torsdag i vår lilla salong spelas stumfilmer från tidigast
              1910-tal. Vill man läsa mer om tema dagen så tryck gärna på läs
              mer knappen nedan för att få mer information om temadagen.
            </p>
          </section>

          <Link to="/theme-thursday" className="">
            <button
              className="main_buttons p-1 px-2 mb-3 mt-5
                        sm:w-25 sm:h-10 sm:text-lg sm:mt-2 sm:mb-5"
            >
              Läs mer
            </button>
          </Link>
        </article>

        <article className="min-h-96 rounded-md shadow-md my-5 justify-center items-center flex  flex-col bg-[#24252C] text-white">
          <h2
            className="text-center text-xl uppercase font-bold my-2
                    lg:mt-5 lg:underline"
          >
            Svenska Söndagen
          </h2>
          <section
            className="flex flex-col justify-center items-center
                    sm:flex-col sm:p-5
                    md:flex-row-reverse  
                    lg:flex-row-reverse lg:w-full"
          >
            <Slideshow day="sunday" />
            <p
              className=" w-11/12 m-2 text-center
                        sm:w-11/12
                        md:w-7/12 md:px-2
                        lg:w-7/12"
            >
              Söndagar är till för att uppleva gamla goda svenska klassiker.
              Visas i vår lilla salong under hela Söndagen. Läs mer för för
              information om vilka filmer som visas.
            </p>
          </section>

          <Link to="/theme-sunday" className="">
            <button
              className="main_buttons p-1 px-2 mb-3 mt-5
                        sm:w-25 sm:h-10 sm:text-lg sm:mt-2 sm:mb-5"
            >
              Läs mer
            </button>
          </Link>
        </article>
      </section>
    </main>
  );
}
