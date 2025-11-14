import { useState } from "react";
import { useParams } from "react-router";
import "./../../Pages/BookingPage/BookingPageStyle.css"

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [message, setMessage] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const respond = await fetch(`/api/forgotPass/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await respond.json();
      setMessage(data.message || data.error);

      
    } catch (err) {
      console.error(err);
      setMessage("Något gick fel, försök igen");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col justify-center items-center mt-20">
      <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <h1>Återställ lösenord</h1>
        <input
          type="password"
          placeholder="Nytt lösenord"
          value={password}
          onChange={(e) => setNewPassword(e.target.value)}
          className="container_box w-50 h-10 my-1 mx-2 rounded-md shadow-md text-gray-300 text-center"
          required
        />
         <h2 className="my-2">Bekräfta Lösenord</h2>
            <input
                className="container_box w-50 h-10 my-1 mx-2 rounded-md shadow-md text-gray-300 text-center"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Skriv lösenord igen"
            />

        <button type="submit" disabled={loading} className="main_buttons w-45 h-15 mt-5 p-2">
          Återställ Lösenordet
        </button>
        {message && <p>{message}</p>}
      </form>
        
    </section>
  );
}
