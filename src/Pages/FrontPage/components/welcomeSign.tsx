import { useAuth } from "../../../context/authContext";

export default function WelcomeSign() {
    const { user } = useAuth();

    return (
        <section className="welcome-sign w-10/12 h-50 mb-5
      sm:w-9/12
      md:w-8/12 md:mb-40
      lg:w-8/12 lg:mb-40">
            <article className="w-full border-t-2 border-b-2 border-[#737373] mt-2 
        lg:mt-3">
                <h1
                    className="text-center text-base mt-1 mb-1 font-bold
        sm:text-xl
        md:text-2xl
        lg:text-2xl"
                >
                    {user ? (
                        <>
                            VÄLKOMMEN TILL FILMSMEDJAN,{" "}
                            <span className="text-black font-bold uppercase">
                                {user.firstName}!
                            </span>
                        </>
                    ) : (
                        "VÄLKOMMEN TILL FILMSMEDJAN!"
                    )}
                </h1>
            </article>

            <article className="w-full border-b-2 border-[#737373]">
                <p
                    className="text-center text-[10px] font-bold my-2 uppercase
            sm:text-base
            md:text-base
            lg:text-base"
                >
                    Stort utbud av filmer från 1900-tal till 2000-tal.
                </p>
            </article>

            <article className="w-full border-b-2 border-[#737373] mt-1 mb-1
        lg:mb-3">
                <p className="mt-1 mb-1 font-bold text-sm uppercase
          lg:text-lg">
                    &#9733;  Boka din bioupplevelse hos oss  &#9733;</p>
            </article>
        </section>
    );
}