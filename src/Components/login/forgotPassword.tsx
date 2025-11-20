import { useState } from "react";

export default function ForgotPassword({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const respond = await fetch("/api/forgotPass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await respond.json();
      setMessage(data.message || data.error);

      setSubmitted(true);
    } catch (err) {
      setMessage("Något gick fel, försök igen");
    }
  };

  return (
    <section className="p-5 flex flex-col m-5">
      {!submitted ? (
        <>
          <h1 className="text-2xl mb-4">Återställ lösenord</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="my-2">E-Post</label>
            <input
              className="my-1 p-2 bg-[#243365] rounded-md shadow-md text-gray-400"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din E-Post"
              required
            />
            <button
              type="submit"
              onClick={() => console.log("klicks togs emot")}
              className="cursor-pointer mt-4 mb-3 p-2 bg-[#243365] md:w-2/3 self-center rounded-md shadow-md"
            >
              Skicka återställningslänk
            </button>
          </form>

          <button
            onClick={onSwitchToLogin}
            className="mt-3 text-sm underline cursor-pointer"
          >
            Tillbaka till login
          </button>
        </>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-2">Kolla din e-post!</h2>
          <p className="bg-[#243365] rounded-md shadow-md p-5">
            Återställningslänk skickas till {email}</p>
            <p>{message && <b>{message}.</b>}</p> {/**Setting the message for either successfull operation or not */}
          <button
            onClick={onSwitchToLogin}
            className="mt-4 text-sm underline cursor-pointer"
          >
            Tillbaka till login
          </button>
        </div>
      )}
    </section>
  );
}
