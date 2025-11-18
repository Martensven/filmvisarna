import FAQ from "./components/prevBookings.tsx";
import FetchBookings from "./components/fetchBookings.tsx";
import FetchUserInfo from "./components/fetchUserInfo.tsx";
import { useAuth } from "../../context/authContext.tsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";


export default function MyPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return (
        <main className="w-10/12 rounded-md shadow-md flex flex-col items-center justify-center mx-auto mt-14 p-6 shadow-mg text-white  glass_effect">

            <FetchUserInfo />
            <FetchBookings />
            <FAQ />

        </main>
    );
}
