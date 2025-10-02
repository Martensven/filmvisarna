import { useState } from "react";

export default function ForgotPassword({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would normally call your backend to send reset email
    console.log("Send reset link to:", email);

    setSubmitted(true);
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
            <button type="submit" className="cursor-pointer mt-4 mb-3 p-2 bg-[#243365] md:w-2/3 self-center rounded-md shadow-md">
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
            Om adressen finns registrerad har vi skickat en återställningslänk till <b>{email}</b>.
          </p>
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