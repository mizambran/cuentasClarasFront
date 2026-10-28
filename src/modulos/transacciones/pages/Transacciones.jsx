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
  Badge, Spinner
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
  const [transSeleccionada, setTransSeleccionada] = useState(null)
  const [titulo, setTitulo] = useState('')
  
  const handleClose = () => {
    setShow('')
    setTransSeleccionada(null)
  }

  
  const estadoInicialFiltro = {
    fechaDesde:"",
    fechaHasta:"",
    tipo:"",
    cuenta:"",
    categoria:"",
    descripcion:""
  }
  
  const [transacciones, setTransacciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [buscador, setBuscador] = useState(estadoInicialFiltro)
  const [cargando, setCargando] = useState(false)

  

  const manejarFiltros = (e) => {
    const {name, value} = e.target
    setBuscador({
      ...buscador,
      [name]:value
    })
  }

  const limpiarFiltro = () => {
    setBuscador(estadoInicialFiltro)
  }
  

  const transaccionesFiltradas = transacciones.filter((trans) => {

    // filtro por tipo, vacio selecciona todo
    const coincideTipo = buscador.tipo === "" || trans?.tipo === buscador.tipo
    
    // filtro por cuenta, vacio selecciona todas
    const coincideCta = buscador.cuenta === "" || trans?.cuenta?.nombre === buscador.cuenta

    // filtro categoria
    const coincideCat = buscador.categoria === "" || trans?.categoria?.nombre === buscador.categoria

    // filtro por descripcion
    const coincideDesc = trans?.descripcion?.toLowerCase().includes(buscador.descripcion.toLowerCase())

    // 4. Filtro por fechas (Cortamos la fecha del backend a YYYY-MM-DD para comparar bien)
    const fechaTran = trans.fecha ? trans.fecha.substring(0, 10) : "";
    const coincideDesde = buscador.fechaDesde === "" || fechaTran >= buscador.fechaDesde;
    const coincideHasta = buscador.fechaHasta === "" || fechaTran <= buscador.fechaHasta;

    return coincideTipo && coincideCta && coincideDesc && coincideCat && coincideDesde && coincideHasta

  })
  
  // Estado derivado para que pueda aparecer el botón de "Limpiar filtro"
  const filtroActivo = Object.values(buscador).some((valor) => valor !== "")
  
  

  useEffect(() => {
    const traerDatos = async () => {
      setCargando(true)
      const [transaccionesEnc, categoriasEncontradas, cuentasEncontradas] =
        await Promise.all([
          listarTransacciones(),
          listarCategorias(),
          listarCuentas(),
        ]);
      setTransacciones(transaccionesEnc);
      setCategorias(categoriasEncontradas);
      setCuentas(cuentasEncontradas);
      setCargando(false)
    };
    traerDatos();
  }, []);

  const totalTransac = transaccionesFiltradas?.reduce((acc, item) => {
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

  const cantMov = transacciones.reduce((acc, item) => {
    const tipo = item?.tipo
    if(tipo){
      acc.tipos[tipo] = (acc.tipos[tipo] || 0) + 1
    }

    const categoria = item?.categoria?.nombre
    if(categoria){
      acc.categorias[categoria] = (acc.categorias[categoria] || 0) + 1
    }

    const cuenta = item?.cuenta?.nombre 
    if(cuenta){
      acc.cuentas[cuenta] = (acc.cuentas[cuenta] || 0) + 1
    }

    return acc

  }, {tipos:{}, categorias:{}, cuentas:{}})
  

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* --- CABECERA Y BOTÓN AGREGAR --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-secondary mb-0">Mis Movimientos</h2>
        <Button
          variant="primary"
          className="d-flex align-items-center shadow-sm"
          disabled={cargando}
          onClick={() => {
            setShow('crear')
            setTitulo('Creando...')
          }}
        >
          <FaPlus className="me-2" />Agregar
        </Button>
      </div>

      {/* --- SECCIÓN DE FILTROS --- */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Row className="g-3">

            {/* Filtro Fecha */}
            <Col xs={6} md={2}>
              <Form.Group controlId="filtroFechaDesde">
                <Form.Label className="text-muted small mb-1">Desde</Form.Label>
                <Form.Control type="date"
                name="fechaDesde" 
                  value={buscador.fechaDesde} 
                  onChange={manejarFiltros}
                   />
              </Form.Group>
            </Col>

            <Col xs={6} md={2}>
              <Form.Group controlId="filtroFechaHasta">
                <Form.Label className="text-muted small mb-1">Hasta</Form.Label>
                <Form.Control type="date"
                name="fechaHasta" 
                  value={buscador.fechaHasta} 
                  onChange={manejarFiltros}
                   />
              </Form.Group>
            </Col>

            {/* Filtro Tipo */}
            <Col xs={12} md={2}>
              <Form.Group controlId="filtroTipo">
                <Form.Label className="text-muted small mb-1">Tipo</Form.Label>
                <Form.Select name="tipo" value={buscador.tipo} onChange={manejarFiltros} >
                  <option value="">Todos</option>
                  <option value="Ingreso">Ingreso - ({cantMov.tipos.Ingreso || 0}) </option>
                  <option value="Gasto">Gasto - ({cantMov.tipos.Gasto || 0})</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Filtro Categoría */}
            <Col xs={12} md={2}>
              <Form.Group controlId="filtroCategoria">
                <Form.Label className="text-muted small mb-1">
                  Categoría
                </Form.Label>
                <Form.Select name="categoria" value={buscador.categoria} onChange={manejarFiltros} >
                  <option value="">Todas</option>
                  {categorias?.map((cat) => (
                    <option key={cat._id} value={cat.nombre}>
                      {cat.nombre} - ({cantMov?.categorias[cat.nombre] || 0})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Filtro Cuentas */}
            <Col xs={12} md={2}>
              <Form.Group controlId="filtroCuenta">
                <Form.Label className="text-muted small mb-1">
                  Cuentas
                </Form.Label>
                <Form.Select name="cuenta" value={buscador.cuenta} onChange={manejarFiltros} >
                  <option value="">Todas</option>
                  {cuentas?.map((cta) => (
                    <option key={cta._id} value={cta.nombre}>
                      {cta.nombre} - ({cantMov?.cuentas[cta.nombre] || 0})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        {filtroActivo && (<Button type="button" variant="outline-danger" className="mb-2 ms-2 w-50" onClick={limpiarFiltro} >Limpiar filtro</Button>)}
      </Card>
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
                    name="descripcion"
                    value={buscador.descripcion}
                    onChange={manejarFiltros}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

      {/* --- SECCIÓN DE LA TABLA --- */}
      {cargando ? (
        <div className="d-flex flex-column justify-content-center align-items-center my-5">
              <Spinner animation="border" variant="primary" className="mt-5 mb-3" />
              <p>Cargando...</p>
            </div>
      ) : (
        <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3 text-center">Fecha</th>
                <th className="py-3 text-center">Descripcion</th>
                <th className="py-3 text-end ">Importe</th>
                <th className="py-3 text-center ">Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* Fila de ejemplo 1: Ingreso */}
              {transaccionesFiltradas.length > 0 ? (
                transaccionesFiltradas?.map((tran) => (
                <tr key={tran._id} 
                onClick={() => {
                setShow('ver')
                setTitulo('Modo Vista')
                setTransSeleccionada(tran)
                  }}
                style={{ cursor: 'pointer' }}
                  > 
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
                  <td className="text-center">{tran.estado}</td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted" >No tenes ningun movimiento cargado...</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="text-center fw-bold">
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
      )}

      <ModalTransac show={show !== ""} handleClose={handleClose} titulo={titulo} >
        <FormTransaccion 
        show={show}
        cambiarModo={setShow}
        cerrarModal={handleClose}
        transSeleccionada={transSeleccionada}
        categorias={categorias} 
        cuentas={cuentas}
        recargarTabla={recargarTabla} />      
      </ModalTransac>
    </Container>
  );
};

export default Transacciones;
