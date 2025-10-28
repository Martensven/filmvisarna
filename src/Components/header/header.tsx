import { Link } from "react-router";
import { useState } from "react";
import LoggoNR1 from "./../../../public/images/Header-loggo/LoggoNR1-med-sken.png";
// import LoggoNR2 from "./../../../public/images/Header-loggo/LoggoNR2.png"
import "./../../index.css";


interface HeaderProps {
    onLoginClick: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const LoggoPic = LoggoNR1;
    return (
        <main className="w-screen">
            <header className="flex flex-col justify-center items-center text-center text-white mt-1">
                {/* <h1 className="logo_font text-xl mt-5">FILMVISARNA</h1> */}
                <div className="flex justify-center items-center m-0 w-11/12 
                sm:justify-center sm:items-center 
                md:justify-start md:items-start
                lg:justify-start lg:items-start">
                    <img
                        src={`${LoggoPic}`}
                        alt="Filmvisarnas loggo"
                        className="w-56 m-5 rounded-sm
                        sm:w-74 
                        md:w-86 md:ml-8 
                        lg:w-96 lg:ml-8"
                    />
                </div>

                <nav className="w-11/12 flex justify-center items-center bg-[#243365] text-white mt-5 rounded-md shadow-md">
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

                        {/* Desktop menu */}
                        <ul className="desktopNav hidden w-full justify-around items-center text-sm font-medium
                        md:flex md:text-base">
                            <li className="md:hover:scale-105 lg:hover:scale-110"><Link to="/"></Link></li>
                            <li className="md:hover:scale-105 lg:hover:scale-110"><Link className="" to="/about">Om Oss</Link></li>
                            <li className="md:hover:scale-105 lg:hover:scale-110"><Link to="/kiosk">Kiosk</Link></li>
                            <li className="md:hover:scale-105 lg:hover:scale-110"><button onClick={onLoginClick} className="cursor-pointer">Logga In</button></li>
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
