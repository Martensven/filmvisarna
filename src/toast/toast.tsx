import React, { useEffect } from "react";

export default function Toast({
  message,
  onClose,
  type = "success",
}: {
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className={`fixed bottom-6 right-6 ${bg} text-white px-4 py-2 rounded shadow-lg animate-fade-in z-50`}>
      {message}
    </div>
  );
}
