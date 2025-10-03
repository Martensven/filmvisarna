import { useState } from "react";
import { useNavigate, Link } from "react-router";

export default function Login({ onSwitchToRegister, onSwitchToForgot, onClose}: { onSwitchToRegister: () => void; onSwitchToForgot: () => void; onClose: (callback?: () => void) => void}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if(!email.includes("@") || !password) {
            setError("Din e-postadress eller lösenord är felaktigt");
            return;
        }

        if (password !== "123456") {
            setError("Din e-postadress eller lösenord är felaktigt");
            return;
        }

        setError(null);
        console.log("Login successful:", { email });

        navigate("/my-page");
        onClose();
    };

    return (
        <section className="rounded p-5 flex flex-col m-5">
            <h1 className="text-4xl">Logga In</h1>

            <form className="flex flex-col m-4">
                <h2 className="my-2">E-Post</h2>
                <input className="bg-[#243365] my-1 p-2 rounded-md shadow-md text-gray-400" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Din E-Post" />

                <h2 className="my-2">Lösenord</h2>
                <input className="bg-[#243365] my-1 p-2 rounded-md shadow-md text-gray-400" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Ditt Lösenord" />
                <Link to="#" onClick={(e) => { e.preventDefault(); onSwitchToForgot();}} className="text-xs mt-1 underline">
                Glömt ditt lösenord?</Link>

                {error && <p className="bg-red-600 text-sm mt-3 p-3 rounded-md shadow-md">{error}</p>}
                <button type="submit" onClick={handleLogin} className="bg-[#243365] cursor-pointer my-3 p-4 self-center rounded-md shadow-md w-1/2">Logga In</button>
            </form>

            <button onClick={onSwitchToRegister} className="mt-1 underline cursor-pointer">Har inget konto? Skapa här</button>
        </section>
    );
}
