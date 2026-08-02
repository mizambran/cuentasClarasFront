
export const convertirARS = (valor) => {
    return valor.toLocaleString('es-AR' , {style:'currency', currency:'ARS'} )
}


