// import { BsGraphUpArrow } from "react-icons/bs";
import { MdMovieEdit } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { MdGroupAdd } from "react-icons/md";
import TooltipLink from "./Components/ToolTipLink/toolTipLink";

import { Link } from "react-router";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-screen min-h-screen bg-[#ffffff]">
      <nav className="bg-[#FFF5ED] shadow-md text-black">
        <div
          className="
            flex flex-col sm:flex-row
            items-center sm:items-center
            justify-between
            w-10/12 mx-auto
            py-4 sm:h-16 sm:py-0
            px-2 sm:px-4
          "
        >
          <Link to="/admin" className="hidden sm:block">
            Admin Filmvisarna
          </Link>

          <div
            className="
              flex flex-wrap gap-6 sm:gap-10
              justify-center sm:justify-end
            "
          >
            <TooltipLink to="screenings" tooltip="Visningar">
              <TbMovie size={24} />
            </TooltipLink>

            <TooltipLink to="movies" tooltip="Filmer">
              <MdMovieEdit size={28} />
            </TooltipLink>
            {/* <Link to="sales" className="hover:text-gray-300 transition">
              <BsGraphUpArrow size={24} />
            </Link> */}
            <TooltipLink to="add-people" tooltip="Lägg till skådespelare/regissör/distributör">
              <MdGroupAdd size={24} />
            </TooltipLink>
            <TooltipLink to="users" tooltip="Användare">
              <FaUsersCog size={24} />
            </TooltipLink>
          </div>
        </div>
      </nav>

      <main className="w-full mx-auto min-h-[80vh]">
        <Outlet />
      </main>
    </div>
  );
}
