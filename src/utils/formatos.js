
export const convertirARS = (valor) => {
    return valor.toLocaleString('es-AR' , {style:'currency', currency:'ARS'} )
}

export const convertirFecha = (valor) => {
    const fecha = valor.split(`T`)[0]
    const [anio, mes, dia ] = fecha.split('-')
    return `${dia}/${mes}/${anio}`
}

export const obtenerFechaHoy = () => {
  const fecha = new Date();
  
  // Forzamos el reloj al huso horario de Argentina (UTC-3)
  const opciones = { 
    timeZone: 'America/Argentina/Tucuman', 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };
  
  // El idioma 'en-CA' (Canadá) es un pequeño truco de desarrollo porque 
  // devuelve la fecha automáticamente en el formato exacto 'YYYY-MM-DD', 
  // que es el único formato que aceptan los inputs type="date" de HTML.
  return new Intl.DateTimeFormat('en-CA', opciones).format(fecha);
};