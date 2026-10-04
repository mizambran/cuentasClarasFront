import { useEffect } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearTransac, editarTransac, eliminarTransac } from "../services/transaccionAPI";
import Swal from "sweetalert2";
import { 
  FaExchangeAlt, FaMoneyBillWave, FaTags, 
  FaWallet, FaCalendarAlt, FaCheckCircle, 
  FaAlignLeft, FaSave, FaTimes, FaEdit, 
  FaTrash
} from "react-icons/fa";
import { obtenerFechaHoy } from "../../../utils/formatos";

const FormTransaccion = ({ show, cambiarModo, cerrarModal, transSeleccionada, categorias, cuentas, recargarTabla }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const esSoloLectura = show === 'ver';


  useEffect(() => {
    if (transSeleccionada && (show === 'ver' || show === 'editar')) {

      // Para extraer el ID seguro y convertirlo a texto
      const extraerId = (campo) => {
        if (!campo) return ""; 
        if (typeof campo === 'object') return campo._id?.toString() || "";
        return campo.toString();
      };

      //  Para que no quede "cuenta" vacio
      const idCategoria = transSeleccionada.categoria?._id || transSeleccionada.categoria;
      const idCuenta = transSeleccionada.cuenta?._id || transSeleccionada.cuenta;

      reset({
        ...transSeleccionada,
        fecha: transSeleccionada.fecha.split('T')[0], 
        categoria: idCategoria?.toString(),
        cuenta: idCuenta?.toString()
      });
    } else {
      reset({
        fecha: obtenerFechaHoy(),
        tipo: "Gasto",
        estado: "Completado"
      });
    }
  }, [transSeleccionada, show, reset]);

  const guardarOperacion = async (data) => {
    try {
      if (show === 'crear') {
        await crearTransac(data);
        Swal.fire('¡Creado!', 'Creaste un movimiento con éxito.', 'success');
      } 
      if(show === 'editar'){
        await editarTransac(transSeleccionada._id, data)
        Swal.fire('Editaste!', 'Editaste un movimiento con éxito.', 'success');
      }
      await recargarTabla();
      cerrarModal();
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const eliminar = async(id) => {
    const resultado = await Swal.fire({
      title: "Estas seguro que quieres eliminar?",
      text: "No se podrá recuperar una vez borrado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, continuar"
    })

    if (resultado.isConfirmed) {
        try {
          await eliminarTransac(id)
          await recargarTabla()
          cerrarModal()
          Swal.fire({
          title: "¡Eliminado!",
          text: "El movimiento fue eliminado con éxito.",
          icon: "success"
        });      
        } catch (error) {
          Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el movimiento.",
          icon: "error"
        });
        }
      }
  }

  return (
    <Form onSubmit={handleSubmit(guardarOperacion)} className="p-2">
      
      {/* fieldset =>  bloquea todos los inputs de una sola vez si esta en modo vista */}
      <fieldset disabled={esSoloLectura}>
        
        <Row className="mb-3 g-3">
          <Form.Group as={Col} md={6} controlId="tipoMovimiento">
            <Form.Label className="fw-semibold text-secondary">
              <FaExchangeAlt className="me-2 text-primary" />Tipo de Movimiento
            </Form.Label>
            <Form.Select className="shadow-sm border-0 bg-light" isInvalid={!!errors.tipo} {...register("tipo", { required: "Seleccioná un tipo" })}>
              <option value="Gasto">Gasto</option>
              <option value="Ingreso">Ingreso</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.tipo?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="montoMovimiento">
            <Form.Label className="fw-semibold text-secondary">
              <FaMoneyBillWave className="me-2 text-success" />Monto
            </Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text className="bg-light border-0 text-success fw-bold">$</InputGroup.Text>
              <Form.Control type="number" step="0.01" className="border-0 bg-light" isInvalid={!!errors.monto} 
                {...register("monto", { required: "El monto es obligatorio", valueAsNumber: true, min: { value: 0, message: "No puede ser negativo" } })} />
              <Form.Control.Feedback type="invalid">{errors.monto?.message}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3 g-3">
          <Form.Group as={Col} md={6} controlId="categoriaMovimiento">
            <Form.Label className="fw-semibold text-secondary">
              <FaTags className="me-2 text-warning" />Categoría
            </Form.Label>
            <Form.Select className="shadow-sm border-0 bg-light" isInvalid={!!errors.categoria} {...register("categoria", { required: "Elegí una categoría" })}>
              <option value="">Seleccionar...</option>
              {categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.nombre}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.categoria?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="cuentaMovimiento">
            <Form.Label className="fw-semibold text-secondary">
              <FaWallet className="me-2 text-info" />Cuenta
            </Form.Label>
            <Form.Select className="shadow-sm border-0 bg-light" isInvalid={!!errors.cuenta} {...register("cuenta", { required: "Elegí una cuenta" })}>
              <option value="">Seleccionar...</option>
              {cuentas.map((cta) => (
                <option key={cta._id} value={cta._id}>{cta.nombre}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.cuenta?.message}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3 g-3">
          <Form.Group as={Col} md={6} controlId="fechaMovimiento">
            <Form.Label className="fw-semibold text-secondary">
              <FaCalendarAlt className="me-2 text-danger" />Fecha
            </Form.Label>
            <Form.Control type="date" className="shadow-sm border-0 bg-light" isInvalid={!!errors.fecha} {...register("fecha", { required: "La fecha es obligatoria" })} />
            <Form.Control.Feedback type="invalid">{errors.fecha?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="estadoMovimiento">
            <Form.Label className="fw-semibold text-secondary">
              <FaCheckCircle className="me-2 text-primary" />Estado
            </Form.Label>
            <Form.Select className="shadow-sm border-0 bg-light" {...register("estado")}>
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-4" controlId="descripcionMovimiento">
          <Form.Label className="fw-semibold text-secondary">
            <FaAlignLeft className="me-2 text-secondary" />Descripción
          </Form.Label>
          <Form.Control as="textarea" rows={2} className="shadow-sm border-0 bg-light" isInvalid={!!errors.descripcion} 
            {...register("descripcion", { maxLength: { value: 20, message: "Máximo 20 caracteres" } })} />
          <Form.Control.Feedback type="invalid">{errors.descripcion?.message}</Form.Control.Feedback>
        </Form.Group>

      </fieldset>

      <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
        <Button variant="secondary" className="px-4 rounded-pill d-flex align-items-center shadow-sm " onClick={cerrarModal}>
          <FaTimes className="me-1" /> {esSoloLectura ? 'Cerrar' : 'Cancelar'}
        </Button>
        
        {/* Si estamos en modo 'ver' , mostramos el boton que cambia a 'editar' */}
        {esSoloLectura && (
          <div className="d-flex gap-2">
            <Button variant="warning " className="px-4 rounded-pill d-flex align-items-center shadow-sm" 
          onClick={() => cambiarModo('editar')}>
            <FaEdit className="me-1" /> Editar
          </Button>
          <Button variant="danger " className="px-4 rounded-pill d-flex align-items-center shadow-sm" 
          onClick={async() => eliminar(transSeleccionada._id)}>
            <FaTrash className="me-1" /> Eliminar
          </Button>
          </div>
        )}
        
        {/* Si estamos en 'crear' o 'editar', mostramos el submit de Guardar */}
        {!esSoloLectura && (
          <Button variant="primary" type="submit" className="px-4 rounded-pill d-flex align-items-center shadow-sm">
            <FaSave className="me-2" /> Guardar
          </Button>
        )}
      </div>

    </Form>
  );
};

export default FormTransaccion;