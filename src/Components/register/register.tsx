export default function Register() {
    return (
        <section className="border p-5 flex flex-col">
            <h1 className="text-4xl">Skapa din konto</h1>

            <form className="flex flex-col m-4">
            <h2 className="my-2">E-Post</h2>
            <input className="my-1 p-2 border" type="text" placeholder="Din E-Post" />

            <h2 className="my-2">Lösenord</h2>
            <input className="my-1 p-2 border" type="password" placeholder="Din Lösenord" />

            </form>
            <button className="cursor-pointer my-3 border p-4">Skapa konto</button>

        </section>
    );
}
