export default function KioskPage() {
  return (
    <main className="w-screen flex flex-col border-2 px-20">
      <section className="w-full">
        <header className="text-center border-2 border-blue-500">
          <h1 className="text-center text-2xl">Kiosk</h1>
          <h2 className="text-center text-xl">Vårt utbud i kiosken</h2>
        </header>
        <section className="w-full flex flex-wrap justify-center items-center gap-10 border-2 border-red-500">
          <article className="w-48 h-64 border-2 flex flex-col justify-center items-center p-4">
          <h3 className="text-lg font-semibold">Cola</h3>
          <p className="text-sm text-gray-600">50cl</p>
          <p className="text-sm text-gray-600">25kr</p>
          </article>
        </section>
      </section>

    </main>
  );
}
