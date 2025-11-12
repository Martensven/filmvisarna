import FAQ from "./components/prevBookings.tsx";
import FetchBookings from "./components/fetchBookings.tsx";
import FetchUserInfo from "./components/fetchUserInfo.tsx";


export default function MyPage() {


    return (
        <main className="w-10/12 rounded-md shadow-md flex flex-col items-center justify-center mx-auto mt-14 p-6 shadow-mg text-white  glass_effect">

            <FetchUserInfo />
            <FetchBookings />
            <FAQ />

        </main>
    );
}
