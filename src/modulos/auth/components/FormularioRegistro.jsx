import React from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt } from 'react-icons/fa';

const FormularioRegistro = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>
              <Form>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label><FaUser className="me-2" />Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Miguel" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formApellido">
                  <Form.Label><FaUser className="me-2" />Apellido</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Zambrano" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEdad">
                  <Form.Label><FaCalendarAlt className="me-2" />Edad</Form.Label>
                  <Form.Control type="number" placeholder="Ej: 28" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCorreo">
                  <Form.Label><FaEnvelope className="me-2" />Correo electrónico</Form.Label>
                  <Form.Control type="email" placeholder="correo@ejemplo.com" required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formContrasena">
                  <Form.Label><FaLock className="me-2" />Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Mínimo 6 caracteres" required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Registrarse
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioRegistro;