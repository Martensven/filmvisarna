import "./LoggoStylesheet.css"


export default function LoggoComponent(){

    return(
        <main className="Loggo-box ml-10 w-42 h-22 relative
        xs:w-40 xs:h-20 xs:ml-5
        sm:ml-10
        md:ml-10 md:w-46 md:h-24
        lg:ml-15">
            <h1 className="h1-font m-0 p-0 absolute top-5 text-lg
            xs:text-base xs:top-5 
            md:text-lg md:top-7 
            lg:text-2xl lg:top-6">FILMVISARNA</h1>
            <h2 className="h2-font flex flex-row m-0 p-0 text-red-200 absolute top-11 text-xs
            xs:text-xs xs:top-10
            md:text-sm md:top-12  
            lg:top-12">
                <div className="flicker-fast-effect">F</div>
                ILMER 
                <div className="flicker-slow-effect ml-1 ">F</div>
                RÅN <div className="flicker-fast-effect ml-1">F</div>
                ÖRR</h2>
        </main>
    )
}