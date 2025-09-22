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
        <main className="bg-[#24252C] text-white rounded p-6 w-full max-w-xl shadow-lg">
            <section className="">
            <h2 className="text-2xl font-bold mb-2">Användarinformation</h2>
            <p>Email: {user.email}</p>
            <p>Telefon: {user.phone}</p>
            <p>Profil Information: Lorem ipsum dolor sit amet.</p>
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Redigera information</button>
            </section>
        {/* Bokningar */}
            <section className="rounded p-4 space-y-4">
                <h2 className="text-xl font-semibold">Dina bokningar</h2>
                {user.bookings.map((booking, index)=> 
                <section key={index} className="border-b border-gray-600 last:border-none pb-3 mb-3 last:mb-0">
                    <p className="font-semibold">{booking.movie}</p>
                    <p>datum:{booking.date} kl:{booking.time}</p>
                    <p>Stol: {booking.seats.join(", ")}</p>
                    <p>lorem ipsum dolor sit amet.</p>
                    <button className="mt-1 text-sm text-red-500 hover:underline">Avboka</button>
                </section>
                )}
            </section>
        </main>

    );
}
