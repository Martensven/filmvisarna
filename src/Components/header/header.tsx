import { Link } from "react-router";

export default function Header() {
    return (
        <nav>
            <h1>Header</h1>
            <ul>
                <li>
                    <Link to="/">Start</Link>
                </li>
                <li>
                    <Link to="/booking">Boka</Link>
                </li>
                <li>
                    <Link to="/movie">Filmer</Link>
                </li>
                <li>
                    <Link to="/theme">Temadagar</Link>
                </li>
                <li>
                    <Link to="/my-page">Mina Sidor</Link>
                </li>
                <li>
                    <Link to="/login">Logga In</Link>
                </li>
            </ul>
        </nav>
    );
}




