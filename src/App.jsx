// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './MUI/login.jsx'
// import Register from './MUI/Register.jsx'
// import Home from './pages/Home.jsx'
// import About from './pages/About.jsx'
// import Contact from './pages/Contact.jsx'
// import MovieDetails from './pages/MovieDetails.jsx'
// import AddMovie from './pages/AddMovie.jsx'
// import NavBar from './components/NavBar.jsx'
// import UpdateMovie from './pages/formupdate.jsx'
// import { MovieProvider } from './context/MovieContext.jsx'
// import './App.css'

// function App() {
//   return (
//     <BrowserRouter>
//       <MovieProvider>
//         <NavBar />
//         <Routes>
//           <Route path='/login'        element={<Login />} />
//           <Route path='/register'     element={<Register />} />
//            <Route path='/'             element={<Home />} />
//           <Route path='/about'        element={<About />} />
//           <Route path='/contact'      element={<Contact />} />
//           <Route path='/movie/:id'    element={<MovieDetails />} />
//           <Route path='/add-movie'    element={<AddMovie />} />
//           <Route path='/update-movie/:id' element={<UpdateMovie />} /> 
//         </Routes>
//       </MovieProvider>
//     </BrowserRouter>
//   )
// }

// export default App
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './MUI/login.jsx'
import Register from './MUI/Register.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import AddMovie from './pages/AddMovie.jsx'
import NavBar from './components/NavBar.jsx'
import UpdateMovie from './pages/formupdate.jsx'
import Favorites from './pages/FavMovie.jsx'
import Profile from './pages/Profile.jsx'
// ← deleted: import { MovieProvider } from './context/MovieContext.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/login'             element={<Login />} />
        <Route path='/register'          element={<Register />} />
        <Route path='/'                  element={<Home />} />
        <Route path='/about'             element={<About />} />
        <Route path='/contact'           element={<Contact />} />
        <Route path='/movie/:id'         element={<MovieDetails />} />
        <Route path='/add-movie'         element={<AddMovie />} />
        <Route path='/favorites'         element={<Favorites />} />
        <Route path='/update-movie/:id'  element={<UpdateMovie />} />
        <Route path='/profile'             element={<Profile />} /> 
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
