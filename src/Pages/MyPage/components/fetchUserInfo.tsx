import { useState } from "react";
import { useAuth } from "../../../context/authContext";


export default function FetchUserInfo() {
    const { user, loading } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
    });
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    if (loading) return <p className="text-white text-center mt-10">Laddar...</p>;
    if (!user) return <p className="text-white text-center mt-10">Ingen användare inloggad.</p>;

    const handleSave = async () => {
        try {
            setUpdating(true);
            setMessage("");

            const response = await fetch(`/api/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Något gick fel när användarinformation uppdaterades.");
            }

            const updatedUser = await response.json();
            setMessage("Information uppdaterad!");
            setEditMode(false);
            setFormData(updatedUser);
        } catch (error) {
            console.error(error);
            setMessage("Kunde inte uppdatera informationen");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <>
            <section className="mb-8 text-center leading-loose w-10/12 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-2">Användarinformation:</h2>
                {!editMode ? (
                    <>
                    <p>Namn: {`${formData.firstName} ${formData.lastName}`}</p>
                    <p>Email: {formData.email}</p>
                    <p className="mb-4">Telefon: 0{formData.phoneNumber}</p>

                    <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-[#243365] cursor-pointer rounded hover:bg-blue-900 mb-4">
                        Redigera information
                    </button>
                    {user.role === "admin" && (
                    <a
                        href="/admin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Gå till Adminpanel
                    </a>
                )}
                    </>
                ) : (
                    <article className="flex flex-col gap-3 mb-4">
                        <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="p-2 my-2 border-2 border-white rounded text-white"
                        placeholder="Förnamn" />
                        <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="p-2 my-2 border-2 border-white rounded text-white"
                        placeholder="Efternamn" />
                        <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 my-2 border-2 border-white rounded text-white"
                        placeholder="Email" />
                        <input 
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="p-2 my-2 border-2 border-white rounded text-white"
                        placeholder="Telefonnummer" />

                        <section className="flex gap-2 justify-center">
                            <button onClick={handleSave} disabled={updating} className="px-4 py-2 cursor-pointer bg-green-700 rounded hover:bg-green-600">
                                {updating ? "Sparar...." : "Sparar ändringar"}
                            </button>
                            <button onClick={() => setEditMode(false)} className="px-4 py-2 cursor-pointer bg-red-700 rounded hover:bg-red-600">
                                Avbryt
                            </button>
                        </section>
                    </article>
                )}

                {message && <p className="text-sm mt-2">{message}</p>}
            </section>
        </>
    );
}

