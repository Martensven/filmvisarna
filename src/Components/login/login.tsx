import { Link } from "react-router";

interface LoginProps {
  onSwitchToRegister?: () => void;
}

export default function Login({ onSwitchToRegister }: LoginProps) {
    return (
        <section className="border rounded p-5 flex flex-col m-5">
            <h1 className="text-4xl">Logga In</h1>

            <form className="flex flex-col m-4">
                <h2 className="my-2">E-Post</h2>
                <input className="my-1 p-2 border rounded" type="text" placeholder="Din E-Post" />

                <h2 className="my-2">Lösenord</h2>
                <input className="my-1 p-2 border rounded" type="password" placeholder="Ditt Lösenord" />
                <Link to={"/forgot-password"} className="text-xs">Glömt ditt lösenord?</Link>

            </form>
            <Link to={"/my-page"} className="cursor-pointer my-3 p-4 border rounded">Logga In</Link>

            <button onClick={onSwitchToRegister} className="text-purple-900 underline cursor-pointer"> Har inget konto? Skapa här</button>
        </section>
    );
}
