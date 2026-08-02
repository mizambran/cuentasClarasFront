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

function App() {

  const {
    usuario,
    logueado
  } = useContext(UsuarioContext)


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<NavBar />} />
    <Route path='/login' element={<Login />} />
    <Route path='/registrar' element={<FormularioRegistro />} />
    <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
