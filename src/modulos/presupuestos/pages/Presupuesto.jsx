import React from 'react';
import { Container, Row, Col, Card, Form, Accordion, Table, Badge, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaChartPie, FaPlus } from 'react-icons/fa';

const Presupuesto = () => {
  // --- DATOS DE PRUEBA (Solo visuales) ---
  const aniosDisponibles = [2026, 2025, 2024];
  const meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  
  const categoriasPrueba = [
    { id: 1, nombre: 'Supermercado', proyectado: 150000, real: 145000, dif: 5000 },
    { id: 2, nombre: 'Alquiler', proyectado: 200000, real: 200000, dif: 0 },
    { id: 3, nombre: 'Transporte', proyectado: 40000, real: 55000, dif: -15000 },
    { id: 4, nombre: 'Entretenimiento', proyectado: 30000, real: 10000, dif: 20000 },
  ];

  // Función visual rápida (después la reemplazás por tu convertirARS utils)
  const formatearMonto = (monto) => `$ ${monto.toLocaleString('es-AR')}`;

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* --- HEADER --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-secondary mb-0">Presupuestos Anuales</h2>
        <Button variant="primary" className="d-flex align-items-center shadow-sm">
          <FaPlus className="me-2" /> Nuevo
        </Button>
      </div>

      {/* --- FILTROS (Solo visual) --- */}
      <Card className="my-4 shadow-sm border-0">
        <Card.Body className="d-flex align-items-center gap-3">
          <FaCalendarAlt className="text-primary fs-4" />
          <Form.Group className="mb-0" style={{ minWidth: '200px' }}>
            <Form.Select className="border-0 bg-light shadow-none cursor-pointer">
              {aniosDisponibles.map((anio) => (
                <option key={anio} value={anio}>
                  Año {anio}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* --- LISTADO DE ACORDEONES (12 MESES) --- */}
      <Row>
        <Col xs={12}>
          <Accordion defaultActiveKey="0" className="shadow-sm">
            {meses.map((mes, index) => (
              <Accordion.Item eventKey={index.toString()} key={mes} className="border-0 border-bottom">
                
                <Accordion.Header>
                  <div className="d-flex align-items-center gap-2 fw-bold text-dark fs-5">
                    <FaChartPie className="text-secondary" />
                    #Presupuesto {mes}/2026
                  </div>
                </Accordion.Header>
                
                <Accordion.Body className="p-0">
                  <Table hover responsive className="align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="px-4 py-3">Categoría</th>
                        <th className="py-3 text-end">Proyectado</th>
                        <th className="py-3 text-end">Real</th>
                        <th className="py-3 px-4 text-end">Dif</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoriasPrueba.map((cat) => (
                        <tr key={cat.id}>
                          <td className="px-4 py-3 fw-bold text-muted">{cat.nombre}</td>
                          <td className="text-end">{formatearMonto(cat.proyectado)}</td>
                          <td className="text-end">{formatearMonto(cat.real)}</td>
                          <td className="px-4 text-end">
                            {/* Color dinámico para la diferencia visual */}
                            <Badge 
                              bg={cat.dif > 0 ? "success" : cat.dif < 0 ? "danger" : "secondary"} 
                              className="rounded-pill px-3 py-2 fs-6"
                            >
                              {cat.dif > 0 ? "+" : ""}{formatearMonto(cat.dif)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="table-light">
                      <tr>
                        <td className="px-4 py-3 fw-bold text-uppercase">Totales</td>
                        <td className="text-end fw-bold">{formatearMonto(420000)}</td>
                        <td className="text-end fw-bold">{formatearMonto(410000)}</td>
                        <td className="px-4 text-end fw-bold">
                          <Badge bg="success" className="rounded-pill px-3 py-2 fs-6">
                            +{formatearMonto(10000)}
                          </Badge>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </Accordion.Body>

              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Presupuesto;