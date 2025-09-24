import { Link } from "react-router";

export default function Header() {
    return (
        <main>
        <h1 className="font-bold mt-2">FILMVISARNA</h1>
        <nav className="border-4 rounded-md h-12 mx-5 md:mx-20 mt-10">
            <ul className="flex justify-between items-center h-full px-4">
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
        </main>
    );
}




