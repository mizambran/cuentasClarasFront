import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChartLine, FaMobileAlt, FaLock } from 'react-icons/fa';
import NavBar from './NavBar';
import Footer from './Footer';
import { UsuarioContext } from '../context/UsuarioContext';
import SideBar from './SideBar';

const Inicio = () => {

  const {
    usuario,
    logueado
  } = useContext(UsuarioContext)

  return (
    <div>
      {logueado ? (<SideBar />) : (
        <div className="bg-light min-vh-100 d-flex flex-column justify-content-center mt-4">
      <Container className="py-5">
        <Row className="text-center mb-5 align-items-center justify-content-center">
          <Col md={8} lg={6}>
            <h1 className="display-4 fw-bold text-primary mb-3">
              Estas listo para alcanzar tus objetivos?
            </h1>
            <p className="lead text-secondary mb-4">
              Tomá el control de tus finanzas personales de forma simple, rápida y segura. Todo lo que necesitás en la palma de tu mano.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Button as={Link} to="/registrar" variant="primary" size="lg" className="px-4">
                Empezar gratis
              </Button>
              <Button as={Link} to="/login" variant="outline-primary" size="lg" className="px-4 mt-2 mt-sm-0">
                Iniciar Sesión
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mt-4">
          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <FaChartLine size={40} className="text-primary mb-3" />
                <Card.Title>Estadísticas Claras</Card.Title>
                <Card.Text className="text-muted">
                  Visualizá tus ingresos y gastos con gráficos fáciles de entender.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <FaMobileAlt size={40} className="text-primary mb-3" />
                <Card.Title>100% Móvil</Card.Title>
                <Card.Text className="text-muted">
                  Diseñado para que registres tus movimientos estés donde estés.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <FaLock size={40} className="text-primary mb-3" />
                <Card.Title>Seguridad Total</Card.Title>
                <Card.Text className="text-muted">
                  Tus datos financieros están encriptados y protegidos en la nube.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
      )}
    </div>
  );
};

export default Inicio;