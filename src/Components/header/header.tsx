import { Link } from "react-router";
import { useState } from "react";
import LoggoNR2 from "./../../../public/images/Header-loggo/Filmvisarna-loggoNR2-Andra.png"
import LoggoNR2O from "./../../../public/images/Header-loggo/Filmvisarna-loggoNR2-opacity.png"

import { useAuth } from "../../context/authContext"; // ✅ Import AuthContext
import "./../../index.css";

interface HeaderProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ Kopplar in auth

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <main className="w-screen">
      <header className="flex flex-col justify-center items-center text-center text-white mt-1 mb-7">
        <nav className="w-11/12 flex flex-col justify-center items-center bg-[#243365] text-white mt-10 mb-5 rounded-md shadow-md
        sm:mb-10">
          <section className="flex items-center justify-between w-full h-12 px-4">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
          src={`${LoggoNR2}`}
          alt="Filmvisarnas loggo"
          className="w-2/7 rounded-lg flex justify-start items-center ml-3
          xs:w-2/6
          sm:w-3/6 sm:ml-5"
        />
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
            <ul className="flex flex-col md:hidden px-4 pb-4 space-y-2">
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
