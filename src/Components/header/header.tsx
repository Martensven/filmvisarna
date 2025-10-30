import { Link } from "react-router";
import { useState } from "react";
import LoggoNR1 from "./../../../public/images/Header-loggo/LoggoNR1.png";
import { useAuth } from "../../context/authContext"; // ✅ Import AuthContext
import "./../../index.css";

interface HeaderProps {
    onLoginClick: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function Header({ onLoginClick, isLoggedIn, onLogout }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth(); // ✅ Kopplar in auth

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
    };

    return (
        <main className="w-screen">
            <header className="text-center text-white mt-1">
                <div className="flex justify-center items-center sm:justify-start sm:m-5 md:justify-start">
                    <img
                        src={`${LoggoPic}`}
                        alt="Filmvisarnas loggo"
                        className="w-60 sm:w-76 md:w-86 md:ml-8 lg:w-96 lg:ml-8"
                    />
                </div>

                <nav className="w-11/12 flex flex-col justify-center items-center bg-[#243365] text-white mt-5 rounded-md shadow-md">
                    <section className="flex items-center justify-between w-11/12 h-12 px-4">

                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <i className="fa fa-home flex" style={{ fontSize: "20px" }}></i>
                        </Link>

                        <button
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? "✕" : "☰"}
                        </button>

                        {/* ✅ Desktop menu */}
                        <ul className="desktopNav hidden md:flex w-full justify-between items-center text-sm font-medium">
                            <li><Link to="/about">Om Oss</Link></li>
                            <li><Link to="/kiosk">Kiosk</Link></li>

                            {user && (
                                <li>
                                    <Link to="/my-page" className="cursor-pointer hover:underline">
                                        Mina Sidor
                                    </Link>
                                </li>
                            )}

                            <li>
                                {user ? (
                                    <button onClick={handleLogout} className="cursor-pointer text-red-300 hover:text-red-400">
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
                        <ul className="flex flex-col md:hidden px-4 pb-4 space-y-2">
                            <li><Link to="/about" onClick={() => setIsOpen(false)}>Om Oss</Link></li>
                            <li><Link to="/kiosk" onClick={() => setIsOpen(false)}>Kiosk</Link></li>

                            {user && (
                                <li>
                                    <Link to="/my-page" onClick={() => setIsOpen(false)} className="hover:underline">
                                        Mina Sidor
                                    </Link>
                                </li>
                            )}

                            <li>
                                {user ? (
                                    <button onClick={handleLogout} className="text-red-300 hover:text-red-400">
                                        Logga Ut
                                    </button>
                                ) : (
                                    <button onClick={onLoginClick}>
                                        Logga In
                                    </button>
                                )}
                            </li>
                        </ul>
                    )}
                </nav>
            </header>
        </main>
    );
}