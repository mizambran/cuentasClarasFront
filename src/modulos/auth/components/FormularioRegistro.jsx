import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaEye } from 'react-icons/fa';
import { crearUsuario } from '../services/usuarioApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormularioRegistro = () => {

const {register, handleSubmit, reset, formState:{errors}} = useForm()

const navegacion = useNavigate()

const ingresar = () => {
  navegacion('/login')
}

const crear = async(data) => {
  try {
  const respuesta = await crearUsuario(data)
  console.log("Usuario creado", respuesta)
  Swal.fire({
    title:'Usuario creado!',
    icon:'success'
  })
  navegacion('/login')
  } catch (error) {
  console.error("Errores del backend:", error)
  const mensajeError = error.errors ? error.errors[0].msg : (error.mensaje || "Revisá los datos ingresados");

        Swal.fire({
            title: 'Error al registrar',
            text: mensajeError,
            icon: 'error'
        });  
  }
}
const [showPassword, setShowPassword] = useState(false)
const togglePassword = () => {
  setShowPassword(!showPassword)
}

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>
              <Form onSubmit={handleSubmit(crear)}>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label><FaUser className="me-2" />Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Miguel" {...register("nombre", {
                    required:true,
                    minLength:3,
                    maxLength:30
                  })} />
                <Form.Text> {errors.nombre?.message} </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEdad">
                  <Form.Label><FaCalendarAlt className="me-2" />Edad</Form.Label>
                  <Form.Control type="number" placeholder="Ej: 28" {...register("edad", {
                    required:true,
                    min:16,
                    max:112
                  })} />
                  <Form.Text> {errors.edad?.message} </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCorreo">
                  <Form.Label><FaEnvelope className="me-2" />Correo electrónico</Form.Label>
                  <Form.Control type="email" placeholder="correo@ejemplo.com" {...register("email", {
                    required:true,
                    pattern:{
                      value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message:"El formato de email tiene que ser Ej: juanperez@gmail.com"
                    }
                  })} />
                  <Form.Text> {errors.email?.message} </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formContrasena">
                  <Form.Label><FaLock className="me-2" />Contraseña</Form.Label>
                  <Form.Control type={showPassword? "text" : "password"} placeholder="******" {...register("password", {
                    required:true,
                    pattern:{
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,64}$/,
                      message:"Debe tener entre 8 y 64 caracteres"
                    }
                  })} />
                  <Button type='button' variant='outline-primary' onClick={togglePassword}><FaEye /> </Button>
                  <Form.Text> {errors.password?.message} </Form.Text>
                </Form.Group>

                <div className='d-flex justify-content-evenly gap-2'>
                  <Button variant="primary" type="submit" className="w-100">
                  Registrarse
                </Button>
                <Button variant="secondary" type="button" className="w-100" onClick={ingresar}>
                  Ingresar
                </Button>
                </div>
              </Form> 
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioRegistro;