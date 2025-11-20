import { useState } from "react";
import { useAuth } from "../../context/authContext";
import "./../../index.css"

export default function Login({
    onSwitchToRegister,
    onSwitchToForgot,
    onClose,
}: {
    onSwitchToRegister: () => void;
    onSwitchToForgot: () => void;
    onClose: (callback?: () => void) => void;
}) {

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const success = await login(email, password);
        setLoading(false);

        if (!success) {
            setError("Fel e-post eller lösenord");
            return;
        }

        setEmail("");
        setPassword("");
        onClose();
    };


    return (
        <section className="popOut-box p-4 flex flex-col my-7 mx-2 text-black">
            <h1 className="w-6/12 self-center text-4xl p-5">Logga In</h1>

            <form className="flex flex-col m-4 gap-3" onSubmit={handleLogin}>
                <h2 className="my-2">E-Post</h2>
                <input
                    autoFocus
                    className="bg-amber-50 inset-shadow-sm inset-shadow-[#8a6a0094] p-2 rounded-md shadow-md text-gray-950"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Din E-post"
                    required
                />

                <h2 className="my-2">Lösenord</h2>
                <input
                    className="bg-amber-50 inset-shadow-sm inset-shadow-[#8a6a0094] p-2 rounded-md shadow-md text-gray-950"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ditt Lösenord"
                    required
                />

                <button
                    type="button"
                    onClick={onSwitchToForgot}
                    className="text-xs mt-1 underline text-grey-700 hover:text-black self-start ml-2 cursor-pointer"
                >
                    Glömt ditt lösenord?
                </button>

                {error && (
                    <p className="bg-red-600 text-sm mt-3 p-3 rounded-md shadow-md">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="main_buttons cursor-pointer p-3 self-center w-1/2"
                >
                    {loading ? "Loggar in..." : "Logga In"}
                </button>
            </form>

            <button
                onClick={onSwitchToRegister}
                className="mt-1 underline cursor-pointer"
            >
                Har du inget konto? Skapa här
            </button>
        </section>
    );
}
