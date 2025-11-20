import AdminAddMoviePage from "./adminAddMovie";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import TooltipLink from "../Components/ToolTipLink/toolTipLink";



export default function AdminMovies() {
  return (
    <>
      <nav className="w-full flex justify-center text-black top-0">
        <div className="w-8/12 md:w-4/12 top-0 p-2 shadow-md bg-[#FFF5ED] flex justify-evenly">
          <TooltipLink to="/admin/movies" tooltip="Lägg till film">
            <IoIosAddCircleOutline size={32} />
          </TooltipLink>
          <TooltipLink to="/admin/delete-movie" tooltip="Ta bort film">
            <IoIosRemoveCircleOutline size={32} />
          </TooltipLink>
        </div>
      </nav>
      <AdminAddMoviePage />
    </>
  );
}
