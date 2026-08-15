import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Recycling from './components/pages/Recycling'


import Contact from './components/pages/Contact'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Layout from './components/layputs/Index'
import NotFound from './components/pages/notfound'
import WasteToEnergry from './components/pages/WasteToEnergy'
<<<<<<< HEAD
import SignAgent from './components/SignUp/SignAgent'
import path from 'node:path'
import SignReporter from './components/SignUp/SignReporter'
=======
import About from './components/pages/About'
>>>>>>> 7961347e47c47dd3dc817162a3f9dc3448ceb986

function App() {
  const [count, setCount] = useState(0)

  const navList =[
    {
      path: "/",
      element: <Home/>
    },
    
    {
      path: "/recycling",
      element: <Recycling/>
    },
    {
      path: "/wastetoenergy",
      element: <WasteToEnergry/>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/contact",
      element: <Contact/>
    },
  ]

  const authRoot = [
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "*",
      element: <NotFound/>
    }, 
    {
      path:"/Agent",
      element: <SignAgent/>
    },
    {
      path: "/Reporter",
      element: <SignReporter/>
    }
  ]

  return (
   <Routes>
      <Route path='/' element={<Layout/>}>
          {navList.map((n, idx) => (
            <Route key={idx} path={n.path} element={n.element}/>
          ))}
      </Route>

      <Route >
          {authRoot.map((n, idx) => (
            <Route key={idx} path={n.path} element={n.element}/>
          ))}
      </Route>
    
   </Routes>
  )
}

export default App
