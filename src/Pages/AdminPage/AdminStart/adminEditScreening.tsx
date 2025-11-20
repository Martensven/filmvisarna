import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ConfirmModal from "../Components/ConfirmModal/confirmModal";
import Toast from "../../../toast/toast";

export default function AdminEditScreening() {
  // Using Params to get the id from the URL to get the screening to edit
  const { id } = useParams();
  const nav = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [time, setTime] = useState("");
  const [screeningData, setScreeningData] = useState<{
    movieTitle: string;
    auditoriumName: string;
    id: string;
    date: string;
    time: string;
  } | null>(null);

  // toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Fetching screening data
  useEffect(() => {
    const fetchScreening = async () => {
      const screeningRes = await fetch(`/api/admin/screenings/${id}`);
      const screeningData = await screeningRes.json();
      setScreeningData(screeningData);
      setTime(screeningData.time);
    };
    fetchScreening();
  }, [id]);

  const handleSave = async () => {
    const res = await fetch(`/api/admin/screenings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time }),
    });

    if (!res.ok) {
      setToastType("error");
      setToastMessage("Fel vid uppdatering");
      return;
    }

    setToastType("success");
    setToastMessage("Visning uppdaterad!");

    setTimeout(() => {
      nav("/admin");
    }, 2000);
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/admin/screenings/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setToastType("error");
      setToastMessage("Fel vid radering");
      return;
    }

    setToastType("success");
    setToastMessage("Visning raderad!");

    setTimeout(() => {
      nav("/admin");
    }, 600);
  };

  return (
    <div className="p-6 bg-[#243365] text-white max-w-2xl mx-auto rounded-xl min-h-[70vh] flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Ändra Visning</h1>
      <h2 className="text-xl">{screeningData?.movieTitle}</h2>
      <p>{screeningData?.auditoriumName}</p>
      <span className="">{screeningData?.id}</span>

      <label className="flex flex-col">
        Tid:
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded-md mt-1 border border-gray-300 text-black bg-white"
        />
      </label>

      <button onClick={handleSave} className="bg-green-500 p-2 rounded-md cursor-pointer">
        Spara
      </button>
      <button onClick={() => setShowConfirmModal(true)} className="bg-red-500 p-2 rounded-md cursor-pointer">
        Ta bort visningen
      </button>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
      {showConfirmModal && (
        <ConfirmModal
          title="Bekräfta radering"
          message={`Är du säker på att du vill ta bort visningen för ${screeningData?.movieTitle} den ${screeningData?.date} kl ${screeningData?.time}?`}
          onConfirm={() => {
            handleDelete();
            setShowConfirmModal(false);
          }}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}
