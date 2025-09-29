import CalenderComponent from "./CalenderComponent";
import SeatsTheater from "./SeatsTheater";

export default function MovieInformation() {
  return (

    <main className="flex flex-col justify-center items-center w-full h-auto
    md:flex md:flex-row md:justify-around md:w-screen md:h-100">
      {/*----------Container for movie poster and title, Genre, age and time----------*/}
      <section className="flex flex-row items-center justify-center container_box w-86 h-70 mb-5 
      md:flex md:w-3/5 md:h-86 md:justify-center md:itmes-center md:m-2 
      lg:w-4/5 lg:h-80">

        {/*----------Container for movie poster----------*/}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jaws_movie_poster.jpg/640px-Jaws_movie_poster.jpg"
          alt="FILM POSTER"
          className="flex justify-center items-center w-36 h-auto rounded-md p-1
           sm:w-50 h-auto
           md:w-2/6 md:h-auto md:m-5 lg:h-100 "
        />

        {/*----------Container movie info ----------*/}
        <article className="flex flex-col h-62 ml-1 text-[#e4e1e1]
        sm:
        md:w-2/5 md:m-1 
        lg:flex lg:justify-center lg:items-center lg:m-2">
          <h1 className="flex items-center w-44 h-12 text-left pl-2 text-lg
           md:w-45 md:text-xl lg:m-1">
            Jaws
          </h1>
          <ul className=" w-44 h-25 text-left ml-2 md:w-45 md:text-sm lg:m-1">
            <li className="text-xs p-0.5">År: 1975</li>
            <li className="text-xs p-0.5">Genre: Thriller/Horror</li>
            <li className="text-xs pt-2 antialiased">”När en jättelik vithaj dödligt attackerar simmare vid Amity Islands stränder slår sig sheriff Martin Brody ihop med en marinbiolog och en lokal fiskare för att jaga varelsen.”</li>
            </ul>
        </article>
      </section>


      {/*----------Container for chosing date and tickets----------*/}
      <section className="flex flex-col justify-center items-center container_box w-86 h-auto 
       sm:h-46
       md:w-auto md:min-h-86 md:max-h-86 md:m-2 md:flex md:justify-center md:items-center lg:h-80">
        {/*----------Continer for date and tickets components----------*/}
          <section className="flex flex-col justify-center w-auto md:flex-col md:justify-center md:items-center md:w-72 md:h-40">
            <CalenderComponent />
          </section>

          <section className="flex flex-row justify-center w-80 h-auto mt-5 mb-5 container_content md:w-72 md:flex-col md:justify-center md:items-center">
            <SeatsTheater />
          </section>
      </section>
      </main>
  );
}
