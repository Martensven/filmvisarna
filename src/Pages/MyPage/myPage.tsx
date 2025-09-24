export default function MyPage() {

    // Mockad data
    const user = {
        name: "Jane Doe",
        email: "janedoe@lorem.ipsum",
        phone: "070 - 000 00 00",
        bookings: [ 
            {movie:"Lorem Ipsum Movie 1", date:"22-09-2025", time:"00:00", seats: ["A1", "A2"]},
            {movie:"Lorem Ipsum Movie 2", date:"22-09-2025", time:"12:00", seats: ["B1", "B2"]},]
    };

    return (
        // Användar info
        <main className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 rounded shadow-lg">
            <section className="mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Användarinformation</h2>
            <p className="text-sm sm:text-base md:text-lg">Email: {user.email}</p>
            <p className="text-sm sm:text-base md:text-lg">Telefon: {user.phone}</p>
            <p className="text-sm sm:text-base md:text-lg mb-4">Profil Information: Lorem ipsum dolor sit amet.</p>
            <button className="px-3 py-2 text-sm sm:text-base bg-blue-500 rounded hover:bg-blue-600 transition duration-200">Redigera information</button>
            </section>
        {/* Bokningar */}
            <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold">Dina bokningar</h2>
                {user.bookings.map((booking, index)=> 
                <section key={index} className="border-b border-gray-700 pb-4 last:border-none last:pb-0">
                    <p className="text-base sm:text-lg font-semibold">{booking.movie}</p>
                    <p className="text-sm sm:text-base md:text-lg">datum:{booking.date} kl:{booking.time}</p>
                    <p className="text-sm sm:text-base md:text-lg">Stol: {booking.seats.join(", ")}</p>
                    <p className="text-sm sm:text-base md:text-lg mb-1">lorem ipsum dolor sit amet.</p>
                    <button className="text-sm text-red-400 hover:underline">Avboka</button>
                </section>
                )}
            </section>
        </main>

    );
}
