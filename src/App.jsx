import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './shared/NavBar'
import SideBar from './shared/SideBar'
import Login from './modulos/auth/pages/Login'
import FormularioRegistro from './modulos/auth/components/FormularioRegistro'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
    <Login></Login>
    </BrowserRouter>
    </>
  )
}

export default App
