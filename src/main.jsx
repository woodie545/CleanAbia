import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/toast'
import { AuthProvider } from './hooks/useAuth'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider> 
       <App />
       <Toaster/>
    </AuthProvider> 
    </BrowserRouter>
  </StrictMode>,
)
