import {Link} from "react"
import TheaterView from "./TheaterView";

export default function SeatsTheater() {
const seats = [1,2,3,4,5,6,7,8,9,10,11,12]


  return (
    <main className="flex flex-col justify-center items-center w-86">
      <h2 className="text-[#e4e1e1] text-s m-2 md:text-s">Biljetter</h2>
      <section className="flex flex-row justify-content items-center">
        <button className="seat_range_buttons w-7 h-7 mr-5 align">-</button>
        <p className="text-m ml-2 mr-2">1</p>
        <button className="seat_range_buttons w-7 h-7 ml-5">+</button>
      </section>
      <button className="main_buttons w-36 m-4">
        Välj
      </button>
    </main>
  );
}
