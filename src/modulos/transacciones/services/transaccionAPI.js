
export const listarCategorias = async() => {
    try {
        const token = localStorage.getItem('tokenCC')
    
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/categorias/`, {
            method:'GET',
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        if(!respuesta.ok){
            throw new Error(`Algo salió mal al buscar categoría, ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.error(error)
    }
}

export const listarCuentas = async() => {
    try {
        const token = localStorage.getItem(`tokenCC`)
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/cuentas/`,{
            method:'GET',
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        if(!respuesta.ok){
            throw new Error(`Algo salió mal al traer cuentas, ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.error(error)
    }
}

export const listarTransacciones = async() => {
    try {
        const token = localStorage.getItem('tokenCC')
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/transacciones/`, {
            method:'GET',
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        if(!respuesta.ok){
            throw new Error(`Algo salió mal al traer los movimientos, ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.error(error)
    }
}


export const crearTransac = async(data) => {
    try {
        const token = localStorage.getItem('tokenCC')
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/transacciones/`, {
            method:'POST',
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(data)
        })

        const resultado = await respuesta.json()
        
        if(!respuesta.ok){
            throw new Error(resultado.mensaje || `Error al crear la transacción`)
        }
        return resultado

    } catch (error) {
        console.error("Ocurrió algo estamos en el catch",error)
        throw error 
    }
}

export const editarTransac = async(id, data) => {
    try {
        const token = localStorage.getItem('tokenCC')
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/transacciones/${id}`, {
            method:'PUT',
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(data)
        })

        const resultado = await respuesta.json()
        
        if(!respuesta.ok){
            throw new Error(resultado.mensaje || `Error al editar la transacción`)
        }
        return resultado
    } catch (error) {
        console.error("Ocurrió algo estamos en el catch",error)
        throw error
    }
}

export const eliminarTransac = async(id) => {
    try {
        const token = localStorage.getItem('tokenCC')
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/transacciones/${id}`, {
            method:'DELETE',
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })

        const resultado = await respuesta.json()
        if(!respuesta.ok){
            throw new Error(resultado.mensaje || "Algo salió mal al intentar eliminar la petición")
        }
        return resultado
    } catch (error) {
        console.error(`Ocurrió algo mira el catch`, error)
        throw error
    }
}