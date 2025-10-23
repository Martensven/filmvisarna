export default function AddMovieForm() {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-800 text-white rounded">
        <h2 className="text-2xl mb-4">Lägg till ny film</h2>
        <form>
            <div className="mb-4">
                <label className="block mb-2">Titel</label>
                <input type="text" className="w-full p-2 bg-gray-700 text-white rounded" />
            </div>
        </form>
    </div>
  );
}