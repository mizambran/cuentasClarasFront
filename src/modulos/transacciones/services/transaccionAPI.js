
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