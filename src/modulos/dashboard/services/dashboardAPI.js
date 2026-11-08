
const URLBASE = import.meta.env.VITE_API_URL

export const listarSaldos = async() => {
    try {
        const token = localStorage.getItem('tokenCC')
        const respuesta = await fetch(`${URLBASE}/cuentas/saldos`, {
            method:'GET',
            headers:{
            'Content-type':'Application/json',
            'Authorization':`Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        if(!respuesta.ok){
            throw new Error(resultado.mensaje || "Algo salió mal en la petición")
        }
        console.log(resultado);
        
        return resultado
    } catch (error) {
        console.error("Algo salió mal en el catch", error)
        throw error
    }
}