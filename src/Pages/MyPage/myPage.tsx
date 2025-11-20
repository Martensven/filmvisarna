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
    <main className="w-11/12 rounded-md shadow-md flex flex-col items-center justify-center mx-auto mt-14 p-2 shadow-mg text-white glass_effect
    lg:flex-col">
      <section className="mt-5 mb-10
      lg:flex lg:flex-col">
        <h1 className="text-xl lg:text-2xl">
          {user ? (
            <>
              Hej <span>{user.firstName}!</span>
            </>
          ) : (
            "Hej!"
          )}
        </h1>
        <p className="text-sm lg:text-lg">
          Det här är "Mina Sidor", här kan du redigera din information och se
          aktuella bokningar samt dina tidigare bokningar.
        </p>
      </section>

      <article className="flex flex-col w-11/12 mb-20 popOut-box">
        <span className="text-[60px] mx-5 my-5 ">
          <VscAccount />
        </span>
        <FetchUserInfo />
      </article>

      <article className="popOut-box flex flex-col justify-center items-center w-11/12 mb-20 py-5 px-5">
        <FetchBookings />
         <FAQ />
      </article>
     
    </main>
  );
}
