import React, { useState, useEffect } from "react";
// We are using react-select for better multi-select dropdowns
import Select from "react-select";

// Importing types for movie data
import type {
  Genre,
  Actor,
  Director,
  Distributor,
  Theme,
  MovieInput,
} from "../../types/movieTypes";

export default function AddMovieForm() {
  // State to hold all data to be saved to backend database
  // Initial states are empty or default values.
  const [formData, setFormData] = useState<MovieInput>({
    title: "",
    imageSrc: "",
    releaseYear: new Date().getFullYear(),
    age: "",
    length: "",
    description: "",
    youtubeTrailers: "",
    genres: [],
    actors: [],
    directors: [],
    distributors: [],
    themes: "",
    scheduleType: "smallTheater",
  });

  // States for each type of data
  const [genres, setGenres] = useState<Genre[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  const [loading, setLoading] = useState(true);
  // Message to display feedback to the user
  const [message, setMessage] = useState("");

  // Fetching all necessary data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresRes, actorsRes, directorsRes, distributorsRes, themesRes] =
          await Promise.all([
            fetch("/api/genres"),
            fetch("/api/actors"),
            fetch("/api/directors"),
            fetch("/api/distributors"),
            fetch("/api/theme"),
          ]);
        // Check if all responses are ok
        if (
          !genresRes.ok ||
          !actorsRes.ok ||
          !directorsRes.ok ||
          !distributorsRes.ok ||
          !themesRes.ok
        ) {
          throw new Error("Misslyckades med att hämta data");
        }
        // Parse the JSON data into respective states
        const [
          genresData,
          actorsData,
          directorsData,
          distributorsData,
          themesData,
        ] = await Promise.all([
          genresRes.json(),
          actorsRes.json(),
          directorsRes.json(),
          distributorsRes.json(),
          themesRes.json(),
        ]);
        // Set the fetched data to states
        setGenres(genresData);
        setActors(actorsData);
        setDirectors(directorsData);
        setDistributors(distributorsData);
        setThemes(themesData);
      } catch (error: any) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Något gick fel vid tillägg av film"
        );
      }
      setMessage("Filmen har lagts till framgångsrikt!");
      // Reset form after successful submission
      setFormData({
        title: "",
        imageSrc: "",
        releaseYear: new Date().getFullYear(),
        age: "",
        length: "",
        description: "",
        youtubeTrailers: "",
        genres: [],
        actors: [],
        directors: [],
        distributors: [],
        themes: "",
        scheduleType: "smallTheater",
      });
    } catch (error: any) {
      console.log("Fel vid tilläggning av film", +error);
      setMessage(error.message);
    }
  };

  return (
<div className="w-full p-4 bg-[#1f1f1f]">
      <h2 className="text-2xl font-bold mb-6">Lägg till ny film</h2>
      {loading ? (
        <p className="text-white">Laddar...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
          <input
            className="border p-2 rounded text-black bg-white mb-4"
            type="text"
            name="title"
            placeholder="Titel"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded text-black bg-white mb-4"
            type="text"
            name="imageSrc"
            placeholder="Bild URL"
            value={formData.imageSrc}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded text-black bg-white mb-4"
            type="number"
            name="releaseYear"
            placeholder="Utgivningsår"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded text-black bg-white mb-4"
            type="number"
            name="age"
            placeholder="Åldersgräns"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded text-black bg-white mb-4"
            type="number"
            name="length"
            placeholder="Längd (minuter)"
            value={formData.length}
            onChange={handleChange}
            required
          />
          <textarea
            className="border p-2 rounded text-black bg-white mb-4"
            name="description"
            placeholder="Beskrivning"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded text-black bg-white mb-4"
            type="text"
            name="youtubeTrailers"
            placeholder="YouTube Trailer URL"
            value={formData.youtubeTrailers}
            onChange={handleChange}
            required
          />
          <label>Genre:</label>
          {/* We are using react-select to use multi-select to be able to select multiple genres */}
          <Select
            isMulti
            options={genres.map((g) => ({ value: g._id, label: g.title }))}
            className="text-black"
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                genres: selected.map((s) => s.value),
              }))
            }
          />
          <label>Skådespelare:</label>
          {/* We are using react-select to use multi-select to be able to select multiple actors */}
          <Select
            isMulti
            options={actors.map((a) => ({ value: a._id, label: a.name }))}
            className="text-black"
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                actors: selected.map((s) => s.value),
              }))
            }
          />
          <label>Regissörer:</label>
          {/* We are using react-select to use multi-select to be able to select multiple directors */}
          <Select
            isMulti
            options={directors.map((d) => ({ value: d._id, label: d.name }))}
            className="text-black"
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                directors: selected.map((s) => s.value),
              }))
            }
          />
          <label>Distributörer:</label>
          {/* We are using react-select to use multi-select to be able to select multiple distributors */}
          <Select
            isMulti
            options={distributors.map((d) => ({ value: d._id, label: d.name }))}
            className="text-black"
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                distributors: selected.map((s) => s.value),
              }))
            }
          />
          <label>Tema:</label>
          <Select
            options={themes.map((t) => ({ value: t._id, label: t.themeDesc }))}
            className="text-black"
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                themes: selected?.value || "",
              }))
            }
          />
          <label>Schema Typ:</label>
          <select
            name="scheduleType"
            value={formData.scheduleType}
            onChange={handleChange}
            required
            className="border p-2 rounded text-black bg-white mb-4"
          >
            
            <option value="">Välj Schema Typ</option>
            <option value="smallTheater">Lilla salongen</option>
            <option value="bigTheater">Stora salongen</option>
          </select>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Lägg till film
          </button>
        </form>
      )}
    </div>
  );
}
