import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import "./../../../index.css"


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
            <section className="mb-8 text-center leading-loose flex flex-col items-center justify-center w-full text-black">
                <h2 className="text-lg font-bold mb-2 ">Användarinformation:</h2>
                {!editMode ? (
                    <>
                        <p className="text-base">Namn: {`${formData.firstName} ${formData.lastName}`}</p>
                        <p className="text-base">Email: {formData.email}</p>
                        <p className="mb-4">Telefon: 0{formData.phoneNumber}</p>

                        <button onClick={() => setEditMode(true)} className="main_buttons_red cursor-pointer mb-4 text-sm py-2 px-2">
                            Redigera information
                        </button>
                    </>
                ) : (
                    <article className="w-full flex flex-col gap-3 mb-4 justify-center items-center">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="p-2 my-2 border-1 border-grey-500  rounded w-10/12"
                            placeholder="Förnamn" />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="p-2 my-2 border-1 border-grey-500  rounded w-10/12"
                            placeholder="Efternamn" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-2 my-2 border-1 border-grey-500 rounded w-10/12"
                            placeholder="Email" />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="p-2 my-2 border-1 border-grey-500 rounded w-10/12"
                            placeholder="Telefonnummer" />

                        <section className="flex gap-2 justify-center">
                            <button onClick={handleSave} disabled={updating} className="px-2 py-2 cursor-pointer main_buttons text-sm">
                                {updating ? "Sparar...." : "Sparar ändringar"}
                            </button>
                            <button onClick={() => setEditMode(false)} className="px-2 py-2 cursor-pointer main_buttons text-sm">
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

