import { useState } from "react";
import exampleList from "../../../../Backend/example";

export default function Slideshow() {
    const [movieTheme, setMovieTheme] = useState();

    return (
        <article>
            <h1>header</h1>
            <h2>Tags</h2>
            <p>description</p>
        </article>
    )
}