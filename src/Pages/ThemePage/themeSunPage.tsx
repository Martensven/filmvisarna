import Slideshow from "../../Components/themepageSlideshow/slideshowComponent";

export default function ThemeSundayPage() {

    return (
        <main className="w-screen">
            <article className="flex flex-wrap justify-center mt-5">
                <h2 className="text-3xl rounded-md shadow-md p-4 my-3 text-yellow-400 bg-[#243365]">Svenska Söndagen</h2>
                <section className="flex m-6 xs:flex-col xs:items-center lg:flex-row lg:justify-center">
                    <Slideshow day="sunday" />
                    <p className="rounded-md shadow-md xs:my-4 lg:mx-5 p-2 lg:w-2/4 lg:h-72 text-yellow-400 bg-[#243365]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuxsod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </section>
            </article>
        </main>
    );
}