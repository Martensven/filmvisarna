interface RegisterProps {
  onSwitchToLogin?: () => void;
}

export default function Register({ onSwitchToLogin }: RegisterProps) {
    return (
        <section className="border rounded p-5 flex flex-col m-5">
            <h1 className="text-4xl">Skapa ditt konto</h1>

            <form className="flex flex-col m-4">
                <h2 className="my-2">E-Post</h2>
                <input className="my-1 p-2 border rounded" type="text" placeholder="Din E-Post" />

                <h2 className="my-2">Lösenord</h2>
                <input className="my-1 p-2 border rounded" type="password" placeholder="Ditt Lösenord" />

            </form>
            <button className="cursor-pointer my-3 p-4 border rounded">Skapa konto</button>

            <button onClick={onSwitchToLogin} className="text-purple-900 underline cursor-pointer"> Har du redan ett konto? Logga in här </button>
        </section>
    );
}
