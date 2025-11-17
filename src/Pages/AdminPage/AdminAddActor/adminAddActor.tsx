import { useState } from "react";

export type Actor = {
  firstName: string;
  lastName: string;
};

export default function AdminAddActor() {
  const [actor, setActor] = useState<Actor>({ firstName: "", lastName: "" });

  const handleSave = async () => {
    const response = await fetch("/api/admin/add-actor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actor),
    });

    if (!response.ok) {
      console.error("Kunde inte spara skådespelare");
      return;
    }

    console.log("Skådespelare sparad!");
  };

  return (
    <div className="w-full md:w-3/12 justify-center flex flex-col gap-4 p-6 bg-[#243365] rounded-lg shadow-md">
      <h2 className="text-white">Lägg till skådespelare</h2>

      <input
        type="text"
        placeholder="Förnamn"
        value={actor.firstName}
        onChange={(e) => setActor({ ...actor, firstName: e.target.value })}
        className="text-black bg-white px-2 py-1 rounded"
      />

      <input
        type="text"
        placeholder="Efternamn"
        value={actor.lastName}
        onChange={(e) => setActor({ ...actor, lastName: e.target.value })}
        className="text-black bg-white px-2 py-1 rounded"
      />

      <button onClick={handleSave}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
      >
        Spara skådespelare
      </button>
    </div>
  );
}
