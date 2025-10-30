import { useState } from "react";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

import FrontPage from "./Pages/FrontPage/frontPage.js";
import BookingPage from "./Pages/BookingPage/bookingPage.tsx";
import MoviePage from "./Pages/MoviePage/moviePage.tsx";
import Header from "./Components/header/header.tsx";
import Footer from "./Components/footer/footer.tsx";
import MyPage from "./Pages/MyPage/myPage.tsx";
import Login from "./Components/login/login.tsx";
import Register from "./Components/register/register.tsx";
import AboutPage from "./Pages/AboutPage/aboutPage.tsx";
import KioskPage from "./Pages/KioskPage/kioskPage.tsx";
import ThemeSundayPage from "./Pages/ThemePage/themeSunPage.tsx";
import ThemeThursdayPage from "./Pages/ThemePage/themeThuPage.tsx";
import DetailMovie from "./Pages/DetailMovie/detailMovie.tsx";
import ForgotPassword from "./Components/login/forgotPassword.tsx";
import AdminPage from "./Pages/AdminPage/adminPage.tsx";
import SalesPage from "./Pages/AdminPage/salesPage.tsx";
import AdminAddMoviePage from "./Pages/AdminPage/adminAddMovie.tsx";
import AdminStart from "./Pages/AdminPage/adminStart.tsx";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage.tsx";
import AdminUsersPage from "./Pages/AdminPage/AdminUsers/adminUsersPage.tsx";


function App() {

  const [loginPopup, setLoginPopup] = useState<
    "login" | "register" | "forgot-password" | null
  >(null);
  const [popupSlide, setPopupSlide] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const { user, loading } = useAuth();


  const handleClosing = () => {
    setPopupSlide(true);
    setTimeout(() => {
      setLoginPopup(null);
      setPopupSlide(false);
    }, 900);
  };


  if (loading) {
  return <div className="text-white p-10">Laddar användardata...</div>;
}

  return (
    <>

      {/* Making sure Header and Footer are not shown on admin pages */}
      {/* We later also needs to secure the routes with admin role */}
      {!window.location.pathname.startsWith("/admin") && (
        <>
          <Header
            onLoginClick={() => setLoginPopup("login")}
            isLoggedIn={isLoggedIn}
            onLogout={() => setIsLoggedIn(false)}
          />
        </>
      )}

      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route
          path="/booking/:id"
          element={<BookingPage isLoggedIn={isLoggedIn} />}
        />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/theme-sunday" element={<ThemeSundayPage />} />
        <Route path="/theme-thursday" element={<ThemeThursdayPage />} />
        <Route path="/my-page/" element={<MyPage />} />
        <Route path="/checkout/:bookingId" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/kiosk" element={<KioskPage />} />
        <Route path="/movie/:id" element={<DetailMovie />} />
        {/* Adminpages uses nested routes */}
        <Route path="/admin" element={ user?.role === "admin" ? (<AdminPage />) : (<Navigate to="/" replace />) }>
          <Route index element={<AdminStart />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="add-movie" element={<AdminAddMoviePage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
      {/* Making sure Header and Footer are not shown on admin pages */}
      {!window.location.pathname.startsWith("/admin") && (
        <>
          <Footer />
        </>
      )}

      {loginPopup && (
        <section
          onClick={handleClosing}
          className="fixed inset-0 flex justify-end z-50"
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className={`popup-background flex w-150 h-full shadow-xl p-6 flex-col justify-center ${popupSlide ? "animation-slideout" : "animation-slidein"
              }`}
          >
            <button
              onClick={handleClosing}
              className="self-center rounded-md shadow-md cursor-pointer"
            >
              [X]
            </button>

            {loginPopup === "login" && (
              <Login
                onSwitchToRegister={() => setLoginPopup("register")}
                onSwitchToForgot={() => setLoginPopup("forgot-password")}
                onClose={handleClosing}
              />
            )}

            {loginPopup === "register" && (
              <Register
                onSwitchToLogin={() => setLoginPopup("login")}
                onClose={handleClosing}
              />
            )}

            {loginPopup === "forgot-password" && (
              <ForgotPassword onSwitchToLogin={() => setLoginPopup("login")} />
            )}
          </aside>
        </section>
      )}
    </>
  );
}

export default App;
