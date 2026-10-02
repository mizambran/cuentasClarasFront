
export const convertirARS = (valor) => {
    return valor.toLocaleString('es-AR' , {style:'currency', currency:'ARS'} )
}

export const convertirFecha = (valor) => {
    const fecha = valor.split(`T`)[0]
    return fecha
}