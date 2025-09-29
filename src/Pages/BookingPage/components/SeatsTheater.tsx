
import { useState} from "react"

export default function SeatsTheater() {
  //Creating useState method to give user a ticket counter. 
const [countTickets, setCountTickets] = useState<number>(1); //Always a start with 1
const increment:React.MouseEventHandler<HTMLButtonElement> = () => {setCountTickets(prev => prev + 1);}
const decrement:React.MouseEventHandler<HTMLButtonElement> = () => {setCountTickets(prev => (prev > 0 ? prev - 1:0));} //decrement but prevents a number under 0

  return (
    <main className="flex flex-col justify-center items-center w-86">
      <div className="flex flex-row justify-between w-72">
      <h2 className="text-[#e4e1e1] text-s m-2 md:text-s">Biljetter</h2>
      <section className="flex flex-row justify-content items-center">
        <button className="seat_range_buttons w-7 h-7 mr-5 align cursor-pointer" onClick={decrement} aria-label="Minska biljetter">-</button>
        <p className="text-m ml-2 mr-2">{countTickets}</p>
        <button className="seat_range_buttons w-7 h-7 ml-5 cursor-pointer" onClick={increment} aria-label="Öka biljetter">+</button>
      </section>
      </div>

      <button className="main_buttons w-36 m-4 cursor-pointer">
        Välj
      </button>
    </main>
  );
}
