import { useNavigate, Link } from "react-router";

export default function Login({ onSwitchToRegister, onClose,}: { onSwitchToRegister: () => void; onClose: (callback?: () => void) => void}) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/my-page");
        onClose();
    };

    return (
        <section className="rounded p-5 flex flex-col m-5">
            <h1 className="text-4xl">Logga In</h1>

            <form className="flex flex-col m-4">
                <h2 className="my-2">E-Post</h2>
                <input className="bg-[#243365] my-1 p-2 rounded text-gray-400" type="text" placeholder="Din E-Post" />

                <h2 className="my-2">Lösenord</h2>
                <input className="bg-[#243365] my-1 p-2 rounded text-gray-400" type="password" placeholder="Ditt Lösenord" />
                <Link to={"/forgot-password"} className="text-xs mt-1">Glömt ditt lösenord?</Link>
            </form>
            <button onClick={handleLogin} className="bg-[#243365] cursor-pointer my-3 p-4 self-center rounded w-1/2">Logga In</button>

            <button onClick={onSwitchToRegister} className="mt-1 underline cursor-pointer">Har inget konto? Skapa här</button>
        </section>
    );
}
