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
    const [message, setMessage] = useState("");

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

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // Update formData state based on input type
        setFormData((prev) => ({
            ...prev,
            // Update the specific field in formData
            [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
        }));
    };

    const handleCheckboxChange = (
        name: "genres" | "actors" | "directors" | "distributors",
        value: string,
        checked: boolean
    ) => {
        setFormData(prev => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter(id => id !== value),
        }));
    };

    // Send to backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();''
        setMessage("");

        const movieToSend = {...formData};

        try {
            const res = await fetch("/api/movie", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(movieToSend),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Något gick fel vid tillägg av film");
            }

            setMessage("Filmen har lagts till!");
            setFormData({
                title: "",
                imageSrc: "",
                releaseYear: 0,
                age: 0,
                length: 0,
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
            console.error("Fel vid tillägg av film:", error);
            setMessage("Kund inte spara filmen: " + error.message);
        }
    };

    return (
        <div className="">
            <h2>Lägg till en ny film</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Titel"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="imageSrc"
                    placeholder="Bild URL"
                    value={formData.imageSrc}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="releaseYear"
                    placeholder="Utgivningsår"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Åldersgräns"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="length"
                    placeholder="Längd (minuter)"
                    value={formData.length}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Beskrivning"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="youtubeTrailers"
                    placeholder="YouTube Trailer URL"
                    value={formData.youtubeTrailers}
                    onChange={handleChange}
                    required
                />

                {/* Genre checkboxes */}
                <fieldset>
                    <legend>Välj Genre(s):</legend>
                    {genres.map((genre) => (
                        <label key={genre._id}>
                            <input
                                type="checkbox"
                                name="genres"
                                value={genre._id}
                                checked={formData.genres.includes(genre._id)}
                                onChange={(e) => handleCheckboxChange("genres", genre._id, e.target.checked)}   
                            />
                            <span>{genre.title}</span>
                        </label>
                    ))}
                </fieldset>

                <fieldset>
                    <legend>Skådespelare:</legend>
                    {actors.map((actor) => (
                        <label key={actor._id}>
                            <input
                                type="checkbox"
                                name="actors"
                                value={actor._id}
                                checked={formData.actors.includes(actor._id)}
                                onChange={(e) => handleCheckboxChange("actors", actor._id, e.target.checked)}
                            />
                            <span>{actor.name}</span>
                        </label>
                    ))}
                </fieldset>

                <fieldset>
                    <legend>Regissörer:</legend>
                    {directors.map((director) => (
                        <label key={director._id}>
                            <input
                                type="checkbox"
                                name="directors"
                                value={director._id}
                                checked={formData.directors.includes(director._id)}
                                onChange={(e) => handleCheckboxChange("directors", director._id, e.target.checked)}
                            />
                            <span>{director.name}</span>
                        </label>
                    ))}
                </fieldset>

                <fieldset>
                    <legend>Distributörer:</legend>
                    {distributors.map((distributor) => (
                        <label key={distributor._id}>
                            <input
                                type="checkbox"
                                name="distributors"
                                value={distributor._id}
                                checked={formData.distributors.includes(distributor._id)}
                                onChange={(e) => handleCheckboxChange("distributors", distributor._id, e.target.checked)}
                            />
                            <span>{distributor.name}</span>
                        </label>
                    ))}
                </fieldset>

                <label>Tema:</label>
                <select
                    name="themes"
                    value={formData.themes}
                    onChange={handleChange}
                    multiple
                    required
                >
                    {themes.map((theme) => (
                        <option key={theme._id} value={theme._id}>
                            {theme.themeDesc}
                        </option>
                    ))}
                </select>

                <label>Schema Typ:</label>
                <select
                    name="scheduleType"
                    value={formData.scheduleType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Välj Schema Typ</option>
                    <option value="weekly">Veckovis</option>
                    <option value="monthly">Månatligen</option>
                </select>

                <button type="submit">Lägg till Film</button>
                {message && <p>{message}</p>}

            </form>
        </div>
    );
}