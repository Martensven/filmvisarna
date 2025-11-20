import FAQ from "./components/prevBookings.tsx";
import FetchBookings from "./components/fetchBookings.tsx";
import FetchUserInfo from "./components/fetchUserInfo.tsx";
import { useAuth } from "../../context/authContext.tsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { VscAccount } from "react-icons/vsc";

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
    <main className="w-11/12 rounded-md shadow-md flex flex-col items-center justify-center mx-auto mt-14 p-2 shadow-mg text-white glass_effect">
      <section className="mt-5 mb-10">
        <h1 className="text-xl">
          {user ? (
            <>
              Hej <span>{user.firstName}!</span>
            </>
          ) : (
            "Hej!"
          )}
        </h1>
        <p className="text-sm">
          Det är är "Mina Sidor", här kan du redigera din information och se
          aktuella bokningar samt dina tidigare bokningar.
        </p>
      </section>

      <article className="popOut-box flex flex-col w-11/12 mb-20">
        <span className="text-[60px] mx-5 my-5 ">
          <VscAccount />
        </span>
        <FetchUserInfo />
      </article>

      <article className="popOut-box flex flex-col w-11/12 mb-20">
        <FetchBookings />
         <FAQ />
      </article>
     
    </main>
  );
}
