import { Routes, Route } from 'react-router'
import FrontPage from './Pages/FrontPage/frontPage.tsx'
import BookingPage from './Pages/BookingPage/bookingPage.tsx'
import MoviePage from './Pages/MoviePage/moviePage.tsx'
import ThemePage from './Pages/ThemePage/themePage.tsx'
import Header from './Components/header/header.tsx'
import Footer from './Components/footer/footer.tsx'

function App() {


  return (
    <>
      <Header></Header>

      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/movie' element={<MoviePage />} />
        <Route path='/theme' element={<ThemePage />} />
      </Routes>

      <Footer></Footer>
    </>
  )
}

export default App
