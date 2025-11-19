import { useState } from "react";

export type Distributor = {
  name: string;
};

type Props = {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
};


export default function AdminAddDistributor({ onSuccess, onError }: Props) {
  const [distributor, setDistributor] = useState<Distributor>({ name: "" });
  const handleSave = async () => {
    const response = await fetch("/api/admin/distributors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(distributor),
    });
      try {
      
      if (!response.ok) {
          onError(`Kunde inte spara distributör ${distributor.name}`);
          return;
        }
        onSuccess(`Distributör ${distributor.name} sparad!`);
        setDistributor({ name: "" });
      }
      catch (error) {
        console.error("Error adding distributor:", error);
        onError("Ett fel uppstod vid sparande av distributör.");
      }
    
    
  };

  return (
    <div className="mb-4 p-4 border border-gray-600 md:rounded-xl bg-[#243365] w-full md:max-w-sm">
      <h2 className="text-xl text-white mb-4">Lägg till distributör</h2>
      <label className="block mb-2">
        Namn:
        <input
          type="text"
          value={distributor.name}
          onChange={(e) => setDistributor({ ...distributor, name: e.target.value })}
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

  
