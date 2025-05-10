import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/header.css'; // Tus estilos ya existentes

const LayoutWithHeader = ({ children }) => {
  const [cartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      if (menuOpen) {
        setMenuOpen(false);
      }
      
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <div style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
      <header id="header" className={`${scrolled ? 'scrolled' : ''}`}>
        <Navbar expand="lg" variant="dark" className="custom-navbar">
          <Container className="container-fluid ps-2">
            <Navbar.Brand href="#home" className="logo ms-0 ps-0 d-flex">
              Sweet <span>Dreams</span>
            </Navbar.Brand>

            <div 
              ref={toggleRef}
              className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div 
              ref={menuRef}
              className={`ice-cream-menu ${menuOpen ? 'open' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Nav className="mobile-nav-links">
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                <Nav.Link href="/offers">Ofertas</Nav.Link>
                <Nav.Link href="/location">Ubicación</Nav.Link>
                <Nav.Link href="/contact">Contacto</Nav.Link>
              </Nav>
            </div>

            <Navbar.Collapse id="basic-navbar-nav" className="desktop-menu">
              <Nav className="mx-auto nav-links">
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                <Nav.Link href="/offers">Ofertas</Nav.Link>
                <Nav.Link href="/location">Ubicación</Nav.Link>
                <Nav.Link href="/contact">Contacto</Nav.Link>
              </Nav>

              <div className="cart-icon desktop-cart">
                <a href="#" onClick={() => setCartOpen(!cartOpen)} role="button" style={{ cursor: 'pointer' }}>
                  🛒 <span id="cartCount">{cartCount}</span>
                </a>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default LayoutWithHeader;
