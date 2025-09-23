import { Link } from "react-router";

export default function Login() {
    return (
        <section className="border p-5">
            <h1 className="text-4xl">Logga in</h1>

            <form className="flex flex-col m-4">
            <h2 className="my-2">Användarnamn</h2>
            <input className="my-1" type="text" placeholder="Din Användarnamn" />

            <h2 className="my-2">Lösenord</h2>
            <input className="my-1" type="password" placeholder="Din Lösenord" />

            <button>Logga In</button>
            </form>

            <Link to="/register">Har ingen konto? Skapa här</Link>
        </section>
    );
}
