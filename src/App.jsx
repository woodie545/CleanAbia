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
import Layout from './components/layouts/Index'
import NotFound from './components/pages/notfound'
import WasteToEnergry from './components/pages/WasteToEnergy'
import SignAgent from './components/SignUp/SignAgent'
import SignReporter from './components/SignUp/SignReporter'
import About from './components/pages/About'
import ForgotPassword from './components/Login/ForgotPassword'
import ProtectedRoute from './components/ProtectedRoute'
import ReporterDashboard from './components/ReporterDashboard/ReporterDashboard'
import AdminDashboard from './components/Admin/AdminDashboard'
import AgentDashboard from './cleanAbia/Agents'
import Terms from './components/agentsignup/terms'
import Agents from './AgentDashboard/Agents'

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
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword/>
    },
    {
      path: "/terms",
      element: <Terms/>
    },
    {
      path: "/agentdashboard",
      element: <Agents/>
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

      <Route
        path='/reporter'
        element={
          <ProtectedRoute allowedRoles={['reporter']}>
            <ReporterDashboard/>
          </ProtectedRoute>
        }
      />

      <Route
        path='/agent'
        element={
          <ProtectedRoute allowedRoles={['agent']}>
            <AgentDashboard/>
          </ProtectedRoute>
        }
      />

      <Route
        path='/admin'
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard/>
          </ProtectedRoute>
        }
      />

   </Routes>
  )
}

export default App
