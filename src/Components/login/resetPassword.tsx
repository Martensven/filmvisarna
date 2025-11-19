import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import "./../../Pages/BookingPage/BookingPageStyle.css"

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const setValidToken = useState(false)[1];
  const [message, setMessage] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenValidation = async () => {
      try {
        const response = await fetch(`/api/forgotPass/validate/${token}`);
        const data = await response.json();

        if (response.ok) {
          setValidToken(true)
        } else {
          setValidToken(false);
          setMessage(data.error);
        }
      } catch (err) {
        setValidToken(false);
        setMessage("Fel uppstod, försök igen");
      } finally {
        setLoading(false);
      }
    };
    tokenValidation();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Lösenord matchar inte");
      setLoading(false);
      return
    }

    try {
      const respond = await fetch(`/api/forgotPass/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await respond.json();

      if (data.error === "Återställningslänk har gått ut, begär om en ny länk på <strong>Glömt Lösenord</strong>") {
        setMessage(data.error);
        return;
      }

      setMessage(data.message || data.error);

      //Move user to front page if password reset works
      if (respond.ok) {
        setTimeout(() => {
          navigate("/");
        }, 2000)
      }


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
        {message && <p className="text-red-400 mt-5">{message}</p>}
      </form>

    </section>
  );
}
