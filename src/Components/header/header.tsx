import { Link } from "react-router";

export default function Header() {
    return (
        <nav>
            <h1></h1>
            <ul>
                <li>
                    <Link to="/"></Link>
                </li>
                <li>
                    <Link to="/booking"></Link>
                </li>
                <li>
                    <Link to="/movie"></Link>
                </li>
                <li>
                    <Link to="/theme"></Link>
                </li>
                <li>
                    <Link to="/my-page"></Link>
                </li>
                <li>
                    <Link to="/login"></Link>
                </li>
            </ul>
        </nav>
    );
}




