import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearTransac } from "../services/transaccionAPI";
import Swal from "sweetalert2";
import { 
  FaExchangeAlt, FaMoneyBillWave, FaTags, 
  FaWallet, FaCalendarAlt, FaCheckCircle, 
  FaAlignLeft, FaSave, FaTimes 
} from "react-icons/fa";
import { obtenerFechaHoy } from "../../../utils/formatos";

const FormTransaccion = ({ cerrarModal, categorias, cuentas, recargarTabla }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({defaultValues:{fecha:obtenerFechaHoy()}});

  const guardarOperacion = async (data) => {
    try {
      await crearTransac(data);
      await recargarTabla();
      Swal.fire('Creado!', 'Creaste un movimiento con éxito.', 'success');
      reset();
      cerrarModal();
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <Form onSubmit={handleSubmit(guardarOperacion)} className="p-2">
      
      {/* Fila 1: Tipo y Monto */}
      <Row className="mb-3 g-3">
        <Form.Group as={Col} md={6} controlId="tipoMovimiento">
          <Form.Label className="fw-semibold text-secondary">
            <FaExchangeAlt className="me-2 text-primary" />Tipo de Movimiento
          </Form.Label>
          <Form.Select 
            className="shadow-sm border-0 bg-light"
            isInvalid={!!errors.tipo}
            {...register("tipo", { required: "Seleccioná un tipo" })}
          >
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
            <Form.Control
              type="number"
              step="0.01"
              placeholder="0.00"
              className="border-0 bg-light"
              isInvalid={!!errors.monto}
              {...register("monto", { 
                required: "El monto es obligatorio",
                valueAsNumber: true,
                min: { value: 0, message: "No puede ser negativo" } 
              })}
            />
            <Form.Control.Feedback type="invalid">{errors.monto?.message}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      {/* Fila 2: Categoría y Cuenta */}
      <Row className="mb-3 g-3">
        <Form.Group as={Col} md={6} controlId="categoriaMovimiento">
          <Form.Label className="fw-semibold text-secondary">
            <FaTags className="me-2 text-warning" />Categoría
          </Form.Label>
          <Form.Select 
            className="shadow-sm border-0 bg-light"
            isInvalid={!!errors.categoria}
            {...register("categoria", { required: "Elegí una categoría" })}
          >
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
          <Form.Select 
            className="shadow-sm border-0 bg-light"
            isInvalid={!!errors.cuenta}
            {...register("cuenta", { required: "Elegí una cuenta" })}
          >
            <option value="">Seleccionar...</option>
            {cuentas.map((cta) => (
              <option key={cta._id} value={cta._id}>{cta.nombre}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.cuenta?.message}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      {/* Fila 3: Fecha y Estado */}
      <Row className="mb-3 g-3">
        <Form.Group as={Col} md={6} controlId="fechaMovimiento">
          <Form.Label className="fw-semibold text-secondary">
            <FaCalendarAlt className="me-2 text-danger" />Fecha
          </Form.Label>
          <Form.Control
            type="date"
            className="shadow-sm border-0 bg-light"
            isInvalid={!!errors.fecha}
            {...register("fecha", { required: "La fecha es obligatoria" })}
          />
          <Form.Control.Feedback type="invalid">{errors.fecha?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={6} controlId="estadoMovimiento">
          <Form.Label className="fw-semibold text-secondary">
            <FaCheckCircle className="me-2 text-primary" />Estado
          </Form.Label>
          <Form.Select className="shadow-sm border-0 bg-light" {...register("estado")}>
            <option value="Pendiente">Pendiente</option>
            <option value="Completado">Completado</option>
          </Form.Select>
        </Form.Group>
      </Row>

      {/* Fila 4: Descripción */}
      <Form.Group className="mb-4" controlId="descripcionMovimiento">
        <Form.Label className="fw-semibold text-secondary">
          <FaAlignLeft className="me-2 text-secondary" />Descripción
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Ej: Cubiertas nuevas para la SLP"
          className="shadow-sm border-0 bg-light"
          isInvalid={!!errors.descripcion}
          {...register("descripcion", { maxLength: { value: 200, message: "Máximo 200 caracteres" } })}
        />
        <Form.Control.Feedback type="invalid">{errors.descripcion?.message}</Form.Control.Feedback>
      </Form.Group>

      {/* Botones de acción alineados a la derecha */}
      <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
        <Button 
          variant="light" 
          className="px-4 rounded-pill d-flex align-items-center shadow-sm text-muted" 
          onClick={cerrarModal}
        >
          <FaTimes className="me-2" /> Cancelar
        </Button>
        <Button 
          variant="primary" 
          type="submit" 
          className="px-4 rounded-pill d-flex align-items-center shadow-sm"
        >
          <FaSave className="me-2" /> Guardar
        </Button>
      </div>

    </Form>
  );
};

export default FormTransaccion;