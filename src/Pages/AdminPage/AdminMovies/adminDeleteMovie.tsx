import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Toast from "../../../toast/toast";
import ConfirmModal from "../Components/ConfirmModal/confirmModal";

type Movie = { _id: string; title: string; themes?: { themeDesc?: string } };

export default function AdminDeleteMovie() {
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch movies or any other necessary data here
    const fetchMovies = async () => {
      try {
        const resMovies = await fetch("/api/movie");
        const data = await resMovies.json();
        // Handle the fetched movie data
        setMovies(data);
        console.log("Fetched movies:", data);
      } catch (error) {
        console.error("Fel vid hämtning av filmer:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = async () => {
    if (!selectedMovieId) return;
    try {
      const response = await fetch(`/api/movie/${selectedMovieId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setToastType("success");
        setToastMessage(
          `${
            movies.find((movie) => movie._id === selectedMovieId)?.title
          } togs bort`
        );
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== selectedMovieId)
        );
        setSelectedMovieId("");
      } else {
        setToastType("error");
        setToastMessage("Kunde inte ta bort filmen.");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <nav className="w-full flex justify-center text-black top-0">
        <div className="w-8/12 md:w-4/12 top-0 p-2 shadow-md bg-[#FFF5ED] flex justify-evenly">
          <Link to="/admin/movies" className="hover:text-gray-300 transition">
            <IoIosAddCircleOutline size={32} />
          </Link>
          <Link
            to="/admin/delete-movie"
            className="hover:text-gray-300 transition"
          >
            <IoIosRemoveCircleOutline size={32} />
          </Link>
        </div>
      </nav>
      <div className="w-full max-w-screen-md p-6 bg-[#243365] my-8 text-white mx-auto rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Radera Film</h2>
        <select
          
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
          className="mb-4 p-2 bg-white text-black rounded w-full"
        >
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
            
          ))}
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Radera film
        </button>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </div>
      
      {showModal && (
  <ConfirmModal
    title="Är du säker?"
    message={`Vill du verkligen radera "${movies.find(m => m._id === selectedMovieId)?.title}"?`}
    confirmText="Radera"
    cancelText="Avbryt"
    onConfirm={() => {
      setShowModal(false);
      handleDelete();
    }}
    onCancel={() => setShowModal(false)}
  />
)}

    </>
  );
}
