import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/productos.css'; // Asegúrate de tener este archivo CSS para los estilos

// Datos de ejemplo para mostrar inicialmente - después se cargarán desde el panel de administración
const productosMuestra = [
  {
    id: 1,
    nombre: "Dona Glaseada Fresa",
    descripcion: "Dona esponjosa con glaseado de fresa y chispas",
    precio: 2.99,
    precioAnterior: 3.99, // Precio antes del descuento
    descuento: true, // Tiene descuento
    porcentajeDescuento: 25, // 25% de descuento
    color: "#FF5252", // Rojo
    imagen: "/placeholder-dona.jpg", // Aquí iría la imagen real
    categoria: "Donas"
  },
  {
    id: 2,
    nombre: "Dona de Chocolate",
    descripcion: "Dona bañada en chocolate con chispas de colores",
    precio: 3.49,
    descuento: false,
    color: "#FF9800", // Naranja
    imagen: "/placeholder-dona-choco.jpg",
    categoria: "Donas"
  },
  {
    id: 3,
    nombre: "Dona Arcoíris",
    descripcion: "Dona con glaseado multicolor y dulces",
    precio: 3.99,
    precioAnterior: 4.99,
    descuento: true,
    porcentajeDescuento: 20,
    color: "#FFEB3B", // Amarillo
    imagen: "/placeholder-dona-arcoiris.jpg",
    categoria: "Donas Especiales"
  },
  {
    id: 4,
    nombre: "Dona Rellena",
    descripcion: "Dona rellena de crema pastelera y cobertura de azúcar",
    precio: 3.99,
    descuento: false,
    color: "#2196F3", // Azul
    imagen: "/placeholder-dona-rellena.jpg",
    categoria: "Donas"
  },
  {
    id: 5,
    nombre: "Dona de Vainilla",
    descripcion: "Dona clásica con glaseado de vainilla",
    precio: 2.79,
    descuento: false,
    color: "#4CAF50", // Verde
    imagen: "/placeholder-vainilla.jpg",
    categoria: "Donas"
  },
  {
    id: 6,
    nombre: "Dona de Fresa",
    descripcion: "Dona con cobertura de fresa y chispas blancas",
    precio: 3.29,
    precioAnterior: 3.99,
    descuento: true,
    porcentajeDescuento: 15,
    color: "#E91E63", // Rosa
    imagen: "/placeholder-fresa.jpg",
    categoria: "Donas"
  },
  {
    id: 7,
    nombre: "Dona de Limón",
    descripcion: "Dona con glaseado de limón refrescante",
    precio: 2.89,
    descuento: false,
    color: "#CDDC39", // Lima
    imagen: "/placeholder-limon.jpg",
    categoria: "Donas"
  },
  {
    id: 8,
    nombre: "Dona de Caramelo",
    descripcion: "Dona con topping de caramelo y sal marina",
    precio: 3.59,
    descuento: false,
    color: "#FF5722", // Naranja oscuro
    imagen: "/placeholder-caramelo.jpg",
    categoria: "Donas Especiales"
  },
  {
    id: 9,
    nombre: "Dona de Menta",
    descripcion: "Dona con glaseado de menta y chispas de chocolate",
    precio: 3.39,
    precioAnterior: 3.99,
    descuento: true,
    porcentajeDescuento: 15,
    color: "#009688", // Verde azulado
    imagen: "/placeholder-menta.jpg",
    categoria: "Donas"
  },
  {
    id: 10,
    nombre: "Dona Rellena de Frambuesa",
    descripcion: "Dona rellena de mermelada de frambuesa",
    precio: 3.89,
    descuento: false,
    color: "#9C27B0", // Púrpura
    imagen: "/placeholder-frambuesa.jpg",
    categoria: "Donas Especiales"
  },
  {
    id: 11,
    nombre: "Dona de Café",
    descripcion: "Dona con glaseado sabor a café y espolvoreado de canela",
    precio: 3.49,
    descuento: false,
    color: "#795548", // Marrón
    imagen: "/placeholder-cafe.jpg",
    categoria: "Donas"
  },
  {
    id: 12,
    nombre: "Dona de Pistache",
    descripcion: "Dona cubierta con crema de pistache y trozos de nuez",
    precio: 3.99,
    precioAnterior: 4.99,
    descuento: true,
    porcentajeDescuento: 20,
    color: "#8BC34A", // Verde claro
    imagen: "/placeholder-pistache.jpg",
    categoria: "Donas Premium"
  }
];

// Lista de categorías (sacadas de los productos)
const todasCategorias = ["Todos", ...new Set(productosMuestra.map(producto => producto.categoria))];

function ProductsSection() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [cargando, setCargando] = useState(true);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // Filtrar productos cuando cambia la categoría
  useEffect(() => {
    setCargando(true);
    // Simulamos una carga desde una API
    setTimeout(() => {
      let filtrados;
      if (categoriaSeleccionada === "Todos") {
        filtrados = productosMuestra;
      } else {
        filtrados = productosMuestra.filter(producto => 
          producto.categoria === categoriaSeleccionada
        );
      }
      setProductosFiltrados(filtrados);
      
      // Mostrar solo los primeros 8 o todos según el estado
      if (mostrarTodos) {
        setProductos(filtrados);
      } else {
        setProductos(filtrados.slice(0, 8));
      }
      
      setCargando(false);
    }, 300);
  }, [categoriaSeleccionada, mostrarTodos]);

  // Función para cambiar la categoría
  const cambiarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMostrarTodos(false); // Reset a mostrar inicial al cambiar categoría
  };

  // Función para mostrar todos los productos
  const toggleMostrarTodos = () => {
    setMostrarTodos(true);
  };

  // Función para añadir al carrito (implementación futura)
  const añadirAlCarrito = (producto) => {
    console.log("Añadiendo al carrito:", producto);
    // Aquí se implementará la funcionalidad del carrito
  };

  return (
    <section id="products" className="productos-seccion py-5">
      {/* Manchas de colores decorativas */}
      <div className="manchas-container">
        <div className="mancha mancha-1"></div>
        <div className="mancha mancha-2"></div>
        <div className="mancha mancha-3"></div>
        <div className="mancha mancha-4"></div>
        <div className="mancha mancha-5"></div>
        <div className="mancha mancha-6"></div>
      </div>
      
      <Container>
        <div className="text-center mb-5">
          <div className="titulo-container">
            <h2 className="seccion-titulo">Nuestras Deliciosas Donas</h2>
            <div className="splash-icon">🍩</div>
          </div>
          <p className="seccion-subtitulo">Descubre todos nuestros coloridos sabores y variedades</p>
        </div>

        {/* Filtro de Categorías */}
        <div className="categorias-filtro mb-4">
          <Row className="justify-content-center">
            <Col xs={12}>
              <div className="botones-categoria">
                {todasCategorias.map((categoria, index) => (
                  <Button
                    key={index}
                    variant="outline-primary"
                    className={`btn-categoria ${categoriaSeleccionada === categoria ? 'activo' : ''}`}
                    onClick={() => cambiarCategoria(categoria)}
                  >
                    {categoria}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        {/* Rejilla de Productos */}
        <Row>
          {cargando ? (
            <Col xs={12} className="text-center py-5">
              <div className="spinner-carga"></div>
            </Col>
          ) : (
            productos.map((producto) => (
              <Col key={producto.id} xs={12} sm={6} lg={3} className="mb-4">
                <Card className="producto-tarjeta h-100">
                  {/* Distintivo de descuento */}
                  {producto.descuento && (
                    <div className="descuento-badge">
                      <span className="descuento-texto">-{producto.porcentajeDescuento}%</span>
                    </div>
                  )}
                  
                  <div className="producto-imagen-contenedor">
                    {/* Aquí iría la imagen real del producto */}
                    <div className="marco-imagen" style={{ borderColor: producto.color }}>
                      <div className="producto-imagen" style={{ 
                        backgroundImage: `url(/api/placeholder/400/320)` 
                        // Cuando se implementen las imágenes reales:
                        // backgroundImage: `url(${producto.imagen})` 
                      }}>
                      </div>
                    </div>
                    
                    {/* Splash de color detrás de la imagen */}
                    <div className="splash-color" style={{ backgroundColor: producto.color }}></div>
                    
                    {/* Etiqueta de categoría */}
                    <div className="categoria-badge" style={{ backgroundColor: producto.color }}>
                      {producto.categoria === "Donas Especiales" ? "Especial" : 
                      producto.categoria === "Donas Premium" ? "Premium" : "Clásica"}
                    </div>
                  </div>
                  
                  <Card.Body>
                    <Card.Title className="nombre-producto">{producto.nombre}</Card.Title>
                    <Card.Text>{producto.descripcion}</Card.Text>
                    <div className="precios-container">
                      {producto.descuento && (
                        <span className="precio-anterior">${producto.precioAnterior.toFixed(2)}</span>
                      )}
                      <span className="producto-precio" style={{ color: producto.color }}>
                        ${producto.precio.toFixed(2)}
                      </span>
                    </div>
                    <div className="boton-container mt-3">
                      <Button 
                        variant="primary" 
                        className="btn-añadir"
                        onClick={() => añadirAlCarrito(producto)}
                        style={{ backgroundColor: producto.color, borderColor: producto.color }}
                      >
                        Añadir al carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}

          {!cargando && productos.length === 0 && (
            <Col xs={12} className="text-center py-5">
              <p>No hay productos disponibles en esta categoría</p>
            </Col>
          )}
        </Row>
        
        {/* Botón Ver Más */}
        {!cargando && !mostrarTodos && productosFiltrados.length > 8 && (
          <div className="text-center mt-4 mb-3">
            <Button 
              variant="outline-primary" 
              className="btn-ver-mas"
              onClick={toggleMostrarTodos}
            >
              Ver todas las donas
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default ProductsSection;