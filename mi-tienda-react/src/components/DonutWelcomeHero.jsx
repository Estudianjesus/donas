import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/estilodonas.css';

const DonutWelcomeHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const palabrasClave = ["DELICIOSAS", "FRESCAS", "ARTESANALES", "IRRESISTIBLES"];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % palabrasClave.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParallaxStyle = (factor) => ({
    transform: `translateY(${scrollY * factor}px)`
  });

  /* const navigate = useNavigate();  // Inicializas el hook useNavigate

  const handleClick = () => {
    navigate('/productos');  // Rediriges a la página de productos
  }; */

  const handleClick = () => {
    const productosSection = document.getElementById('products');
    productosSection.scrollIntoView({ behavior: 'smooth' });

  }
  const handlePromocionesClick = () => {
    const promocionesSection = document.getElementById('offers');
    promocionesSection.scrollIntoView({ behavior: 'smooth' });  
  };


  return (
    <div className="donut-welcome-wrapper">
      {/* Donas flotantes */}
      <div className="floating-elements">
        <div className="floating-donut donut-1" style={getParallaxStyle(0.2)}>
          <img src="/img/dona_1.webp" alt="Dona de chocolate" />
        </div>
        <div className="floating-donut donut-2" style={getParallaxStyle(0.1)}>
          <img src="/img/dona_1.webp" alt="Dona de fresa" />
        </div>
        <div className="floating-donut donut-3" style={getParallaxStyle(0.15)}>
          <img src="/img/dona_1.webp" alt="Dona glaseada" />
        </div>
        <div className="floating-donut donut-4" style={getParallaxStyle(0.25)}>
          <img src="/img/dona_1.webp" alt="Dona con sprinkles" />
        </div>
        <div className="floating-element sprinkle-1" />
        <div className="floating-element sprinkle-2" />
        <div className="floating-element sprinkle-3" />
        <div className="floating-element sprinkle-4" />
      </div>

      {/* Sección principal */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center hero-row">
            <Col lg={6} md={12} className="hero-content">
              <div className="animated-content">
                <h1 className="hero-title">
                  DONAS <br />
                  <span className="highlighted-word">
                    <span className="animated-word">{palabrasClave[activeIndex]}</span>
                  </span>
                </h1>
                <p className="hero-subtitle">
                  Descubre el dulce placer de nuestras donas artesanales, hechas con ingredientes premium y mucho amor.
                </p>
                <div className="hero-buttons">
                  <Button className="btn-primary-custom" onClick={handleClick} >Ver Catálogo</Button>
                  <Button className="btn-outline-custom ml-3" onClick={handlePromocionesClick}>Promociones</Button>
                </div>
                <div className="hero-features">
                  <div className="feature"><div className="feature-icon">✓</div><div className="feature-text">Ingredientes frescos</div></div>
                  <div className="feature"><div className="feature-icon">✓</div><div className="feature-text">Envío a domicilio</div></div>
                  <div className="feature"><div className="feature-icon">✓</div><div className="feature-text">Elaboración diaria</div></div>
                </div>
              </div>
            </Col>

            <Col lg={6} md={12} className="hero-image-col">
              <div className="hero-image-container">
                <div className="hero-image-circle">
                  <img src="/img/dona_1.webp" alt="Dona principal" className="hero-image" />
                </div>
                <div className="floating-badge badge-new"><span>¡NUEVOS SABORES!</span></div>
                <div className="floating-badge badge-discount"><span>HASTA 25% OFF</span></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </div>
  );
};

export default DonutWelcomeHero;