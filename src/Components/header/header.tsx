import { Link } from "react-router";
import { useState } from "react";
import LoggoNR1 from "./../../../public/images/Header-loggo/LoggoNR1.png";
// import LoggoNR2 from "./../../../public/images/Header-loggo/LoggoNR2.png"
import "./../../index.css";


interface HeaderProps {
    onLoginClick: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main className="w-screen">
            <header className="text-center text-white mt-1">
                {/* <h1 className="logo_font text-xl mt-5">FILMVISARNA</h1> */}
                <div className="flex justify-center items-center sm:justify-start sm:m-5 md:justify-start">
                    <img
                        src={LoggoNR1}
                        alt="Filmvisarnas loggo"
                        className="w-60 sm:w-76  md:w-86 md:ml-8 lg:w-96 lg:ml-8"
                    />
                </div>

                <nav className="bg-[#243365] text-white mt-6 mx-5 md:mx-20 rounded-md shadow-md">
                    <section className="flex items-center justify-between h-12 px-4">

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

                        {/* Desktop menu */}
                        <ul className="desktopNav hidden md:flex w-full justify-between items-center text-sm font-medium">
                            <li><Link to="/"></Link></li>
                            <li><Link to="/about">Om Oss</Link></li>
                            <li><Link to="/kiosk">Kiosk</Link></li>
                            <li><button onClick={onLoginClick} className="cursor-pointer">Logga In</button></li>
                        </ul>
                    </section>

                    {/* Mobile menu  */}
                    {isOpen && (
                        <ul className="flex flex-col md:hidden px-4 pb-4 space-y-2">
                            <li><Link to="/about" onClick={() => setIsOpen(false)}>Om Oss</Link></li>
                            <li><Link to="/kiosk" onClick={() => setIsOpen(false)}>Kiosk</Link></li>
                            <li><button onClick={onLoginClick}>Logga In</button></li>
                        </ul>
                    )}
                </nav>
            </header>
        </main>
    );
}
