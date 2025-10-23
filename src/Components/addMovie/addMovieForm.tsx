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


}

