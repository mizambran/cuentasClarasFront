import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Error404 = () => {
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center p-4">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6}>
          {/* Número gigante */}
          <h1 className="display-1 fw-bold text-primary" style={{ fontSize: '6rem' }}>
            404
          </h1>
          
          {/* Ícono de advertencia */}
          <div className="mb-4 text-warning">
            <FaExclamationTriangle size={70} />
          </div>
          
          {/* Textos */}
          <h2 className="mb-3 text-secondary fw-bold">¡Ups! Página no encontrada</h2>
          <p className="lead text-muted mb-5">
            La ruta a la que intentas acceder no existe.
          </p>
          
          <Button as={Link} to="/" variant="primary" size="lg" className="px-5 shadow-sm rounded-pill">
            Volver al Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;