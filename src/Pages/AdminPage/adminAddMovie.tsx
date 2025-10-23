import AddMovieForm from "../../Components/addMovie/addMovieForm";


export default function AdminAddMoviePage() {
  return <div className="min-h-screen">
    <main className="w-12/12 mx-auto my-8 p-6 rounded-lg shadow-md border">
      <AddMovieForm />
    </main>
  </div>;
}