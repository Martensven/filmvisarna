import { useState } from "react";

export type Actor = {
  name: string;
};

type Props = {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
};


export default function AdminAddActor({ onSuccess, onError }: Props) {
  const [actor, setActor] = useState<Actor>({ name: "" });
  const handleSave = async () => {
    const response = await fetch("/api/admin/actors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actor),
    });
      try {
      
      if (!response.ok) {
          onError(`Kunde inte spara skådespelare ${actor.name}`);
          return;
        }
        onSuccess(`Skådespelare ${actor.name} sparad!`);
        setActor({ name: "" });
      }
      catch (error) {
        console.error("Error adding actor:", error);
        onError("Ett fel uppstod vid sparande av skådespelare.");
      }
    
    
  };

  return (
    <div className="mb-4 p-4 border border-gray-600 md:rounded-xl bg-[#243365] w-full md:max-w-sm">
      <h2 className="text-xl text-white mb-4">Lägg till skådespelare</h2>
      <label className="block mb-2">
        Namn:
        <input
          type="text"
          value={actor.name}
          onChange={(e) => setActor({ ...actor, name: e.target.value })}
          className="w-full p-2 text-black bg-white rounded border border-gray-400"
        />
      </label>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300 cursor-pointer"
      >
        Spara
      </button>
    </div>
  );
}

  
