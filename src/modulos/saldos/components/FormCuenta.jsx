import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaSave, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const FormCuenta = ({ show, cambiarModo, cerrarModal, cuentaSeleccionada, recargarLista }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [cargando, setCargando] = useState(false);

  // Precargamos los datos si estamos editando o viendo
  useEffect(() => {
    if (show === 'editar' || show === 'ver') {
      reset({
        nombre: cuentaSeleccionada.nombre,
        tipo: cuentaSeleccionada.tipo,
        saldoInicio: cuentaSeleccionada.saldoInicio,
        activo: cuentaSeleccionada.activo
      });
    } else {
      reset({
        nombre: '',
        tipo: '',
        saldoInicio: 0,
        activo: true
      });
    }
  }, [show, cuentaSeleccionada, reset]);

  const onSubmit = async (data) => {
    try {
      setCargando(true);
      if (show === 'crear') {
        await crearCuenta(data);
        Swal.fire("¡Éxito!", "Cuenta creada correctamente", "success");
      } else if (show === 'editar') {
        await editarCuenta(cuentaSeleccionada._id, data);
        Swal.fire("¡Éxito!", "Cuenta actualizada correctamente", "success");
      }
      await recargarLista();
      cerrarModal();
    } catch (error) {
      Swal.fire("Error", error.message || "Ocurrió un error al procesar la cuenta", "error");
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Se borrará la cuenta. Asegurate de no tener movimientos vinculados a la misma.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        setCargando(true);
        await eliminarCuenta(cuentaSeleccionada._id);
        Swal.fire("¡Eliminada!", "La cuenta ha sido borrada.", "success");
        await recargarLista();
        cerrarModal();
      } catch (error) {
        Swal.fire("Error", error.message || "No se pudo eliminar la cuenta", "error");
      } finally {
        setCargando(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Todo el formulario se bloquea si show === 'ver' o si está cargando */}
      <fieldset disabled={show === 'ver' || cargando}>
        <Row className="g-3 mb-4">
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Nombre de la Cuenta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Banco Galicia, AstroPay..."
                isInvalid={!!errors.nombre}
                {...register("nombre", { required: "El nombre es obligatorio", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                isInvalid={!!errors.tipo}
                {...register("tipo", { required: "Seleccioná un tipo" })}
              >
                <option value="">Seleccionar...</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Cuenta Bancaria">Cuenta Bancaria</option>
                <option value="Billetera Virtual">Billetera Virtual</option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.tipo?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Saldo Inicial</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  step="0.01"
                  isInvalid={!!errors.saldoInicio}
                  {...register("saldoInicio", { required: "El saldo inicial es obligatorio" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.saldoInicio?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group className="mt-2">
              <Form.Check
                type="switch"
                id="activo-switch"
                label="Cuenta Activa (visible para nuevos movimientos)"
                {...register("activo")}
              />
            </Form.Group>
          </Col>
        </Row>
      </fieldset>

      {/* --- BOTONERA DINÁMICA --- */}
      <div className="d-flex justify-content-end gap-2 border-top pt-3">
        {show === 'ver' && (
          <>
            <Button variant="primary" onClick={cerrarModal} className="d-flex align-items-center">
              <FaArrowLeft className="me-2" /> 
            </Button>
            <Button variant="warning" onClick={() => cambiarModo('editar')} className="d-flex align-items-center">
              <FaEdit className="me-2" /> Editar
            </Button>
            <Button variant="danger" onClick={handleEliminar} className="d-flex align-items-center" disabled={cargando}>
              <FaTrash className="me-2" /> Borrar
            </Button>
          </>
        )}

        {(show === 'crear' || show === 'editar') && (
          <>
            <Button variant="danger" onClick={cerrarModal} disabled={cargando}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="d-flex align-items-center" disabled={cargando}>
              <FaSave className="me-2" /> {show === 'crear' ? 'Crear Cuenta' : 'Guardar Cambios'}
            </Button>
          </>
        )}
      </div>
    </Form>
  );
};

export default FormCuenta;