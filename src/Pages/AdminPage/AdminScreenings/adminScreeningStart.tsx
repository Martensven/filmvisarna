import AdminAllScreenings from "./adminAllScreenings";
import AdminAddScreening from "./adminAddScreening";
export default function AdminScreeningStart() {
    return (
        <main className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <AdminAddScreening />
              </div>
        
              <div className="w-full md:w-2/3">
                <AdminAllScreenings />
              </div>
            </main>
    );
}