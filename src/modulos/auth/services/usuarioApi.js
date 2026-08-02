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