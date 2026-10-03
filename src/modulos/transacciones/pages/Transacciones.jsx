import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Table,
  Button,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {
  listarCategorias,
  listarCuentas,
  listarTransacciones,
} from "../services/transaccionAPI";
import { convertirARS, convertirFecha } from "../../../utils/formatos";
import ModalTransac from "../components/ModalTransac";
import FormTransaccion from "../components/FormTransaccion";

const Transacciones = () => {

  const [show, setShow] = useState('')
  const handleClose = () => setShow('')

  const [transacciones, setTransacciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    const traerDatos = async () => {
      const [transaccionesEnc, categoriasEncontradas, cuentasEncontradas] =
        await Promise.all([
          listarTransacciones(),
          listarCategorias(),
          listarCuentas(),
        ]);
      setTransacciones(transaccionesEnc);
      setCategorias(categoriasEncontradas);
      setCuentas(cuentasEncontradas);
    };
    traerDatos();
  }, []);

  const totalTransac = transacciones.reduce((acc, item) => {
    let tipo = item.tipo;
    if (tipo === "Ingreso") {
      acc += item.monto;
    } else {
      acc -= item.monto;
    }
    return acc;
  }, 0);

  const recargarTabla = async() => {
    const transaccionesActualizadas = await listarTransacciones()
    setTransacciones(transaccionesActualizadas)
  }

  const [buscador, setBuscador] = useState("")


  const transaccionesFiltradas = transacciones.filter((tran) => 
    tran?.descripcion?.toLowerCase().includes(buscador.toLowerCase())
  )

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* --- CABECERA Y BOTÓN AGREGAR --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-secondary mb-0">Mis Movimientos</h2>
        <Button
          variant="primary"
          className="d-flex align-items-center shadow-sm"
          onClick={() => setShow('crear')}
        >
          <FaPlus className="me-2" />Agregar
        </Button>
      </div>

      {/* --- SECCIÓN DE FILTROS --- */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Row className="g-3">
            {/* Buscador */}
            <Col xs={12} md={3}>
              <Form.Group controlId="filtroBuscador">
                <Form.Label className="text-muted small mb-1">
                  Buscar descripción
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaSearch className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Sueldo..."
                    className="border-start-0"
                    onChange={(e) => setBuscador(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Filtro Fecha */}
            <Col xs={6} md={2}>
              <Form.Group controlId="filtroFechaDesde">
                <Form.Label className="text-muted small mb-1">Desde</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>

            <Col xs={6} md={2}>
              <Form.Group controlId="filtroFechaHasta">
                <Form.Label className="text-muted small mb-1">Hasta</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>

            {/* Filtro Tipo */}
            <Col xs={12} md={2}>
              <Form.Group controlId="filtroTipo">
                <Form.Label className="text-muted small mb-1">Tipo</Form.Label>
                <Form.Select>
                  <option value="">Todos</option>
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Filtro Categoría */}
            <Col xs={12} md={2}>
              <Form.Group controlId="filtroCategoria">
                <Form.Label className="text-muted small mb-1">
                  Categoría
                </Form.Label>
                <Form.Select>
                  <option value="">Todas</option>
                  {categorias?.map((cat) => (
                    <option key={cat._id} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* --- SECCIÓN DE LA TABLA --- */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="py-3">Descripcion</th>
                <th className="py-3 text-center ">Importe</th>
                <th className="py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* Fila de ejemplo 1: Ingreso */}
              {transaccionesFiltradas?.map((tran) => (
                <tr key={tran._id}>
                  <td className="px-2"> {convertirFecha(tran.fecha)} </td>
                  <td>{tran.descripcion}</td>
                  <td
                    className={
                      tran.tipo === "Ingreso"
                        ? "text-end fw-bold text-success"
                        : "text-end fw-bold text-danger"
                    }
                  >
                    {convertirARS(tran.monto)}
                  </td>
                  <td>{tran.estado}</td>
                  
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-center fw-bold">
                  Total
                </td>
                <td className="text-end fw-bold">
                  {convertirARS(totalTransac)}
                </td>
              </tr>
            </tfoot>
          </Table>
        </Card.Body>
      </Card>

      <ModalTransac show={show === 'crear'} handleClose={handleClose} titulo="Nuevo movimiento" >
        <FormTransaccion 
        cerrarModal={handleClose}
        categorias={categorias} 
        cuentas={cuentas}
        recargarTabla={recargarTabla} />      
      </ModalTransac>
    </Container>
  );
};

export default Transacciones;
