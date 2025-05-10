import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../estilos/promociones.css';

const promocionesMuestra = [
  {
    id: 1,
    nombre: "2x1 Helado de Chocolate",
    descripcion: "Llévate dos por el precio de uno en helado de chocolate belga.",
    precio: 4.99,
    precioAnterior: 9.98,
    imagen: "/placeholder-helado.jpg",
    categoria: "Helados",
    fechaLimite: "20 Abril"
  },
  {
    id: 2,
    nombre: "Combo Donas + Café",
    descripcion: "Una dona glaseada y café por solo $3.99.",
    precio: 3.99,
    precioAnterior: 5.99,
    imagen: "/placeholder-dona.jpg",
    categoria: "Combos",
    fechaLimite: "25 Abril"
  },
  {
    id: 3,
    nombre: "Sundae Especial",
    descripcion: "Sundae con topping doble y fresas por tiempo limitado.",
    precio: 5.49,
    precioAnterior: 7.99,
    imagen: "/placeholder-sundae.jpg",
    categoria: "Helados",
    fechaLimite: "15 Abril"
  },
  {
  id: 4,
  nombre: "Sundae Especial",
  descripcion: "Sundae con topping doble y fresas por tiempo limitado.",
  precio: 5.49,
  precioAnterior: 7.99,
  imagen: "/placeholder-sundae.jpg",
  categoria: "Helados",
  fechaLimite: "15 Abril"
},
{
 id: 5,
nombre: "Sundae Especial",
descripcion: "Sundae con topping doble y fresas por tiempo limitado.",
precio: 5.49,
precioAnterior: 7.99,
imagen: "/placeholder-sundae.jpg",
categoria: "Helados",
fechaLimite: "15 Abril"
}
];

function PromotionsSection() {
  const [promociones, setPromociones] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estado para contador regresivo
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: "05",
    horas: "12",
    minutos: "30",
    segundos: "00"
  });

  useEffect(() => {
    setCargando(true);
    setTimeout(() => {
      setPromociones(promocionesMuestra);
      setCargando(false);
    }, 300);

    // Simulación de contador regresivo
    const intervalo = setInterval(() => {
      // Aquí iría la lógica real para calcular el tiempo restante
      setTiempoRestante(prevTiempo => ({
        ...prevTiempo,
        segundos: String(Math.floor(Math.random() * 59)).padStart(2, '0')
      }));
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const handleVerTodas = () => {
    console.log("Redirigiendo a todas las promociones");
    // Implementar navegación o carga de todas las promociones
  };

  return (
    <div className="promociones-wrapper"  id="offers">
      <div className="promo-banner">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="banner-titulo">
                  <span className="text-highlight">¡HASTA 50% DESCUENTO!</span>
                </h2>
                <h3 className="banner-subtitulo">EN HELADOS Y DONAS</h3>
                <p className="banner-texto">¡Promos por tiempo limitado!</p>
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="producto-showcase">
                  <img src="/dona.jpg" alt="Helado" className="producto-imagen" />
               </div>
                <div className="cuenta-regresiva">
                  <div className="tiempo-item">
                    <div className="tiempo-valor">{tiempoRestante.dias}</div>
                    <div className="tiempo-etiqueta">Días</div>
                  </div>
                  <div className="tiempo-separador">:</div>
                  <div className="tiempo-item">
                    <div className="tiempo-valor">{tiempoRestante.horas}</div>
                    <div className="tiempo-etiqueta">Horas</div>
                  </div>
                  <div className="tiempo-separador">:</div>
                  <div className="tiempo-item">
                    <div className="tiempo-valor">{tiempoRestante.minutos}</div>
                    <div className="tiempo-etiqueta">Minutos</div>
                  </div>
                  <div className="tiempo-separador">:</div>
                  <div className="tiempo-item">
                    <div className="tiempo-valor">{tiempoRestante.segundos}</div>
                    <div className="tiempo-etiqueta">Segundos</div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Encabezado de la sección de promociones */}
      <div className="promo-header-section">
        <Container>
          <div className="text-center">
            <h2 className="promo-section-title">¡PROMOCIONES ESPECIALES!</h2>
          </div>
        </Container>
      </div>

      {/* Beneficios */}
      <section className="beneficios-section">
        <Container>
          <h3 className="beneficios-titulo text-center mb-4">¡Amante de los helados y donas, beneficios exclusivos para ti!</h3>
          <Row className="justify-content-center">
            <Col lg={3} md={6} className="mb-4">
              <div className="beneficio-card">
                <div className="beneficio-icono">
                  <i className="bi bi-credit-card"></i>
                </div>
                <h4 className="beneficio-titulo">PAGOS 100% SEGUROS</h4>
                <p className="beneficio-texto">Paga online o a la hora de recibir tu pedido.</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="beneficio-card">
                <div className="beneficio-icono">
                  <i className="bi bi-shop"></i>
                </div>
                <h4 className="beneficio-titulo">COMPRA FÁCIL</h4>
                <p className="beneficio-texto">De manera 100% segura, desde donde estés.</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="beneficio-card">
                <div className="beneficio-icono">
                  <i className="bi bi-tag"></i>
                </div>
                <h4 className="beneficio-titulo">OFERTAS EXCLUSIVAS</h4>
                <p className="beneficio-texto">Las mejores promos en tus helados y donas favoritas.</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="beneficio-card">
                <div className="beneficio-icono">
                  <i className="bi bi-truck"></i>
                </div>
                <h4 className="beneficio-titulo">AMPLIA COBERTURA</h4>
                <p className="beneficio-texto">Pide por Delivery y recibe tu pedido más rápido.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Lista de promociones */}
      <section className="promociones-seccion">
        <Container>
          <h3 className="promos-subtitle text-center mb-5">Más promos que no te puedes perder...</h3>

          {cargando ? (
            <div className="text-center py-5">
              <div className="spinner-carga"></div>
            </div>
          ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {promociones.map((promo, index) => (
              <SwiperSlide key={promo.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="promo-card">
                    <div className="promo-image-container">
                      <img src={promo.imagen} alt={promo.nombre} className="promo-image" />
                      <div className="promo-badge"><span>OFERTA</span></div>
                      <div className="promo-discount">
                        {Math.round(((promo.precioAnterior - promo.precio) / promo.precioAnterior) * 100)}% DSCTO
                      </div>
                    </div>
                    <Card.Body>
                      <div className="promo-category">{promo.categoria}</div>
                      <Card.Title className="promo-title">{promo.nombre}</Card.Title>
                      <Card.Text className="promo-description">{promo.descripcion}</Card.Text>
                      <div className="promo-footer">
                        <div className="promo-prices">
                          <span className="promo-old-price">${promo.precioAnterior.toFixed(2)}</span>
                          <span className="promo-price">${promo.precio.toFixed(2)}</span>
                        </div>
                        <div className="promo-limit">Hasta: {promo.fechaLimite}</div>
                      </div>
                      <Button className="promo-button">Aprovechar</Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          )}

          <div className="text-center mt-5">
            <Button className="ver-todo-btn" onClick={handleVerTodas}>
              Ver Todo <i className="bi bi-arrow-right"></i>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default PromotionsSection;