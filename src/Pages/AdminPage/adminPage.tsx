import { BsGraphUpArrow } from 'react-icons/bs';
import { MdMovieEdit } from 'react-icons/md';
import { FaUsersCog } from 'react-icons/fa';
import { Link } from 'react-router';
import { Outlet } from 'react-router-dom';

export default function AdminPage() {
  return <div className="w-screen bg-[#292929] text-white">
    <nav className="h-16 bg-[#1f1f1f] flex items-center px-4 mx-auto w-10/12 shadow-md">
      <h1 className="text-xl font-bold">Admin Filmvisarna</h1>
      <div className="controls flex gap-10 ml-auto flex-wrap">
        <Link to="add-movie"><MdMovieEdit size={28} /></Link>
        <Link to="sales"><BsGraphUpArrow size={24} /></Link>
        <FaUsersCog size={24} />
      </div>
    </nav>
    <main className="w-10/12 mx-auto my-8 min-h-[80vh]">
      <Outlet />
    </main>
  </div>;
}

