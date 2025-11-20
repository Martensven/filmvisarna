import { useState } from "react";
import AdminAddActor from "../AdminAddActorDirectorDist/adminAddActor";
import AdminAddDirector from "../AdminAddActorDirectorDist/adminAddDirector";
import AdminAddDistributor from "../AdminAddActorDirectorDist/adminAddDistributor";
import Toast from "../../../toast/toast";

export default function AdminAdd() {
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-20 w-full justify-center items-center my-6 bg-[#ffffff] md:bg-[#ffffff]">

      {/* Skicka funktioner som props */}
      <AdminAddActor
        onSuccess={(msg) => showToast(msg, "success")}
        onError={(msg) => showToast(msg, "error")}
      />

      <AdminAddDirector
        onSuccess={(msg) => showToast(msg, "success")}
        onError={(msg) => showToast(msg, "error")}

      />

      <AdminAddDistributor
        onSuccess={(msg) => showToast(msg, "success")}
        onError={(msg) => showToast(msg, "error")}

      />

      {/* TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
