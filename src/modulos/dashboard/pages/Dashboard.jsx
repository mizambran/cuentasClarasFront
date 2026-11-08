import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Table, Badge, Button } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
import { listarSaldos } from '../services/dashboardAPI';
import {convertirARS} from '../../../utils/formatos'


const Dashboard = () => {

  const [saldos, setSaldos] = useState([])

  useEffect(() => {
    const traerDatos = async() => {
      const saldosEnc = await listarSaldos()
      setSaldos(saldosEnc)
    } 
    traerDatos()
  }, [])


  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h2 className="mb-4 text-secondary">Mi Resumen</h2>

    {/* Evaluar inversión -> En esta sección el usuario podrá entrar a un form para calcular una inversión que 
    tenga en mente, para saber cuanto es el interes que va a ganar en un periodo determinado (Matematica Financiera) */}
    <div className='my-3' >
      <h3>Herramientas</h3>
      <Button type='button' > Evaluar inversión </Button>
    </div>


      {/* Tarjetas de Resumen */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0 border-start border-primary border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Disponible</h6>
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
            <h5 className="mb-0">Disponibilidades</h5>
            <Form.Select style={{ width: '200px' }}>
              <option>Este mes</option>
              <option>Mes anterior</option>
              <option>Todos los tiempos</option>
            </Form.Select>
          </div>

          <Table hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Cuenta</th>
                <th>Saldo Inicial</th>
                <th>Saldo Actual</th>
              </tr>
            </thead>
            <tbody>
              {/* Filas de ejemplo "quemadas" (sin lógica) */}
              {saldos && saldos.map((saldo) => (
                <tr key={saldo._id} >
                <td> {saldo.nombre} </td>
                <td> {saldo.saldoInicial} </td>
                <td>{convertirARS(saldo.saldoActual)}</td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;