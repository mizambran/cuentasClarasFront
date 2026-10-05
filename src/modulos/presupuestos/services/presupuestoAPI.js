
const token = localStorage.getItem('tokenCC')
const URLBASE = import.meta.env.VITE_API_URL

export const listarPresupuesto = async() => {
    try {
        const respuesta = await fetch(`${URLBASE}/reportes/presupuesto`, {
            method:'GET',
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        if(!respuesta.ok){
            throw new Error(resultado.mensaje || "Algo salió mal en la petición de presupuesto")
        }
        return resultado        
    } catch (error) {
        console.error("Ocurrió algo al intentar traer el presupuesto", error)
        throw error
    }
}