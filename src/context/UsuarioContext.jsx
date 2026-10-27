import { createContext, useState } from "react";

export const UsuarioContext = createContext()

export const UsuarioProvider = ({children}) => {

    const [usuario, setUsuario] = useState([])
    const [logueado, setLogueado] = useState(!!localStorage.getItem('tokenCC'))
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                setUsuario,
                logueado,
                setLogueado,
                isAdmin,
                setIsAdmin
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}