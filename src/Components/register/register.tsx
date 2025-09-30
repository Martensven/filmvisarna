import { useNavigate } from "react-router-dom";

export default function Register({ onSwitchToLogin, onClose }: { onSwitchToLogin: () => void; onClose: (callback?: () => void) => void; }) {
    const navigate = useNavigate();
    
    const handleRegister = () => {
        navigate("/my-page");
        onClose();
    };

    return (
        <section className="rounded p-5 flex flex-col m-5">
            <h1 className="text-4xl">Skapa ditt konto</h1>

            <form className="flex flex-col m-4">
                <h2 className="my-2">E-Post</h2>
                <input className="bg-[#243365] my-1 p-2 rounded text-gray-400" type="text" placeholder="Din E-Post" />

                <h2 className="my-2">Lösenord</h2>
                <input className="bg-[#243365] my-1 p-2 rounded text-gray-400" type="password" placeholder="Ditt Lösenord" />
            </form>
            <button onClick={handleRegister} className="bg-[#243365] cursor-pointer my-3 p-4 self-center rounded w-1/2">Skapa konto</button>

            <button onClick={onSwitchToLogin} className="mt-1 underline cursor-pointer">Har du redan ett konto? Logga in här </button>
        </section>
    );
}
