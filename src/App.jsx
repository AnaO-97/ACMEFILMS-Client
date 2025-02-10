// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import Detail from './components/Detail/Detail'

import { Routes, Route, useLocation } from 'react-router-dom'

function App() {
  let { pathname }= useLocation()
  return (
    <div>
      <Routes>
      <Route exact path= "/"
             element   = { <Form type= "log in"/> } 
        > </Route>

        <Route exact path= "/home"
               element   = { <Home/> } 
        > </Route>

        <Route exact path= "/detail/:id"
               element   = { <Detail/> } 
        > </Route>

        <Route exact path= "/form"
               element   = { <Form/> } 
        > </Route>
      </Routes>
    </div>
  )
}

export default App