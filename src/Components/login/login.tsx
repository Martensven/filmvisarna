import { Link } from "react-router";

export default function Login() {
    return (
        <section className="border p-5 flex flex-col m-5">
            <h1 className="text-4xl">Logga In</h1>

            <form className="flex flex-col m-4">
            <h2 className="my-2">E-Post</h2>
            <input className="my-1 p-2 border" type="text" placeholder="Din E-Post" />

            <h2 className="my-2">Lösenord</h2>
            <input className="my-1 p-2 border" type="password" placeholder="Din Lösenord" />
            <Link to={"/forgot-password"} className="text-xs">Glömt ditt lösenord?</Link>

            </form>
            <button className="cursor-pointer my-3 border p-4">Logga In</button>

            <Link to="/register" className="text-purple-900">Har ingen konto? Skapa här</Link>
        </section>
    );
}
