import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AsideBar from '../components/AsideBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <AsideBar />
  </StrictMode>,
)
