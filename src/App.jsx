import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './shared/NavBar'
import SideBar from './shared/SideBar'
import Login from './modulos/auth/pages/Login'
import FormularioRegistro from './modulos/auth/components/FormularioRegistro'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UsuarioContext } from './context/UsuarioContext'
import Dashboard from './modulos/dashboard/pages/Dashboard'
import Inicio from './shared/Inicio'
import Footer from './shared/Footer'

function App() {

  const {
    usuario,
    logueado
  } = useContext(UsuarioContext)


  return (
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
    <Route path='/' element={<Inicio />} />
    <Route path='/login' element={<Login />} />
    <Route path='/registrar' element={<FormularioRegistro />} />
    <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
