import React from 'react';
import { Container, Row, Col, Card, Form, Table, Button, InputGroup, Badge } from 'react-bootstrap';
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Transacciones = () => {
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      
      {/* --- CABECERA Y BOTÓN AGREGAR --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-secondary mb-0">Mis Transacciones</h2>
        <Button variant="primary" className="d-flex align-items-center shadow-sm">
          <FaPlus className="me-2" /> Agregar
        </Button>
      </div>

      {/* --- SECCIÓN DE FILTROS --- */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Row className="g-3">
            {/* Buscador */}
            <Col xs={12} md={3}>
              <Form.Group controlId="filtroBuscador">
                <Form.Label className="text-muted small mb-1">Buscar concepto</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaSearch className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Ej: Supermercado..." className="border-start-0" />
                </InputGroup>
              </Form.Group>
            </Col>
            
            {/* Filtro Fecha */}
            <Col xs={6} md={2}>
              <Form.Group controlId="filtroFechaDesde">
                <Form.Label className="text-muted small mb-1">Desde</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>

            <Col xs={6} md={2}>
              <Form.Group controlId="filtroFechaHasta">
                <Form.Label className="text-muted small mb-1">Hasta</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>

            {/* Filtro Tipo */}
            <Col xs={12} md={2}>
              <Form.Group controlId="filtroTipo">
                <Form.Label className="text-muted small mb-1">Tipo</Form.Label>
                <Form.Select>
                  <option value="">Todos</option>
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Filtro Categoría */}
            <Col xs={12} md={2}>
              <Form.Group controlId="filtroCategoria">
                <Form.Label className="text-muted small mb-1">Categoría</Form.Label>
                <Form.Select>
                  <option value="">Todas</option>
                  <option value="Sueldo">Sueldo</option>
                  <option value="Alimentacion">Alimentación</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Ocio">Ocio</option>
                  <option value="Otros">Otros</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* --- SECCIÓN DE LA TABLA --- */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="py-3">Tipo</th>
                <th className="py-3">Categoría</th>
                <th className="text-end py-3">Importe</th>
                <th className="text-center py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Fila de ejemplo 1: Ingreso */}
              <tr>
                <td className="px-4">16/12/2025</td>
                <td><Badge bg="success">Ingreso</Badge></td>
                <td>Sueldo</td>
                <td className="text-end fw-bold text-success">$ 200,000</td>
                <td className="text-center">
                  <Button variant="outline-info" size="sm" className="me-2 mb-1 mb-md-0" title="Ver detalle">
                    <FaEye />
                  </Button>
                  <Button variant="outline-warning" size="sm" className="me-2 mb-1 mb-md-0" title="Editar">
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" className="mb-1 mb-md-0" title="Eliminar">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
              
              {/* Fila de ejemplo 2: Gasto */}
              <tr>
                <td className="px-4">16/12/2025</td>
                <td><Badge bg="danger">Gasto</Badge></td>
                <td>Alimentación</td>
                <td className="text-end fw-bold text-danger">$ 35,000</td>
                <td className="text-center">
                  <Button variant="outline-info" size="sm" className="me-2 mb-1 mb-md-0" title="Ver detalle">
                    <FaEye />
                  </Button>
                  <Button variant="outline-warning" size="sm" className="me-2 mb-1 mb-md-0" title="Editar">
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" className="mb-1 mb-md-0" title="Eliminar">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} className='text-center fw-bold'>Total</td>
                    <td className='text-end fw-bold'>$11.000</td>  
                </tr>
            </tfoot>
          </Table>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default Transacciones;