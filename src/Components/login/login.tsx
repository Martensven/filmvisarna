import { Link } from "react-router";

export default function Login() {
    return (
        <>
            <h1>Logga in</h1>
            <Link to="/register">Registrera konto</Link>
        </>
    );
}
