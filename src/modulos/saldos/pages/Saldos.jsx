import { useEffect, useState } from "react";
import { Col, Button, Container, Form, Row, Spinner, Card, Badge } from "react-bootstrap";
import { FaPlus, FaMoneyBillWave, FaCreditCard, FaLandmark, FaWallet } from "react-icons/fa";
import { listarCuentas } from "../services/cuentaAPI";
import { convertirARS } from "../../../utils/formatos";
import ModalTransac from "../../transacciones/components/ModalTransac"; 
import FormCuenta from "../components/FormCuenta"; 

const Saldos = () => {
  const [cargando, setCargando] = useState(false);
  const [cuentas, setCuentas] = useState([]);
  const [buscador, setBuscador] = useState("");

  const [show, setShow] = useState('');
  const [titulo, setTitulo] = useState('');
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

  const traerDatos = async () => {
    setCargando(true);
    try {
      const cuentasEnc = await listarCuentas();
      setCuentas(cuentasEnc);
    } catch (error) {
      console.error("Error al cargar cuentas", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    traerDatos();
  }, []);

  const handleClose = () => {
    setShow('');
    setCuentaSeleccionada(null);
  };

  const abrirModal = (modo, tituloModal, cuenta = null) => {
    setShow(modo);
    setTitulo(tituloModal);
    setCuentaSeleccionada(cuenta);
  };

  const cuentasFiltradas = cuentas.filter((cta) => {
    return cta?.nombre?.toLowerCase().includes(buscador.toLowerCase());
  });

  const obtenerIcono = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'efectivo': return <FaMoneyBillWave className="text-success fs-2" />;
      case 'tarjeta de crédito': return <FaCreditCard className="text-warning fs-2" />;
      case 'banco': return <FaLandmark className="text-primary fs-2" />;
      default: return <FaWallet className="text-info fs-2" />;
    }
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-secondary mb-0">Disponibilidades</h2>
        <Button
          variant="primary"
          className="d-flex align-items-center shadow-sm"
          disabled={cargando}
          onClick={() => abrirModal('crear', 'Nueva Cuenta')}
        >
          <FaPlus className="me-2" /> Agregar
        </Button>
      </div>
      
      <Card className="my-4 shadow-sm border-0">
        <Card.Body>
          <Form.Group>
            <Form.Control
              placeholder="Buscar por nombre de cuenta..."
              onChange={(e) => setBuscador(e.target.value)}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {cargando ? (
          <div className="d-flex flex-column justify-content-center align-items-center my-5 w-100">
            <Spinner animation="border" variant="primary" className="mt-5 mb-3" />
            <p>Cargando...</p>
          </div>
        ) : cuentasFiltradas?.length > 0 ? (
          cuentasFiltradas.map((cta) => (
            <Col xs={12} md={6} lg={4} xl={3} key={cta._id}>
              {/* Al hacer clic en cualquier parte de la tarjeta, se abre el Modal */}
              <Card 
                className="shadow-sm border-0 h-100" 
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => abrirModal('ver', 'Detalle de Cuenta', cta)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    {obtenerIcono(cta.tipo)}
                    <Badge bg={cta.activo ? "success" : "secondary"} className="rounded-pill px-3 py-2">
                      {cta.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  <div>
                    <Card.Title className="fw-bold text-dark fs-5 mb-1">{cta.nombre}</Card.Title>
                    <Card.Subtitle className="text-muted small">{cta.tipo}</Card.Subtitle>
                  </div>
                  <div className="mt-4 pt-3 border-top">
                    <p className="text-muted small mb-1">
                      {cta.tipo === 'Tarjeta de Crédito' ? 'Límite / Saldo' : 'Saldo actual'}
                    </p>
                    <h3 className={`mb-0 fw-bold ${cta.saldoActual < 0 ? 'text-danger' : 'text-dark'}`}>
                      {convertirARS(cta.saldoActual ?? cta.saldoInicio)}
                    </h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5 text-muted">
              <h5>No se encontraron cuentas</h5>
            </div>
          </Col>
        )}
      </Row>

      <ModalTransac show={show !== ''} handleClose={handleClose} titulo={titulo}>
        <FormCuenta 
          show={show}
          cambiarModo={setShow}
          cerrarModal={handleClose}
          cuentaSeleccionada={cuentaSeleccionada}
          recargarLista={traerDatos}
        />
      </ModalTransac>
    </Container>
  );
};

export default Saldos;