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
    const [successMessage, setSuccessMessage] = useState("");
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

        // ✅ send data to backend
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

            setSuccessMessage("Ditt konto har skapats!");

            // set a timeout to switch to login page after 2.5 seconds
            setTimeout(() => {
                onSwitchToLogin();
                navigate("/");
            }, 2500);

        } catch (error: any) {
            console.error("Error registering user:", error);
            setError([error.message]);
        }


    };

    return (
        <section className="popOut-box p-4 flex flex-col my-7 mx-2 text-black ">
            <h1 className="text-4xl">Skapa ditt konto</h1>

            {/* Popup om registrering lyckas */}
            {
                successMessage && (
                    <div className="popOut-box absolute left-0 top-70 inset-0 text-center w-8/12">
                        <div className=" p-5 rounded-lg shadow-lg animate-fade-in h-48 flex flex-col justify-center items-center">
                            <h2 className="text-xl font-bold mb-2">Registrering lyckades!</h2>
                            <p>{successMessage}</p>
                        </div>
                    </div>
                )}

            <form className="flex flex-col m-4 justify-between" onSubmit={handleRegister}>
                <h2 className="my-2">Förnamn</h2>
                <input
                    className="bg-amber-50 inset-shadow-sm inset-shadow-[#8a6a0094] p-2 rounded-md shadow-md text-gray-950"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ditt Förnamn"
                />

                <h2 className="my-2">Efternamn</h2>
                <input
                    className="bg-amber-50 inset-shadow-sm inset-shadow-[#8a6a0094] p-2 rounded-md shadow-md text-gray-950"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ditt Efternamn"
                />

                <h2 className="my-2">E-Post</h2>
                <input
                    className="bg-amber-50 inset-shadow-sm inset-shadow-[#8a6a0094] p-2 rounded-md shadow-md text-gray-950"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Din E-Post"
                />

                <h2 className="my-2">Telefonnummer</h2>
                <input
                    className="bg-amber-50 inset-shadow-sm inset-shadow-[#8a6a0094] p-2 rounded-md shadow-md text-gray-950"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ditt Telefonnummer"
                />

                <h2 className="my-2">Lösenord</h2>
                <input
                    className="bg-amber-50 inset-shadow-sm inset-shadow-[#8a6a0094] p-2 rounded-md shadow-md text-gray-950"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ditt Lösenord"
                />

                <h2 className="my-2">Bekräfta Lösenord</h2>
                <input
                    className="bg-amber-50 inset-shadow-sm inset-shadow-[#8a6a0094] p-2 mb-10 rounded-md shadow-md text-gray-950"
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
                    className="main_buttons cursor-pointer p-3 self-center"
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
