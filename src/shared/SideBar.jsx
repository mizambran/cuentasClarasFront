import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaExchangeAlt, FaChartPie, FaBullseye } from 'react-icons/fa';

const SideBar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', minHeight: '100vh' }}>
      <h5 className="text-secondary ps-2 mb-3">Menú Principal</h5>
      <Nav variant="pills" className="flex-column mb-auto">
        <Nav.Item className="mb-1">
          <Nav.Link href="/dashboard" className="d-flex align-items-center text-dark">
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-1">
          <Nav.Link href="/transacciones" className="d-flex align-items-center text-dark">
            <FaExchangeAlt className="me-2" /> Transacciones
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-1">
          <Nav.Link href="/presupuestos" className="d-flex align-items-center text-dark">
            <FaChartPie className="me-2" /> Presupuestos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-1">
          <Nav.Link href="/objetivos" className="d-flex align-items-center text-dark">
            <FaBullseye className="me-2" /> Objetivos
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SideBar;