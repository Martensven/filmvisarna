import { useState } from 'react';
import { Routes, Route } from 'react-router';
import FrontPage from './Pages/FrontPage/frontPage.js';
import BookingPage from './Pages/BookingPage/bookingPage.tsx';
import MoviePage from './Pages/MoviePage/moviePage.tsx';
import Header from './Components/header/header.tsx';
import Footer from './Components/footer/footer.tsx';
import MyPage from './Pages/MyPage/myPage.tsx';
import Login from './Components/login/login.tsx';
import Register from './Components/register/register.tsx';
import AboutPage from './Pages/AboutPage/aboutPage.tsx';
import KioskPage from './Pages/KioskPage/kioskPage.tsx';
import ThemeSundayPage from './Pages/ThemePage/themeSunPage.tsx';
import ThemeThursdayPage from './Pages/ThemePage/themeThuPage.tsx';
import DetailMovie from './Pages/DetailMovie/detailMovie.tsx';
import ForgotPassword from './Components/login/forgotPassword.tsx';

function App() {
  const [loginPopup, setLoginPopup] = useState<"login" | "register" | "forgot-password" | null>(null);
  const [popupSlide, setPopupSlide] = useState(false);

  const handleClosing = () => {
    setPopupSlide(true);
    setTimeout(() => {
      setLoginPopup(null);
      setPopupSlide(false);
    }, 900)
  };

  return (
    <>
      <Header onLoginClick={() => setLoginPopup("login")}></Header>

      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/booking/:id' element={<BookingPage />} />
        <Route path='/movie' element={<MoviePage />} />
        <Route path='/theme-sunday' element={<ThemeSundayPage />} />
        <Route path='/theme-thursday' element={<ThemeThursdayPage />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/kiosk' element={<KioskPage />} />
        <Route path='/movies/:id' element={<DetailMovie />} />
      </Routes>

      <Footer></Footer>

      {loginPopup && (
        <section onClick={handleClosing} className="fixed inset-0 flex justify-end z-50">
          <aside onClick={(e) => e.stopPropagation()} className={`popup-background flex w-150 h-full shadow-xl p-6 flex-col justify-center ${popupSlide ? "animation-slideout" : "animation-slidein"}`}>
            {loginPopup === "login" && (<Login onSwitchToRegister={() => setLoginPopup("register")} onSwitchToForgot={() => setLoginPopup("forgot-password")} onClose={handleClosing} />)}
            {loginPopup === "register" && (<Register onSwitchToLogin={() => setLoginPopup("login")} onClose={handleClosing} />)}
            {loginPopup === "forgot-password" && (<ForgotPassword onSwitchToLogin={() => setLoginPopup("login")} />)}

            <button
              onClick={handleClosing}
              className="bg-[#243365] self-center w-50 mb-4 p-3 rounded-md shadow-md cursor-pointer">
              Stäng
            </button>
          </aside>
        </section>
      )}
    </>
  )
}

export default App
