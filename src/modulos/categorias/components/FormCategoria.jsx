import { useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearCategoria, editarCategoria } from "../services/categoriaAPI";
import Swal from "sweetalert2";
import { 
  FaTag, FaExchangeAlt, FaInfoCircle, 
  FaSave, FaTimes, FaEdit 
} from "react-icons/fa";

const FormCategoria = ({ show, cambiarModo, cerrarModal, categoriaSeleccionada, recargarLista }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const esSoloLectura = show === 'ver';

  // Rellenar datos si estamos en modo Ver o Editar
  useEffect(() => {
    if (categoriaSeleccionada && (show === 'ver' || show === 'editar')) {
      reset({ ...categoriaSeleccionada });
    } else {
      // Valores por defecto al Crear
      reset({
        nombre: "",
        tipo: "Gasto",
        concepto: "Fijo",
        activo: true 
      });
    }
  }, [categoriaSeleccionada, show, reset]);

  const guardarCategoria = async (data) => {
    try {
      if (show === 'crear') {
        await crearCategoria(data);
        Swal.fire('¡Creada!', 'La categoría se registró con éxito.', 'success');
      } 
      
      if (show === 'editar') {
        await editarCategoria(categoriaSeleccionada._id, data);
        Swal.fire('¡Actualizada!', 'La categoría se modificó con éxito.', 'success');
      }
      
      await recargarLista();
      cerrarModal();
    } catch (error) {
      Swal.fire('Error', error.message || "Ocurrió un problema al guardar", 'error');
    }
  };

  return (
    <Form onSubmit={handleSubmit(guardarCategoria)} className="p-2">
      

      <fieldset disabled={esSoloLectura}>
        
        <Row className="mb-3 g-3">
          <Form.Group as={Col} md={6} controlId="nombreCategoria">
            <Form.Label className="fw-semibold text-secondary">
              <FaTag className="me-2 text-primary" />Nombre
            </Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ej: Supermercado" 
              className="shadow-sm border-0 bg-light" 
              isInvalid={!!errors.nombre}
              {...register("nombre", { 
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Debe tener al menos 3 letras" },
                maxLength: { value: 40, message: "Máximo 40 caracteres permitidos" }
              })}
            />
            <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="tipoCategoria">
            <Form.Label className="fw-semibold text-secondary">
              <FaExchangeAlt className="me-2 text-success" />Tipo
            </Form.Label>
            <Form.Select 
              className="shadow-sm border-0 bg-light"
              isInvalid={!!errors.tipo}
              {...register("tipo", { required: "Seleccioná el tipo" })}
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.tipo?.message}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3 g-3">
          <Form.Group as={Col} md={6} controlId="conceptoCategoria">
            <Form.Label className="fw-semibold text-secondary">
              <FaInfoCircle className="me-2 text-info" />Concepto
            </Form.Label>
            <Form.Select 
              className="shadow-sm border-0 bg-light"
              isInvalid={!!errors.concepto}
              {...register("concepto", { required: "Seleccioná el concepto" })}
            >
              <option value="Fijo">Fijo</option>
              <option value="Variable">Variable</option>
              <option value="Extra">Extra</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.concepto?.message}</Form.Control.Feedback>
          </Form.Group>

          {/* Switch visualmente mejor que el select */}
          <Form.Group as={Col} md={6} controlId="activoCategoria" className="d-flex align-items-center mt-md-4 pt-md-4">
            <Form.Check 
              type="switch"
              id="switch-activo"
              label="Categoría Activo"
              className="fw-semibold text-secondary shadow-none"
              {...register("activo")}
            />
          </Form.Group>
        </Row>
      </fieldset>

      {/* BOTONERA INFERIOR */}
      <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
        <Button 
          variant="light" 
          className="px-4 rounded-pill d-flex align-items-center shadow-sm text-muted" 
          onClick={cerrarModal}
        >
          <FaTimes className="me-2" /> {esSoloLectura ? 'Cerrar' : 'Cancelar'}
        </Button>
        
        {esSoloLectura && (
          <Button 
            variant="outline-primary" 
            className="px-4 rounded-pill d-flex align-items-center shadow-sm" 
            onClick={() => cambiarModo('editar')}
          >
            <FaEdit className="me-2" /> Editar
          </Button>
        )}
        
        {!esSoloLectura && (
          <Button 
            variant="primary" 
            type="submit" 
            className="px-4 rounded-pill d-flex align-items-center shadow-sm"
          >
            <FaSave className="me-2" /> Guardar
          </Button>
        )}
      </div>

    </Form>
  );
};

export default FormCategoria;