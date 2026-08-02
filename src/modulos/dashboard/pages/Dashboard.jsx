import React from 'react';
import { Container, Row, Col, Card, Form, Table, Badge } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h2 className="mb-4 text-secondary">Mi Resumen</h2>

      {/* Tarjetas de Resumen */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0 border-start border-primary border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Balance Total</h6>
                  <h3 className="mb-0 fw-bold">$ 150,000</h3>
                </div>
                <FaWallet size={30} className="text-primary opacity-50" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0 border-start border-success border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Ingresos del Mes</h6>
                  <h3 className="mb-0 fw-bold text-success">$ 200,000</h3>
                </div>
                <FaArrowUp size={30} className="text-success opacity-50" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0 border-start border-danger border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Gastos del Mes</h6>
                  <h3 className="mb-0 fw-bold text-danger">$ 50,000</h3>
                </div>
                <FaArrowDown size={30} className="text-danger opacity-50" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros y Tabla */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Últimas Transacciones</h5>
            <Form.Select style={{ width: '200px' }}>
              <option>Este mes</option>
              <option>Mes anterior</option>
              <option>Todos los tiempos</option>
            </Form.Select>
          </div>

          <Table hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Categoría</th>
                <th>Tipo</th>
                <th className="text-end">Monto</th>
              </tr>
            </thead>
            <tbody>
              {/* Filas de ejemplo "quemadas" (sin lógica) */}
              <tr>
                <td>15/12/2025</td>
                <td>Sueldo Quincena</td>
                <td>Salario</td>
                <td><Badge bg="success">Ingreso</Badge></td>
                <td className="text-end fw-bold text-success">+$ 200,000</td>
              </tr>
              <tr>
                <td>16/12/2025</td>
                <td>Compra Supermercado</td>
                <td>Alimentación</td>
                <td><Badge bg="danger">Gasto</Badge></td>
                <td className="text-end fw-bold text-danger">-$ 35,000</td>
              </tr>
              <tr>
                <td>16/12/2025</td>
                <td>Carga Sube</td>
                <td>Transporte</td>
                <td><Badge bg="danger">Gasto</Badge></td>
                <td className="text-end fw-bold text-danger">-$ 15,000</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;