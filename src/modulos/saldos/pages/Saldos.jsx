import { useEffect, useState } from "react";
import {
  Col,
  Button,
  Container,
  Form,
  Row,
  Spinner,
  Card,
  Badge,
  Table,
} from "react-bootstrap";
import {
  FaPlus,
  FaMoneyBillWave,
  FaCreditCard,
  FaLandmark,
  FaWallet,
  FaList,
  FaThLarge,
  FaExchangeAlt,
} from "react-icons/fa";
import { listarCuentasConSaldos } from "../services/cuentaAPI";
import { convertirARS, convertirDivisas } from "../../../utils/formatos";
import ModalTransac from "../../transacciones/components/ModalTransac";
import FormCuenta from "../components/FormCuenta";

const Saldos = () => {
  const [cargando, setCargando] = useState(false);
  const [cuentas, setCuentas] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [modoVista, setModoVista] = useState(false);

  const [show, setShow] = useState("");
  const [titulo, setTitulo] = useState("");
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

  const traerDatos = async () => {
    setCargando(true);
    try {
      const cuentasEnc = await listarCuentasConSaldos();
      setCuentas(cuentasEnc);
    } catch (error) {
      console.error("Error al cargar cuentas", error);
    } finally {
      setCargando(false);
    }
  };

  const cambiarModo = () => {
    setModoVista(!modoVista);
  };

  useEffect(() => {
    traerDatos();
  }, []);

  const handleClose = () => {
    setShow("");
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
      case "efectivo":
        return <FaMoneyBillWave className="text-success fs-2" />;
      case "tarjeta de crédito":
        return <FaCreditCard className="text-warning fs-2" />;
      case "cuenta bancaria":
        return <FaLandmark className="text-primary fs-2" />;
      default:
        return <FaWallet className="text-info fs-2" />;
    }
  };

  const totalDisponibleARS = cuentas.reduce((acc, item) => {
    let moneda = item.moneda || "ARS";
    let total = parseFloat(item.saldoActual || 0);
    // "Tarjeta de Crédito"
    if (
      moneda === "ARS" &&
      Number.isFinite(total) &&
      item.tipo !== "Tarjeta de Crédito"
    ) {
      acc += total;
    }
    return acc;
  }, 0);

  const totalDisponibleDivisas = cuentas.reduce((acc, item) => {
    let moneda = item.moneda || "Sin especificar";
    let total = parseFloat(item.saldoActual || 0);
    if (moneda !== "ARS") {
      if (acc[moneda] === undefined) {
        acc[moneda] = 0;
      }
      acc[moneda] = acc[moneda] + total;
    }
    return acc;
  }, {});

  const limiteTarjetaARS = cuentas.reduce((acc, item) => {
    let moneda = item.moneda || "ARS";
    let total = parseFloat(item.saldoActual || 0);
    if (
      moneda === "ARS" &&
      Number.isFinite(total) &&
      item.tipo === "Tarjeta de Crédito"
    ) {
      acc += total;
    }
    return acc;
  }, 0);

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-secondary mb-0">Disponibilidades</h2>
          {/* <Button type="button" variant="danger">
          <FaExchangeAlt className="me-2" />Traspasos
        </Button> */}
        <Button
          variant="primary"
          className="d-flex align-items-center shadow-sm"
          disabled={cargando}
          onClick={() => abrirModal("crear", "Nueva Cuenta")}
        >
          <FaPlus className="me-2" /> Agregar
        </Button>
      </div>
      <Row className={`g-4 mb-4 ${cargando ? "d-none" : ""}`}>
        {/* --- TARJETA 1: DISPONIBLE --- */}
        <Col xs={12} md={5}>
          <Card className="shadow-sm border-0 border-start border-primary border-4 h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-muted mb-0 fs-5">Disponible</h3>
                  <small className="text-muted">
                    (No incluye tarjetas de crédito)
                  </small>
                  <h3
                    className={`mt-2 ${totalDisponibleARS >= 0 ? "mb-0 fw-bold text-success" : "mb-0 fw-bold text-danger"}`}
                  >
                    {convertirARS(totalDisponibleARS)}
                  </h3>
                </div>
                <FaWallet size={30} className="text-primary opacity-75" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* --- TARJETA 2: LÍMITE TARJETAS --- */}
        <Col xs={12} md={5}>
          <Card className="shadow-sm border-0 border-start border-warning border-4 h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-muted mb-0 fs-5">Límite Tarjetas</h3>
                  <small className="text-muted">
                    (Solo tarjetas de crédito)
                  </small>
                  <h3
                    className={`mt-2 ${limiteTarjetaARS >= 0 ? "mb-0 fw-bold text-muted" : "mb-0 fw-bold text-danger"}`}
                  >
                    {convertirARS(limiteTarjetaARS)}
                  </h3>
                </div>
                <FaCreditCard size={30} className="text-warning opacity-75" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* --- TARJETA 3: DISPONIBLE OTRAS DIVISAS --- */}
        <Col xs={12} md={5}>
          <Card className="shadow-sm border-0 border-start border-dark border-4 mt-3 col-xs-12">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h3 className="text-muted mb-0 fs-5">Disponible Mon Ext</h3>
                  <small className="text-muted">(Otras monedas)</small>

                  <div className="mt-2">
                    {/* Convierto el objeto a array y veo si esta vacio */}
                    {Object.entries(totalDisponibleDivisas).length > 0 ? (
                      /* Desestructo [moneda, total] en el map */
                      Object.entries(totalDisponibleDivisas).map(
                        ([moneda, total]) => (
                          <h6
                            key={moneda}
                            className={
                              total >= 0
                                ? "mb-0 fw-bold text-dark"
                                : "mb-0 fw-bold text-danger"
                            }
                          >
                            {convertirDivisas(moneda, total)}
                          </h6>
                        ),
                      )
                    ) : (
                      <h3 className="mb-0 fw-bold text-muted mt-2">$ 0,00</h3>
                    )}
                  </div>
                </div>
                <FaMoneyBillWave
                  size={30}
                  className="text-dark opacity-75 mt-1"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div
        className={`d-flex flex-column flex-sm-row align-items-md-center gap-3 my-4 ${cargando ? "d-none" : ""}`}
      >
        {/* Buscador ocupando el espacio disponible */}
        <Card className="shadow-sm border-0 flex-grow-1 mb-0">
          <Card.Body className="p-2 px-3">
            <Form.Control
              placeholder="Buscar por nombre de cuenta..."
              className="border-0 shadow-none p-1"
              onChange={(e) => setBuscador(e.target.value)}
            />
          </Card.Body>
        </Card>

        {/* Botón Toggle (Si modoVista es true muestra ícono de Lista, si es false muestra Grilla) */}
        <Button
          variant="outline-secondary"
          className="shadow-sm bg-white d-flex align-items-center justify-content-center p-3 border-0"
          onClick={cambiarModo}
          title={
            modoVista ? "Cambiar a vista de grilla" : "Cambiar a vista de lista"
          }
        >
          {modoVista ? (
            <FaThLarge size={20} className="text-primary" />
          ) : (
            <FaList size={20} className="text-primary" />
          )}
        </Button>
      </div>

      <Row className="g-4">
        {cargando ? (
          <div className="d-flex flex-column justify-content-center align-items-center my-5 w-100">
            <Spinner
              animation="border"
              variant="primary"
              className="mt-5 mb-3"
            />
            <p>Cargando...</p>
          </div>
        ) : cuentasFiltradas?.length > 0 ? (
          modoVista ? (
            <Table hover responsive className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Cuenta</th>
                  <th>Saldo Inicial</th>
                  <th>Movimientos</th>
                  {/* <th>Traspasos</th> */}
                  <th>Saldo Actual</th>
                </tr>
              </thead>
              <tbody>
                {cuentasFiltradas &&
                  cuentasFiltradas?.map((cta) => (
                    <tr
                      key={cta?._id}
                      onClick={() =>
                        abrirModal("ver", "Detalle de Cuenta", cta)
                      }
                    >
                      <td> {cta?.nombre} </td>
                      <td>
                        {convertirDivisas(
                          cta?.moneda,
                          cta?.saldoInicio || 0
                        )}
                      </td>
                      <td>
                        {convertirDivisas(
                          cta?.moneda,
                           cta?.movimientos || 0
                        )}
                      </td>
                      {/* <td>
                        {convertirDivisas(
                          cta?.moneda,
                          0
                        )}
                      </td> */}
                      <td className={cta?.saldoActual >= 0 ? "text-success fw-bold" : "text-danger fw-bold"} >
                        {convertirDivisas(cta?.moneda, cta?.saldoActual || 0)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            cuentasFiltradas.map((cta) => (
              <Col xs={12} md={6} lg={4} key={cta._id}>
                {/* Al hacer clic en cualquier parte de la tarjeta, se abre el Modal */}
                <Card
                  className="shadow-sm border-0 h-100"
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                  onClick={() => abrirModal("ver", "Detalle de Cuenta", cta)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      {obtenerIcono(cta.tipo)}
                      <Badge
                        bg={cta.activo ? "success" : "secondary"}
                        className="rounded-pill px-3 py-2"
                      >
                        {cta.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <div>
                      <Card.Title className="fw-bold text-dark fs-5 mb-1">
                        {cta.nombre}
                      </Card.Title>
                      <Card.Subtitle className="text-muted small">
                        {cta.tipo}
                      </Card.Subtitle>
                    </div>
                    <div className="mt-4 pt-3 border-top">
                      <p className="text-muted small mb-1">
                        {cta.tipo === "Tarjeta de Crédito"
                          ? "Límite / Saldo"
                          : "Saldo actual"}
                      </p>
                      <h3
                        className={`mb-0 fw-bold ${cta.saldoActual < 0 ? "text-danger" : "text-dark"}`}
                      >
                        {convertirDivisas(
                          cta?.moneda,
                          cta.saldoActual ?? cta.saldoInicio,
                        )}
                      </h3>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )
        ) : (
          <Col xs={12}>
            <div className="text-center py-5 text-muted">
              <h5>No se encontraron cuentas</h5>
            </div>
          </Col>
        )}
      </Row>

      <ModalTransac
        show={show !== ""}
        handleClose={handleClose}
        titulo={titulo}
      >
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
