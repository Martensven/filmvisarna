

export default function MovieInformation() {
  return (

    <main className="w-screen md:flex md:flex-row md:justify-around md:w-screen md:h-100">
      {/*----------Container for movie poster and title, Genre, age and time----------*/}
      <section className="flex flex-row items-center justify-center container_box h-76 
      md:flex md:w-3/5 md:h-86 md:justify-center md:itmes-center md:m-2 
      lg:w-4/5 lg:h-80">

        {/*----------Container for movie poster----------*/}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jaws_movie_poster.jpg/640px-Jaws_movie_poster.jpg"
          alt="FILM POSTER"
          className="w-50 h-60 m-1 rounded-sm
           sm:w-50 h-70 mr-8 
           md:w-2/6 md:h-76 md:m-5 lg:h-100 "
        />

        {/*----------Container movie info ----------*/}
        <article className="flex flex-col container_content h-40 ml-1
        md:w-2/5 md:m-1 
        lg:flex lg:justify-center lg:items-center lg:m-2">
          <h1 className="flex items-center w-44 h-15 text-left pl-6
           md:w-45 md:text-xl lg:m-1">
            Jaws
          </h1>
          <ul className=" w-44 h-25 text-left ml-2 md:w-45 md:text-sm lg:m-1">
            <li className="p-1">År:</li>
            <li className="p-1">Genre:</li>
            <li className="p-1">Handling:</li>
            </ul>
        </article>
      </section>
      {/*----------Container for chosing date and tickets----------*/}
      <section className="flex flex-col justify-center items-center container_box h-36 w-screen
       sm:h-46
       md:w-auto md:min-h-86 md:max-h-86 md:m-2 md:flex md:justify-center md:items-center lg:h-80">
        {/*----------Container for chosing the amount of people that need tickets----------*/}
        <article className="flex flex-col items-center w-screen h-34 md:w-auto md:h-65">
          <section className="flex flex-col justify-center w-auto md:flex-col md:justify-center md:items-center md:w-72 md:h-40">
            <h2 className="text-[#e4e1e1] text-sm md:text-s">DATUM</h2>

            {/*----------Containers for calender days----------*/}
            <section className="flex flex-row m-1 container_content w-screen h-15 overflow-x-auto overflow-y-hidden
             md:w-4/5 md:h-34">
              <span className="flex flex-row ">
                <ul className="container_box w-full md:w-20 md:h-32 md:text-xs">
                  <li>Datum: 00/0 XXXXX</li>
                  <li>Tid: 15:00</li>
                  <li>Salong: 1</li>
                </ul>
                <ul className="container_box w-full md:w-20 md:h-32 md:text-xs">
                  <li>Datum: 00/0 XXXXX</li>
                  <li>Tid: 15:00</li>
                  <li>Salong: 1</li>
                </ul>
                <ul className="container_box w-full md:w-20 md:h-32 md:text-xs">
                  <li>Datum: 00/0 XXXXX</li>
                  <li>Tid: 15:00</li>
                  <li>Salong: 1</li>
                </ul>
                <ul className="container_box w-full md:w-20 md:h-32 md:text-xs">
                  <li>Datum: 00/0 XXXXX</li>
                  <li>Tid: 15:00</li>
                  <li>Salong: 1</li>
                </ul>
                  <ul className="container_box w-full md:w-20 md:h-32 md:text-xs">
                  <li>Datum: 00/0 XXXXX</li>
                  <li>Tid: 15:00</li>
                  <li>Salong: 1</li>
                </ul>
              </span>
            </section>
          </section>

          <section className="flex flex-row justify-center w-40 md:w-72 md:flex-col md:justify-center md:items-center">
            <h2 className="text-[#e4e1e1] text-sm md:text-s">ANTAL STOLAR</h2>
            <select className="md:w-20 md:h-5"></select>
          </section>
        </article>
      </section>
      </main>
  );
}
