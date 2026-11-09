import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
import { listarCuentasConSaldos } from '../../saldos/services/cuentaAPI';
import {convertirARS} from '../../../utils/formatos'


const Dashboard = () => {

  const [saldos, setSaldos] = useState([])
  const [cargando, setCargando] = useState(false)
  
  const traerSaldos = async() => {
    try {
      setCargando(true)
      const datos = await listarCuentasConSaldos()
      setSaldos(datos)
      setCargando(false)
    } catch (error) {
      console.error("Algo sucedió en el catch", error)
    }
  }

  useEffect(() => {
    traerSaldos()
  }, [])

  const totalDisponibilidades = saldos.reduce((acc, item) => {
    let total = parseFloat(item.saldoActual || 0)
    if(Number.isFinite(total)){
      acc += total
    }
    return acc
  }, 0)

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h2 className="mb-4 text-secondary">Resumen</h2>

    {/* Evaluar inversión -> En esta sección el usuario podrá entrar a un form para calcular una inversión que 
    tenga en mente, para saber cuanto es el interes que va a ganar en un periodo determinado (Matematica Financiera) */}
    {/* Proyectar vida, es para ver como voy a estar de aqui a 1 año, 5 años o cuando me quiera jubilar. 
    Recordar indicadores demográficos , envejecimiento de la población y baja natalidad */}
    {/* <div className='my-3' >
      <h3>Herramientas</h3>
      <Button type='button' variant='success' > Evaluar inversión </Button>
      <Button type='button' variant='success' className='ms-2' > Proyectar vida </Button>
    </div> */}


      {/* Tarjetas de Resumen */}
      <Row className="mb-4">
        
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
        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0 border-start border-primary border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Capacidad de Ahorro (Ingresos - Gastos)</h6>
                  <h3 className={totalDisponibilidades >= 0 ? "mb-0 fw-bold text-success" : "mb-0 fw-bold text-danger"}> {convertirARS(totalDisponibilidades)} </h3>
                </div>
                <FaWallet size={30} className="text-primary opacity-50" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      
    </Container>
  );
};

export default Dashboard;