import { Link } from "react-router";

export default function Header() {
    return (
        <nav>
            <h1>Header</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/booking">Booking</Link>
                </li>
                <li>
                    <Link to="/movie">Movie</Link>
                </li>
                <li>
                    <Link to="/theme">Theme</Link>
                </li>
                <li>
                    <Link to="/my-page">My Page</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}




