import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaExchangeAlt, FaChartPie, FaBullseye, FaTags, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../context/UsuarioContext';
import './SideBar.css'; 

const SideBar = () => {
  const { usuario, setLogueado } = useContext(UsuarioContext);
  const navegacion = useNavigate();

  const cerrarSesion = () => {
    setLogueado(false);
    localStorage.removeItem('tokenCC');
    localStorage.removeItem('usuarioCC')
    navegacion('/login');
  };

  const nombreUsuarioProvisorio = localStorage.getItem("usuarioCC")
  
  return (
    <div className="sidebar-container shadow-sm">
      
      {/* Cabecera que solo se ve en PC */}
      <div className="menu-header mb-4 ps-2">
        <h5 className="text-primary fw-bold mb-0">Menú Principal </h5>
        <small className="text-secondary ">Hola, {nombreUsuarioProvisorio}! </small>
      </div>
      
      <Nav className="nav-wrapper d-flex flex-row justify-content-around w-100 mb-auto h-100">
        <Nav.Item>
          <NavLink to={'/dashboard'} className="nav-link-custom">
            <FaHome className="nav-icon" />
            <span>Inicio</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={'/transacciones'} className="nav-link-custom">
            <FaExchangeAlt className="nav-icon" />
            <span>Movimientos</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={'/presupuesto'} className="nav-link-custom">
            <FaChartPie className="nav-icon" />
            <span>Presupuesto</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={'/categorias'} className="nav-link-custom">
            <FaTags className="nav-icon" />
            <span>Categorías</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={'/objetivos'} className="nav-link-custom">
            <FaBullseye className="nav-icon" />
            <span>Objetivos</span>
          </NavLink>
        </Nav.Item>

        {/* Botón Salir: En PC se empuja al fondo (mt-md-auto), en celular es un ícono más */}
        <Nav.Item className="mt-md-auto">
          <button onClick={cerrarSesion} className="nav-link-custom text-danger w-100 text-start">
            <FaSignOutAlt className="nav-icon" />
            <span>Salir</span>
          </button>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SideBar;