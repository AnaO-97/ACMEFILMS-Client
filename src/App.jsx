// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import NavBar from './components/NavSearchBar/NavBar'
import FormLogin from './components/Form/FormLogin'
import FormNewFilm from './components/Form/FormNewFilm'
import Detail from './components/Detail/Detail'

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  let { pathname }= useLocation()
  const colorIcons = "#f1e3e3"

  return (
    <div>
      {
        pathname !== "/login"
        ? <NavBar colorIcons= {colorIcons} 
                  pathname= {pathname}/>
        : null
      }      
      <Routes>
        <Route exact path= "/login"
             element   = { <FormLogin type= "Ingresar" 
                                      colorIcons= {colorIcons}
                          /> } 
        > </Route>

        <Route exact path= "/home"
               element   = { <Home/> } 
        > </Route>

        <Route exact path= "/detail/:idFilm"
               element   = { <Detail/> } 
        > </Route>

        <Route exact path= "/newFilm"
               element   = { <FormNewFilm type= "Nueva Película" 
                                   colorIcons= {colorIcons}
                            /> } 
        > </Route>

        <Route exact path= "/editFilm/:idFilm"
               element   = { <FormNewFilm type= "Editar Película" 
                                   colorIcons= {colorIcons}
                            /> } 
        > </Route>
      </Routes>
    </div>
  )
}

export default App