


const token = localStorage.getItem('tokenCC')
const URLBASE = import.meta.env.VITE_API_URL

export const listarCategorias = async(req, res) => {
    try {
        const respuesta = await fetch(`${URLBASE}/categorias/`, {
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
        return resultado
    } catch (error) {
        console.error("Ocurrió algo mal al intentar listar las categorias",error)
        throw error
    }
}

export const crearCategoria = async(data) => {
    try {
        const respuesta = await fetch(`${URLBASE}/categorias/`, {
            method:'POST',
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        const resultado = await respuesta.json()
        if(!respuesta.ok){
            throw new Error(resultado.mensaje || "Algo salió mal en la petición al intentar crear una categoría")
        }
        return resultado
    } catch (error) {
        console.error("Ocurrió algo mal , mira el catch", error)
        throw error
    }
}

export const editarCategoria = async() => {

}

export const eliminarCategoria = async() => {

}

