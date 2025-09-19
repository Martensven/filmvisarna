import { Routes, Route } from 'react-router'
import FrontPage from './Pages/FrontPage/frontPage.tsx'
import BookingPage from './Pages/BookingPage/bookingPage.tsx'
import MoviePage from './Pages/MoviePage/moviePage.tsx'
import ThemePage from './Pages/ThemePage/themePage.tsx'
import Header from './Components/header/header.tsx'
import Footer from './Components/footer/footer.tsx'
import MyPage from './Pages/MyPage/myPage.tsx'
import Login from './Components/login/login.tsx'
import Register from './Components/register/register.tsx'

function App() {


  return (
    <>
      <Header></Header>

      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/movie' element={<MoviePage />} />
        <Route path='/theme' element={<ThemePage />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

      <Footer></Footer>
    </>
  )
}

export default App
