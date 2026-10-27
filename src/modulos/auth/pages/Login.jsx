import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../../../context/UsuarioContext";
import { loginUsuario } from "../services/usuarioApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const { usuario, setUsuario, logueado, setLogueado, isAdmin, setIsAdmin } =
    useContext(UsuarioContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();

  const ingresar = async (data) => {
    try {
      setCargando(true);
      const respuesta = await loginUsuario(data);
      console.log(respuesta);
      localStorage.setItem(`tokenCC`, respuesta.token);
      localStorage.setItem("usuarioCC",respuesta.nombre)

      setUsuario({
        id: respuesta._id,
        nombre: respuesta.nombre,
        email: respuesta.email,
        rol: respuesta.rol,
      });

      setLogueado(true);
      setCargando(false)
      if (respuesta.rol === "admin") {
        setIsAdmin(true);
      }
      Swal.fire({
        title: "Bienvenido!",
        icon: "success",
      });
      navegacion("/dashboard");

    } catch (error) {
      console.error("Error al intentar ingresar", error);
      Swal.fire({
        title: "Credenciales inválidas!",
        icon: "error"
      });
      reset()
      setCargando(false)
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          {cargando ? (
            <div className="d-flex flex-column justify-content-center align-items-center my-5">
              <Spinner animation="border" variant="primary" className="mt-5 mb-3" />
              <p>Cargando...</p>
            </div>
          ) : (
            <Card className="shadow-sm p-4">
              <Card.Body>
                <h3 className="text-center mb-4 text-primary">
                  Iniciar Sesión
                </h3>
                <Form onSubmit={handleSubmit(ingresar)}>
                  <Form.Group className="mb-3" controlId="loginCorreo">
                    <Form.Label>
                      <FaEnvelope className="me-2" />
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...register("email", {
                        required: "Tienes que ingresar un email",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message:
                            "El email tiene que ser un formato válido. Ej: juanperez@gmail.com",
                        },
                      })}
                    />
                    <Form.Text> {errors.email?.message} </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="loginContrasena">
                    <Form.Label>
                      <FaLock className="me-2" />
                      Contraseña
                    </Form.Label>
                    <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="*********"
                      {...register("password", {
                        required: "Tienes que ingresar una contraseña",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,64}$/,
                          message: "Debe tener entre 8 y 64 caracteres",
                        },
                      })}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={togglePassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    </InputGroup>
                    <Form.Text className="text-danger"> {errors.password?.message} </Form.Text>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                  >
                    Ingresar
                  </Button>

                  <div className="text-center">
                    <small className="text-muted">
                      ¿No tenés cuenta?{" "}
                      <Link to="/registrar">Registrate acá</Link>
                    </small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
