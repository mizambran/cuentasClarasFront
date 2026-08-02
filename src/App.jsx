import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './shared/NavBar'
import SideBar from './shared/SideBar'
import Login from './modulos/auth/pages/Login'
import FormularioRegistro from './modulos/auth/components/FormularioRegistro'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/registrar' element={<FormularioRegistro />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
