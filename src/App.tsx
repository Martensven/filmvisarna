import { useState } from 'react'
import { Routes, Route } from 'react-router'
import FrontPage from './Pages/FrontPage/frontPage.js'
import BookingPage from './Pages/BookingPage/bookingPage.tsx'
import MoviePage from './Pages/MoviePage/moviePage.tsx'
import ThemePage from './Pages/ThemePage/themePage.tsx'
import Header from './Components/header/header.tsx'
import Footer from './Components/footer/footer.tsx'
import MyPage from './Pages/MyPage/myPage.tsx'
import Login from './Components/login/login.tsx'
import Register from './Components/register/register.tsx'
import AboutPage from './Pages/AboutPage/aboutPage.tsx'
import KioskPage from './Pages/KioskPage/kioskPage.tsx'

function App() {
  const [loginPopup, setLoginPopup] = useState<"login" | "register" | null>(null);
  const [popupSlide, setPopupSlide] = useState(false);

  const handleClosing = () => {
    setPopupSlide(true);
    setTimeout(() => {
      setLoginPopup(null);
      setPopupSlide(false);
    }, 1000)
  };

  return (
    <>
      <Header onLoginClick={() => setLoginPopup("login")}></Header>

      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/movie' element={<MoviePage />} />
        <Route path='/theme' element={<ThemePage />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/kiosk' element={<KioskPage />} />
      </Routes>

      <Footer></Footer>
 
      {loginPopup && (
        <aside className="fixed inset-0 flex justify-end z-50">
          <section className={`popup-background flex w-150 h-full shadow-xl p-6 flex-col justify-center ${popupSlide ? "animation-slideout" : "animation-slidein"}`}>
            {loginPopup === "login" && <Login onSwitchToRegister={() => setLoginPopup("register")} onClose={handleClosing}/>}
            {loginPopup === "register" && <Register onSwitchToLogin={() => setLoginPopup("login")} onClose={handleClosing}/>}

            <button
              onClick={handleClosing}
              className="bg-[#243365] self-center w-50 mb-4 p-3 rounded cursor-pointer">
              Stäng
            </button>
          </section>
        </aside>
      )}
    </>
  )
}

export default App
