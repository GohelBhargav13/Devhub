import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
