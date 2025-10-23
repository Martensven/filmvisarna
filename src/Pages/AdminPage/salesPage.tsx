import { useEffect, useState } from "react";

type SalesComparison = {
  title: string;
  today: number;
  lastWeek: number;
  difference: number;
};

export default function SalesPage() {
  const [sales, setSales] = useState<SalesComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/sales/compare")
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte hämta försäljningsdata");
        return res.json();
      })
      .then((data) => setSales(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-white">Laddar försäljningsdata...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <main className="min-h-screen bg-[#1f1f1f] text-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-[#243365] py-3 rounded-lg shadow-md inline-block px-6">
          Försäljning Kiosk
        </h1>
      </header>

      <section className="max-w-4xl mx-auto">
        <table className="w-full border-collapse bg-[#292929] rounded-xl overflow-hidden">
          <thead className="bg-[#364b84]">
            <tr>
              <th className="text-left p-3">Produkt</th>
              <th className="p-3 text-center">Idag</th>
              <th className="p-3 text-center">Förra veckan</th>
              <th className="p-3 text-center">Utveckling</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((item) => (
              <tr key={item.title} className="border-b border-gray-700">
                <td className="p-3">{item.title}</td>
                <td className="p-3 text-center">{item.today}</td>
                <td className="p-3 text-center">{item.lastWeek}</td>
                <td
                  className={`p-3 text-center font-semibold ${
                    item.difference > 0
                      ? "text-green-400"
                      : item.difference < 0
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  {item.difference > 0 ? "+" : ""}
                  {item.difference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
