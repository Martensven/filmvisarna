import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function FilterSortMovies({ onLoaded }: { onLoaded: () => void }) {
  const [movie, setMovie] = useState<any[]>([]); // State to hold fetched movies
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [scheduledType, setScheduledType] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const setError = useState<string | null>(null)[1];
  const setLoading = useState<boolean>(true)[1];

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
      setTimeout(() => onLoaded(), 0);
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

  // Sort based on selected option. (A-Z, Z-A, Newest)
  const sortedMovies = [...movie].sort((a, b) => {
    if (sortOption === "atoz") return a.title.localeCompare(b.title);
    if (sortOption === "ztoa") return b.title.localeCompare(a.title);
    if (sortOption === "newest") return b.releaseYear - a.releaseYear;
    if (sortOption === "oldest") return a.releaseYear - b.releaseYear;
    return 0;
  });

  // Age options for filtering
  const ageOptions = [
    { label: "Film utan åldersgräns (Barntillåten)", value: 0 },
    { label: "7 år (0 år i vuxet sällskap)", value: 7 },
    { label: "11 år (7 år i vuxet sällskap)", value: 11 },
    { label: "15 år (11 år i vuxet sällskap)", value: 15 },
  ];

  return (
    <>
      <section className="Header-container-box w-10/12 mt-10 flex flex-col justify-center items-center">
        <h2 className="w-full stroked-text text-red-800 text-center text-3xl  uppercase font-extrabold my-6 px-2
          sm:text-4xl
          md:text-5xl
          lg:text-5xl
          xl:text-5xl">
          Visas just nu
        </h2>

        {/* Filter & Sort */}
        <section className="w-10/12 h-auto p-2 flex flex-col sm:flex-row  justify-center items-center relative text-white">
          <section className="flex flex-row w-1/2 justify-around items-center sm:w-full">
            {/* Filter */}
            <nav className="relative ">
              <button onClick={() => setFilterOpen(!filterOpen)}
                className="px-2 py-1 cursor-pointer
                        sm:text-lg 
                        md:text-lg">
                Filter &darr;
              </button>
              {filterOpen && (
                <div className="flex flex-row flex-wrap justify-center items-center 
                        absolute bg-[#18203ad0] shadow-md rounded p-5 w-72
                        sm:w-86 mt-1 z-50
                        lg:max-h-[80vh]">
                  {/* Genres */}
                  {["Action", "Drama", "Komedi", "Skräck", "Äventyr", "Thriller", "Mystik",].map((genre) => (
                    <label
                      key={genre}
                      className="flex items-center gap-2 px-2 py-1  mb-2 w-30 h-8 text-sm 
                                hover:underline
                                sm:text-base
                                md:text-base">
                      <input type="checkbox" checked={selectedGenres.includes(genre)} onChange={() => handleGenreChange(genre)} />
                      {genre}
                    </label>
                  ))}
                  {/* Age Limits */}
                  {ageOptions.map((age) => (
                    <label
                      key={age.value}
                      className="flex items-center gap-2 px-2 py-1 mt-2 text-sm text-left
                                sm:text-base
                                md:text-base">
                      <input type="checkbox" checked={selectedAges.includes(age.value)} onChange={() => handleAgeChange(age.value)} />
                      {age.label}
                    </label>
                  ))}
                </div>
              )}
            </nav>

            {/* Sort */}
            <div className="relative">
              <button onClick={() => setSortOpen(!sortOpen)}
                className="px-2 py-1 cursor-pointer
                        sm:text-base
                        md:text-lg">
                Sortera &darr;
              </button>
              {sortOpen && (
                <ul className="absolute bg-[#18203ad0] mt-1 rounded shadow w-40 lg:w-76">
                  <li className="px-2 py-1 hover:underline cursor-pointer"
                    onClick={() => {
                      setSortOption("atoz");
                      setSortOpen(false);
                    }}>
                    A–Ö
                  </li>
                  <li className="px-2 py-1 hover:underline cursor-pointer"
                    onClick={() => {
                      setSortOption("ztoa");
                      setSortOpen(false);
                    }}>
                    Ö–A
                  </li>
                  <li className="px-2 py-1 hover:underline cursor-pointer"
                    onClick={() => {
                      setSortOption("newest");
                      setSortOpen(false);
                    }}>
                    Nyast först
                  </li>
                  <li className="px-2 py-1 hover:underline cursor-pointer"
                    onClick={() => {
                      setSortOption("oldest");
                      setSortOpen(false);
                    }}>
                    Äldst först
                  </li>
                </ul>
              )}
            </div>
          </section>

          <section className="flex w-full">
            {/* Screening Date */}
            <div className="search-date-box px-2 py-2 w-11/12 
            sm:w-1/2 flex flex-col">
              <label className="block text-sm mb-1">Datum:</label>
              <input type="date" value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-7 bg-white text-sm text-black rounded px-1 py-1 mb-3" />
            </div>

            {/* Schedule Type */}
            <div className="search-hall-box px-2 py-2 w-11/12
            sm:w-1/2 flex flex-col">
              <label className="block text-sm mb-1">Salong:</label>
              <select value={scheduledType}
                onChange={(e) => setScheduledType(e.target.value)}
                className="w-full bg-white text-black text-sm rounded px-2 py-1 mb-3 focus:outline-none focus:ring-2 focus:ring-[#24252C]">
                <option value="">Alla salonger</option>
                <option value="smallTheater">Lilla Salongen</option>
                <option value="bigTheater">Stora Salongen</option>
              </select>
            </div>
          </section>
        </section>
      </section>
      {/* Movies container*/}
      <section
        className="
        h-100 w-11/12 mx-5 my-5
        flex flex-row overflow-x-auto overflow-y-hidden
        [&::-webkit-scrollbar]:h-2   
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-[#24252C]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-[#cdd3fe24]
        snap-x snap-mandatory text-white
        lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:h-auto lg:w-full
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
                                 mt-6
                                 md:h-14
                                    lg:m-0 
                                    lg:text-md
                                    xl:text-lg
                                    "
                >
                  {movie.title}
                </p>

                <div className="relative">
                  {/* Åldersbadge */}
                  <div className="glass_effect w-12 absolute top-8 left-2 text-white px-2 text-xs rounded-md shadow-md">
                    {movie.age}+
                  </div>

                  {/* Bild */}
                  <img
                    src={movie.imageSrc}
                    alt={movie.title}
                    className="shadow-md w-auto object-cover rounded-md p-0 
        h-56
        md:h-60
        lg:h-64
        xl:h-72
        2xl:h-80"
                  />
                </div>

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
    </>
  )
}