import React, { useEffect, useState} from "react";
import type { Genre, Actor, Director, Distributor, Theme , MovieInput } from "../../types/movieTypes";

export default function AddMovieForm() {
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
    });

    // Fetch and state for select options
    const [genres, setGenres] = useState<Genre[]>([]);
    const [actors, setActors] = useState<Actor[]>([]);
    const [directors, setDirectors] = useState<Director[]>([]);
    const [distributors, setDistributors] = useState<Distributor[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);

    // Fetch data for the select options
    useEffect(() => {
        const fetchData = async () => {
            try {
                // The response will be stored in respective variables
                const [genresRes, actorsRes, directorsRes, distributorsRes, themesRes] = await Promise.all([
                    fetch("/api/genres"),
                    fetch("/api/actors"),
                    fetch("/api/directors"),
                    fetch("/api/distributors"),
                    fetch("/api/theme"),
                ]);
                // Check if all the responses are oki
                if (!genresRes.ok || !actorsRes.ok || !directorsRes.ok || !distributorsRes.ok || !themesRes.ok) {
                    throw new Error("Något gick fel vid hämtning av data");
                }
                // Parse the JSON data from each response
                const [genresData, actorsData, directorsData, distributorsData, themesData] = await Promise.all([
                    genresRes.json(),
                    actorsRes.json(),
                    directorsRes.json(),
                    distributorsRes.json(),
                    themesRes.json(),
                ]);
                // Set the fetched data to the respective states
                setGenres(genresData);
                setActors(actorsData);
                setDirectors(directorsData);
                setDistributors(distributorsData);
                setThemes(themesData);
            } catch (error) {
                console.error("Något gick fel vid hämtning av data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        
    );
}