import { Navigate, Outlet } from "react-router-dom"
import { UsuarioContext } from "../context/UsuarioContext"

const RutaAdmin = () => {

    const {
        usuario,
        isAdmin
    } = useContext(UsuarioContext)

    if(!usuario){
        return <Navigate to={'/login'} replace />
    }
    if(isAdmin && usuario.rol !== 'admin'){
        return <Navigate to={'/'} replace/>
    }

    return <Outlet />

}

export default RutaAdmin