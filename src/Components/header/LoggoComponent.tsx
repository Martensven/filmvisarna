import "./LoggoStylesheet.css"


export default function LoggoComponent(){

    return(
        <main className="Loggo-box ml-30 sticky relative">
            <h1 className="h1-font m-0 p-0 absolute top-6
            lg:text-2xl">FILMVISARNA</h1>
            <h2 className="h2-font flex flex-row m-0 p-0 text-red-200 absolute top-12">
                <div className="flicker-fast-effect">F</div>
                ILMER 
                <div className="flicker-slow-effect ml-1 ">F</div>
                RÅN <div className="flicker-fast-effect ml-1">F</div>
                ÖRR</h2>
        </main>
    )
}