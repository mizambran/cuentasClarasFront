import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaWallet, FaSignOutAlt } from 'react-icons/fa';
import { UsuarioContext } from '../context/UsuarioContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navegacion = useNavigate()

  const {
    usuario,
    logueado,
    setLogueado
  } = useContext(UsuarioContext)

  const cerrarSesion = () => {
    setLogueado(false)
    sessionStorage.removeItem('token')
    navegacion('/login')
  }

  const iniciarSesion = () => {
    navegacion('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <FaWallet className="me-2 text-info" /> Finanzas Personales
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {logueado ? (
              <Button variant="outline-light" size="sm" className="d-flex align-items-center">
              <FaSignOutAlt className="me-1" onClick={cerrarSesion} /> Salir
            </Button>
            ) : (
              <Button variant="outline-light" size="sm" className="d-flex align-items-center">
              <FaSignOutAlt className="me-1" onClick={iniciarSesion} /> Ingresar
            </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;