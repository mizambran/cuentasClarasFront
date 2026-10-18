import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaExchangeAlt, FaChartPie, FaBullseye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', minHeight: '100vh' }}>
      <h5 className="text-secondary ps-2 mb-3">Menú Principal</h5>
      <Nav variant="pills" className="flex-column mb-auto">
        <Nav.Item className="mb-1">
          <NavLink to={'/dashboard'} className="d-flex align-items-center text-dark">
            <FaHome className="me-2" /> Dashboard
          </NavLink>
        </Nav.Item>
        <Nav.Item className="mb-1">
          <NavLink to={'/transacciones'} className="d-flex align-items-center text-dark">
            <FaExchangeAlt className="me-2" /> Transacciones
          </NavLink>
        </Nav.Item>
        <Nav.Item className="mb-1">
          <NavLink to={'/presupuestos'} className="d-flex align-items-center text-dark">
            <FaChartPie className="me-2" /> Presupuestos
          </NavLink>
        </Nav.Item>
        <Nav.Item className="mb-1">
          <NavLink to={'/objetivos'} className="d-flex align-items-center text-dark">
            <FaBullseye className="me-2" /> Objetivos
          </NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SideBar;