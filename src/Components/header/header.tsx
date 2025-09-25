import { Link } from "react-router";

export default function Header() {
    return (
        <main>
            <h1 className="font-bold mt-2 text-white">FILMVISARNA</h1>
            <nav className=" rounded-md h-12 mx-5 md:mx-20 mt-10 bg-[#243365] text-white shadow-md">
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
                        <Link to="/about">Om Oss</Link>
                    </li>
                    <li>
                        <Link to="/kiosk">Kiosk</Link>
                    </li>
                    <li>
                        <Link to="/login">Logga In</Link>
                    </li>
                </ul>
            </nav>
        </main>
    );
}




