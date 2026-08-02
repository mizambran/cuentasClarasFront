import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import LogoCuentasClaras from '../assets/LogoCuentasClaras';

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <h5 className="text-primary mb-1"><LogoCuentasClaras /></h5>
            <small className="text-light">
              Sistema de seguimiento de finanzas personales.
            </small>
          </Col>

        
          <Col xs={12} md={6} className="text-md-end">
            <div className="mb-2">
              <a href="https://github.com/mizambran" target="_blank" rel="noopener noreferrer" className="text-light me-3 fs-5 custom-link">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer" className="text-light me-3 fs-5 custom-link">
                <FaLinkedin />
              </a>
              <a href="mailto:miguelangel@gmail.com" className="text-light fs-5 custom-link">
                <FaEnvelope />
              </a>
            </div>
            <small className="text-light">
              &copy; {anioActual} Desarrollado por <strong>Miguel Angel Zambrano</strong>. <br className="d-block d-md-none" />
              Todos los derechos reservados.
            </small>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;