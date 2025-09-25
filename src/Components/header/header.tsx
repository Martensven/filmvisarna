import { Link } from "react-router";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (

    <main>
      <header className="text-center text-white mt-4">
        <h1 className="font-bold text-xl">FILMVISARNA</h1>

        <nav className="bg-[#243365] text-white mt-6 mx-5 md:mx-20 rounded-md shadow-md">
          
          <section className="flex items-center justify-between h-12 px-4">
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              
              {isOpen ? '✕' : '☰'}
            </button>

            {/* Desktop menu */}
            <ul className="hidden md:flex w-full justify-between items-center text-sm font-medium">
              <li><Link to="/">Start</Link></li>
              <li><Link to="/booking">Boka</Link></li>
              <li><Link to="/movie">Filmer</Link></li>
              <li><Link to="/theme">Temadagar</Link></li>
              <li><Link to="/about">Om Oss</Link></li>
              <li><Link to="/kiosk">Kiosk</Link></li>
              <li><Link to="/login">Logga In</Link></li>
            </ul>
          </section>

           {/* Mobile menu  */}
          {isOpen && (
            <ul className="flex flex-col md:hidden px-4 pb-4 space-y-2">
              <li><Link to="/" onClick={() => setIsOpen(false)}>Start</Link></li>
              <li><Link to="/booking" onClick={() => setIsOpen(false)}>Boka</Link></li>
              <li><Link to="/movie" onClick={() => setIsOpen(false)}>Filmer</Link></li>
              <li><Link to="/theme" onClick={() => setIsOpen(false)}>Temadagar</Link></li>
              <li><Link to="/about" onClick={() => setIsOpen(false)}>Om Oss</Link></li>
              <li><Link to="/kiosk" onClick={() => setIsOpen(false)}>Kiosk</Link></li>
              <li><Link to="/login" onClick={() => setIsOpen(false)}>Logga In</Link></li>
            </ul>
          )}
        </nav>
      </header>
    </main>
  );
}
//         <main>
//             <h1 className="font-bold mt-2 text-white">FILMVISARNA</h1>
//             <nav className=" rounded-md h-12 mx-5 md:mx-20 mt-10 bg-[#243365] text-white shadow-md">
//                 <ul className="flex justify-between items-center h-full px-4">
//                     <li>
//                         <Link to="/">Start</Link>
//                     </li>
//                     <li>
//                         <Link to="/booking">Boka</Link>
//                     </li>
//                     <li>
//                         <Link to="/movie">Filmer</Link>
//                     </li>
//                     <li>
//                         <Link to="/theme">Temadagar</Link>
//                     </li>

//                     <li>
//                         <Link to="/about">Om Oss</Link>
//                     </li>
//                     <li>
//                         <Link to="/kiosk">Kiosk</Link>
//                     </li>
//                     <li>
//                         <Link to="/login">Logga In</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </main>
//     );
// }




