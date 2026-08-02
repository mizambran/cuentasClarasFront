import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaWallet, FaSignOutAlt } from 'react-icons/fa';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/dashboard">
          <FaWallet className="me-2 text-info" /> Finanzas Personales
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Button variant="outline-light" size="sm" className="d-flex align-items-center">
              <FaSignOutAlt className="me-1" /> Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;