
export default function ThemePage() {
    return (
        <>
            <h1 className="text-5xl border p-3 m-4 text-center">Temadagar</h1> 
            
            <article className="flex flex-wrap justify-center">
                <h2 className="text-3xl border p-4 my-3">Tysta Torsdagen</h2>
                <section className="flex m-6 xs:flex-col xs:items-center lg:flex-row lg:justify-center">
                    <img src="./test/Untitled.png" alt="proto" className="max-h-72 max-w-xs lg:max-w-5xl border m-3" />
                    <p className="border xs:m-4 lg:mx-5 p-2 lg:h-72">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </section>

                <h2 className="text-3xl border p-4 my-3">Svenska Söndagen</h2>
                <section className="flex m-6 xs:flex-col xs:items-center lg:flex-row lg:justify-center">
                    <img src="./test/Untitled.png" alt="proto" className="max-h-72 max-w-xs lg:max-w-5xl border m-3" />
                    <p className="border xs:m-4 lg:mx-5 p-2 lg:h-72">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuxsod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </section>
            </article>
        </>
    );
}