import { BsGraphUpArrow } from "react-icons/bs";
import { MdMovieEdit } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { Link } from "react-router";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-screen min-h-screen bg-[#ffffff]">
      <nav className="bg-[#ffffff] shadow-md text-black">
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
          <h1 className="text-lg sm:text-xl font-bold mb-3 sm:mb-0">
            Admin Filmvisarna
          </h1>

          <div
            className="
              flex flex-wrap gap-6 sm:gap-10
              justify-center sm:justify-end
            "
          >
            <Link to="add-movie" className="hover:text-gray-300 transition">
              <MdMovieEdit size={28} />
            </Link>
            <Link to="sales" className="hover:text-gray-300 transition">
              <BsGraphUpArrow size={24} />
            </Link>
            <Link to="users"className="hover:text-gray-300 transition">
              <FaUsersCog size={24} />
            </Link>
                      </div>
        </div>
      </nav>

      <main className="w-full mx-auto my-8 min-h-[80vh] p-4">
        <Outlet />
      </main>
    </div>
  );
}
