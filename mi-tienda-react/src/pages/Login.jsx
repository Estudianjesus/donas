// src/layout/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/Login.css';

//importar pagina
import AdminPanel from './AdminPanel';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  // Ajuste responsive al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cargar usuario recordado al montar
  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos');
      setIsLoading(false);
      return;
    }

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario: username, contrasena: password })
    })
    
      .then((res) => {
        if (!res.ok) throw new Error('Error en la autenticación');
        return res.json();
      })
      .then((data) => {
        console.log('Respuesta del servidor:', data);

        if (rememberMe) {
          localStorage.setItem('rememberedUser', username);
        } else {
          localStorage.removeItem('rememberedUser');
        }
        navigate('/principal'); // Redirige al panel de administración
        console.log('Usuario autenticado:', data);
      })
      .catch((err) => {
        console.error(err);
        setError('Credenciales incorrectas o error del servidor');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container fluid className="login-container" style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={11} sm={10} md={8} lg={5} xl={4} className="login-wrapper p-0">
          <div className="login-card">
            <div className="login-header">
              <h2>Sweet <span>Dreams</span></h2>
              <p>¡Bienvenido a tu dulce experiencia!</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <div className="input-with-icon">
                  <i className="icon">👤</i>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu nombre de usuario"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-with-icon">
                  <i className="icon">🔒</i>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="remember-forgot-row">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">Recordarme</label>
                </div>
                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="login-decoration">
              {windowWidth > 992 ? (
                <>
                  <div className="ice-cream-1">🍦</div>
                  <div className="ice-cream-2">🍨</div>
                  <div className="ice-cream-3">🧁</div>
                  <div className="ice-cream-4">🍭</div>
                </>
              ) : windowWidth > 768 ? (
                <>
                  <div className="ice-cream-1">🍦</div>
                  <div className="ice-cream-2">🍨</div>
                  <div className="ice-cream-3">🧁</div>
                </>
              ) : (
                <>
                  <div className="ice-cream-1 mobile">🍦</div>
                  <div className="ice-cream-2 mobile">🍨</div>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
