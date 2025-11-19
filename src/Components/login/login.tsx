import { useState } from "react";
import { useAuth } from "../../context/authContext";

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

    // const handleLogout = async () => {
    //     await logout();
    //     onClose();
    // };

    // ✅ Om användaren redan är inloggad → visa Logga ut
    // if (user) {
    //     return (
    //         <section className="rounded p-6 flex flex-col m-5 text-center text-white">
    //             {/* <h1 className="text-3xl mb-4 font-semibold">Du är redan inloggad</h1> */}
    //             <button
    //                 onClick={handleLogout}
    //                 className="bg-red-500 hover:bg-red-600 cursor-pointer my-3 p-3 rounded-md shadow-md w-40 mx-auto"
    //             >
    //                 Logga ut
    //             </button>
    //         </section>
    //     );
    // }

    return (
        <section className="rounded p-5 flex flex-col m-5 text-white">
            <h1 className="text-4xl">Logga In</h1>

            <form className="flex flex-col m-4" onSubmit={handleLogin}>
                <h2 className="my-2">E-Post</h2>
                <input
                    autoFocus
                    className="bg-[#243365] p-2 rounded-md shadow-md text-gray-200"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Din E-Post"
                    required
                />

                <h2 className="my-2">Lösenord</h2>
                <input
                    className="bg-[#243365] p-2 rounded-md shadow-md text-gray-200"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ditt Lösenord"
                    required
                />

                <button
                    type="button"
                    onClick={onSwitchToForgot}
                    className="text-xs mt-1 underline text-blue-300 hover:text-blue-400 self-start ml-2"
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
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 cursor-pointer my-3 p-4 self-center rounded-md shadow-md w-1/2"
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
