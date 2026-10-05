import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaPlus, FaEye, FaEdit, FaTrash, FaTag } from "react-icons/fa";
import Swal from "sweetalert2";
import { listarCategorias, eliminarCategoria } from "../services/categoriaAPI";
import ModalTransac from "../../transacciones/components/ModalTransac"; 
import FormCategoria from "../components/FormCategoria";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [show, setShow] = useState(''); 
  const [titulo, setTitulo] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const cargarCategorias = async () => {
    try {
      const datos = await listarCategorias();
      setCategorias(datos);
    } catch (error) {
      console.error("Error al cargar categorías", error);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleClose = () => {
    setShow('');
    setCategoriaSeleccionada(null);
  };

  const abrirModal = (modo, tituloModal, categoria = null) => {
    setShow(modo);
    setTitulo(tituloModal);
    setCategoriaSeleccionada(categoria);
  };

  const eliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No vas a poder recuperar esta categoría!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, ¡eliminar!",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        await eliminarCategoria(id);
        await cargarCategorias();
        Swal.fire("¡Eliminada!", "La categoría ha sido borrada.", "success");
      } catch (error) {
        Swal.fire("Error", error.message || "No se pudo eliminar", "error");
      }
    }
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-secondary mb-0">Mis Categorías</h2>
        <Button
          variant="primary"
          className="d-flex align-items-center shadow-sm"
          onClick={() => abrirModal('crear', 'Nueva Categoría')}
        >
          <FaPlus className="me-2" /> Agregar
        </Button>
      </div>


      <Row className="g-4">
        {categorias.length > 0 ? (
          categorias.map((cat) => (
            <Col xs={12} md={6} lg={4} xl={3} key={cat._id}>
              <Card className="shadow border-2 h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="fw-bold text-dark d-flex align-items-center mb-0">
                      {cat.nombre}
                    </Card.Title>
                    {/* Badge de Activo/Inactivo */}
                    <Badge bg={cat.activo ? "success" : "secondary"}>
                      {cat.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <Badge 
                      bg={cat.tipo === "Ingreso" ? "success" : "danger"} 
                      className="me-2 rounded-pill px-3 py-2"
                    >
                      {cat.tipo}
                    </Badge>
                    <Badge bg="outline-secondary" className="rounded-pill px-3 py-2 text-dark" style={{border:"0.2px solid black"}} >
                      {cat.concepto}
                    </Badge>
                  </div>
                </Card.Body>
                
                {/* FOOTER CON BOTONES ALINEADOS A LA DERECHA */}
                <Card.Footer className="bg-white border-top-0 d-flex justify-content-end gap-2 pb-3">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => abrirModal('ver', 'Detalle de Categoría', cat)}
                  >
                    <FaEye />
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => abrirModal('editar', 'Editar Categoría', cat)}
                  >
                    <FaEdit />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => eliminar(cat._id)}
                  >
                    <FaTrash />
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5 text-muted">
              <h5>No tenés ninguna categoría cargada</h5>
              <p>Hacé clic en "+ Agregar" para empezar a organizar tus finanzas.</p>
            </div>
          </Col>
        )}
      </Row>

      {/* --- MODAL COMPARTIDA --- */}
      <ModalTransac show={show !== ''} handleClose={handleClose} titulo={titulo}>
        <FormCategoria 
          show={show}
          cambiarModo={setShow}
          cerrarModal={handleClose}
          categoriaSeleccionada={categoriaSeleccionada}
          recargarLista={cargarCategorias}
        />
      </ModalTransac>
    </Container>
  );
};

export default Categorias;