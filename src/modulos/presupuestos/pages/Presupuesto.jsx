import { useEffect, useState } from "react"
import { listarPresupuesto } from "../services/presupuestoAPI"


const Presupuesto = () => {
  
    const [presupuestos, setPresupuestos] = useState([])
    useEffect(() => {
        const traerDatos = async() => {
            const presupuestosEnc = await listarPresupuesto()
            console.log(presupuestosEnc);
            
            //setPresupuestos(presupuestosEnc)
        }
        //traerDatos()
    }, [])
  
    return (
    <div>
        <table>
            <thead>
                <tr>
                <td colSpan={2}>Categoria</td>
                <td colSpan={2}>Cuenta</td>
            </tr>
            </thead>
            <tbody>
                
            <tr>
                <td>  </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            </tbody>
        </table>
    </div>
  )
}

export default Presupuesto
