export const loginUsuario = async (credenciales) => {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credenciales),
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || 'Credenciales inválidas');
        }

        return resultado; // Retornará el token JWT y los datos del usuario
    } catch (error) {
        throw error;
    }
};

export const crearUsuario = async(datos) => {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/`, {
        method:'POST',
        headers:{
            'Content-type':'Application/json'
        },
        body:JSON.stringify(datos)
    })
    const resultado = await respuesta.json()
    if(!respuesta.ok){
        throw resultado
    }
    return resultado
    } catch (error) {
      console.error(error)
      throw error  
    }
}