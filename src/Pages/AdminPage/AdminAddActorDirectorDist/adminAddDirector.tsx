import { useState } from "react";

export type Director = {
  name: string;
};

type Props = {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
};


export default function AdminAddDirector({ onSuccess, onError }: Props) {
  const [director, setDirector] = useState<Director>({ name: "" });
  const handleSave = async () => {
    const response = await fetch("/api/admin/directors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(director),
    });
      try {
      
      if (!response.ok) {
          onError(`Kunde inte spara regissör ${director.name}`);
          return;
        }
        onSuccess(`Regissör ${director.name} sparad!`);
        setDirector({ name: "" });
      }
      catch (error) {
        console.error("Error adding director:", error);
        onError("Ett fel uppstod vid sparande av regissör.");
      }
    
    
  };

  return (
    <div className="mb-4 p-4 border border-gray-600 md:rounded-xl bg-[#243365] w-full md:max-w-sm">
      <h2 className="text-xl text-white mb-4">Lägg till regissör</h2>
      <label className="block mb-2">
        Namn:
        <input
          type="text"
          value={director.name}
          onChange={(e) => setDirector({ ...director, name: e.target.value })}
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

  
