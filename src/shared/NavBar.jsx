import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaWallet, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { UsuarioContext } from '../context/UsuarioContext';
import { useNavigate } from 'react-router-dom';
import LogoCuentasClaras from '../assets/LogoCuentasClaras';

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

  const inicio = () => {
    navegacion('/')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/">
        <LogoCuentasClaras />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className='gap-1'>
            <Button variant="outline-light" size="sm" className="d-flex align-items-center" onClick={inicio}>
              <FaHome /> Inicio
            </Button>
            {logueado ? (
              <Button variant="danger" size="sm" className="d-flex align-items-center" onClick={cerrarSesion}>
              <FaSignOutAlt className="me-1"  /> Salir
            </Button>
            ) : (
              <Button variant="outline-light" size="sm" className="d-flex align-items-center" onClick={iniciarSesion}>
              <FaSignOutAlt className="me-1" /> Ingresar
            </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;