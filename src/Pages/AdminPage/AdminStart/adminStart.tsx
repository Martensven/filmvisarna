import AdminScreenings from "./adminScreening.tsx";
import AdminWelcome from "./adminWelcome.tsx";

export default function AdminStart() {
  return (
    <main className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <AdminWelcome />
      </div>

      <div className="w-full md:w-2/3">
        <AdminScreenings />
      </div>
    </main>
  );
}
