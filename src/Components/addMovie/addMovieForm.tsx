import React, { useState, useEffect } from "react";

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
        const [genresRes, actorsRes, directorsRes, distributorsRes, themesRes] = await Promise.all([
          fetch("/api/genres"),
          fetch("/api/actors"),
          fetch("/api/directors"),
          fetch("/api/distributors"),
          fetch("/api/theme"),
        ]);
        // Check if all responses are ok
        if (!genresRes.ok || !actorsRes.ok || !directorsRes.ok || !distributorsRes.ok || !themesRes.ok) {
          throw new Error("Misslyckades med att hämta data");
        }
        // Parse the JSON data into respective states
        const [genresData, actorsData, directorsData, distributorsData, themesData] = await Promise.all([
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

}

