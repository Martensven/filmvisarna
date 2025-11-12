import { Link, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import LoggoComponent from "./LoggoComponent";
// import LoggoNR2 from "./../../../public/images/Header-loggo/Filmvisarna-loggoNR2-Andra.png"


import { useAuth } from "../../context/authContext"; // ✅ Import AuthContext
import "./../../index.css";

//   <img
//   src={`${LoggoNR2}`}
//   alt="Filmvisarnas loggo"
//   className="w-2/7 rounded-lg flex justify-start items-center ml-3
//   xs:w-2/6
//   sm:w-3/6 sm:ml-5
//   xl:w-7/12"
// />

interface HeaderProps {
    onLoginClick: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth(); // ✅ Kopplar in auth
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
    };

    const handleScroll = (id: string) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: id} });
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="w-screen">
            <header className="flex flex-col justify-center relative z-1 items-center text-center text-white mt-3 mb-7">
                <nav className="w-11/12 flex flex-col justify-center items-center bg-[#243365] text-white mt-10 mb-5 rounded-md shadow-md
        sm:mb-10
        xl:mt-20 xl:justify-center xl:items-center">
                    <section className="flex items-center justify-between w-full h-12 px-4">
                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <LoggoComponent />
                        </Link>

                        <button
                            className="md:hidden mr-3"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? "✕" : "☰"}
                        </button>

                        {/* ✅ Desktop menu */}
                        <ul className="desktopNav hidden md:flex w-10/12 justify-around items-center text-base font-medium">
                            <li className="md:hover:scale-105 lg:hover:scale-110 dropdown relative cursor-pointer">
                                Temadagar
                                <ul className="dropdown-content hidden absolute left-1/2 top-full -translate-x-1/2 text-center">
                                    <li className="block bg-[#243365] w-30 py-5 hover:bg-[#2b4185] rounded-t" onClick={() => handleScroll("thuTheme")}>Tysta Torsdagen</li>
                                    <li className="block bg-[#243365] w-30 py-5 hover:bg-[#2b4185] rounded-b" onClick={() => handleScroll("sunTheme")}>Svenska Söndagen</li>
                                </ul>
                            </li>
                            <li className="md:hover:scale-105 lg:hover:scale-110">
                                <Link to="/about">Om Oss</Link>
                            </li>
                            <li className="md:hover:scale-105 lg:hover:scale-110">
                                <Link to="/kiosk">Kiosk</Link>
                            </li>

                            {user && (
                                <li className="md:hover:scale-105 lg:hover:scale-110">
                                    <Link
                                        to="/my-page"
                                        className="cursor-pointer hover:underline"
                                    >
                                        Mina Sidor
                                    </Link>
                                </li>
                            )}

                            <li className="md:hover:scale-105 lg:hover:scale-110">
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="cursor-pointer text-red-300 hover:text-red-400"
                                    >
                                        Logga Ut
                                    </button>
                                ) : (
                                    <button onClick={onLoginClick} className="cursor-pointer">
                                        Logga In
                                    </button>
                                )}
                            </li>
                        </ul>
                    </section>

                    {/* ✅ Mobile menu */}
                    {isOpen && (
                        <ul className="flex flex-col md:hidden px-4 pb-4 space-y-2 mt-8">
                            <li onClick={() => handleScroll("thuTheme")}>
                                Tysta Torsdagen
                            </li>
                            <li onClick={() => handleScroll("sunTheme")}>
                                Svenska Söndagen
                            </li>
                            <li>
                                <Link to="/about" onClick={() => setIsOpen(false)}>
                                    Om Oss
                                </Link>
                            </li>
                            <li>
                                <Link to="/kiosk" onClick={() => setIsOpen(false)}>
                                    Kiosk
                                </Link>
                            </li>

                            {user && (
                                <li>
                                    <Link
                                        to="/my-page"
                                        onClick={() => setIsOpen(false)}
                                        className="hover:underline"
                                    >
                                        Mina Sidor
                                    </Link>
                                </li>
                            )}

                            <li>
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-300 hover:text-red-400"
                                    >
                                        Logga Ut
                                    </button>
                                ) : (
                                    <button onClick={onLoginClick}>Logga In</button>
                                )}
                            </li>
                        </ul>
                    )}
                </nav>
            </header>
        </main>
    );
}
