import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({
    onSwitchToLogin,

}: {
    onSwitchToLogin: () => void;
    onClose: (callback?: () => void) => void;
}) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string[]>([]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: string[] = [];

        if (!firstName.trim()) newErrors.push("Förnamn är obligatoriskt.");

        if (!lastName.trim()) newErrors.push("Efternamn är obligatoriskt.");

        if (!phoneNumber.trim()) newErrors.push("Telefonnummer är obligatoriskt.");

        if (!email) newErrors.push("E-post är obligatoriskt.");

        else if (!email.includes("@")) newErrors.push("Ange en giltig e-postadress.");

        if (!password) newErrors.push("Lösenord är obligatoriskt.");

        else if (password.length < 6)
            newErrors.push("Lösenordet måste vara minst 6 tecken långt.");

        if (confirmPassword !== password)
            newErrors.push("Lösenorden matchar inte.");

        if (newErrors.length > 0) {
            setError(newErrors);
            return;
        }

        // ✅ Skicka till backend
        try {
            const response = await fetch("/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password, phoneNumber }),
            });

            if (!response.ok) {
                throw new Error("Registrering misslyckades.");
            }

            const data = await response.json();

            // ✅ Navigate to front page and slide in the login window
            onSwitchToLogin();
            navigate("/");

        } catch (error: any) {
            console.error("Error registering user:", error);
            setError([error.message]);
        }
    };

    return (
        <section className="rounded p-5 mx-7 flex flex-col">
            <h1 className="text-4xl">Skapa ditt konto</h1>

            <form className="flex flex-col m-4" onSubmit={handleRegister}>
                <h2 className="my-2">Förnamn</h2>
                <input
                    className="bg-[#243365] my-1 p-2 rounded-md shadow-md text-gray-400"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ditt Förnamn"
                />

                <h2 className="my-2">Efternamn</h2>
                <input
                    className="bg-[#243365] my-1 p-2 rounded-md shadow-md text-gray-400"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ditt Efternamn"
                />

                <h2 className="my-2">E-Post</h2>
                <input
                    className="bg-[#243365] my-1 p-2 rounded-md shadow-md text-gray-400"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Din E-Post"
                />

                <h2 className="my-2">Telefonnummer</h2>
                <input
                    className="bg-[#243365] my-1 p-2 rounded-md shadow-md text-gray-400"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ditt Telefonnummer"
                />

                <h2 className="my-2">Lösenord</h2>
                <input
                    className="bg-[#243365] my-1 p-2 rounded-md shadow-md text-gray-400"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ditt Lösenord"
                />

                <h2 className="my-2">Bekräfta Lösenord</h2>
                <input
                    className="bg-[#243365] my-1 p-2 rounded-md shadow-md text-gray-400"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Skriv Lösenord Igen"
                />

                {error.length > 0 && (
                    <ul className="bg-red-600 text-sm mt-3 p-3 rounded-md shadow-md">
                        {error.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                )}

                <button
                    type="submit"
                    className="bg-[#243365] cursor-pointer mt-3 p-4 self-center rounded-md shadow-md md:w-1/2"
                >
                    Skapa konto
                </button>
            </form>

            <button
                onClick={onSwitchToLogin}
                className="my-3 underline cursor-pointer"
            >
                Har du redan ett konto? Logga in här
            </button>
        </section>
    );
};
