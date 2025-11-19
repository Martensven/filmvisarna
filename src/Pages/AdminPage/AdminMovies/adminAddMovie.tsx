import AddMovieForm from "./addMovieForm";

export default function AdminAddMoviePage() {
  return (
    
    <div className="min-h-screen">
      <main className="w-full max-w-screen-md mx-auto my-8 md:rounded-xl shadow-md">
        <AddMovieForm />
      </main>
      <div className="w-full max-w-screen-md mx-auto my-8 md:rounded-xl shadow-md text-black">
      </div>
    </div>
  );
}
