import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AgregarProducto from './AgregarProducto';

const ProductosSection = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarAgregarProducto, setMostrarAgregarProducto] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroDestacados, setFiltroDestacados] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Cargar productos desde el backend al iniciar
  useEffect(() => {
    setCargando(true);
    fetch('http://localhost:3000/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        return response.json();
      })
      .then(data => {
        setProductos(data);
        setProductosFiltrados(data);
        
        // Extraer categorías únicas para el filtro
        const categoriasUnicas = [...new Set(data.map(producto => producto.categoria))];
        setCategorias(categoriasUnicas);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
        setError('No se pudieron cargar los productos. Intente nuevamente más tarde.');
        setCargando(false);
      });
  }, []);

  // Filtrar productos cuando cambia algún filtro o la lista de productos
  useEffect(() => {
    let resultado = [...productos];
    
    // Filtrar por nombre
    if (filtroNombre.trim() !== '') {
      resultado = resultado.filter(producto => 
        producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
      );
    }
    
    // Filtrar por categoría
    if (filtroCategoria && filtroCategoria !== 'todas') {
      resultado = resultado.filter(producto => 
        producto.categoria === filtroCategoria
      );
    }
    
    // Filtrar por estado (activo/inactivo)
    if (filtroEstado === 'activos') {
      resultado = resultado.filter(producto => producto.activo);
    } else if (filtroEstado === 'inactivos') {
      resultado = resultado.filter(producto => !producto.activo);
    }
    
    // Filtrar por destacados
    if (filtroDestacados) {
      resultado = resultado.filter(producto => producto.destacado);
    }
    
    setProductosFiltrados(resultado);
  }, [filtroNombre, filtroCategoria, filtroEstado, filtroDestacados, productos]);

  // Eliminar producto del backend y del estado
  const handleEliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      fetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setProductos(productos.filter(producto => producto.id !== id));
            return response.json();
          } else {
            throw new Error('Error al eliminar producto');
          }
        })
        .then(data => {
          // Mostrar mensaje de éxito si es necesario
        })
        .catch(error => {
          console.error('Error en la petición DELETE:', error);
          setError('No se pudo eliminar el producto. Intente nuevamente.');
        });
    }
  };

  // Cambiar estado activo/inactivo
  const handleCambiarEstado = (id) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    // Invertir el estado actual
    const nuevoEstado = !producto.activo;
    
    fetch(`http://localhost:3000/api/productos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activo: nuevoEstado }),
    })
      .then(response => {
        if (response.ok) {
          // Actualizar el estado local
          setProductos(productos.map(p => 
            p.id === id ? { ...p, activo: nuevoEstado } : p
          ));
          return response.json();
        } else {
          throw new Error('Error al actualizar estado del producto');
        }
      })
      .catch(error => {
        console.error('Error en la petición PATCH:', error);
        setError('No se pudo actualizar el estado del producto. Intente nuevamente.');
      });
  };

  const handleAbrirAgregarProducto = () => {
    setProductoSeleccionado(null);
    setMostrarAgregarProducto(true);
  };

  const handleEditarProducto = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      setProductoSeleccionado(producto);
      setMostrarAgregarProducto(true);
    }
  };

  const handleCerrarAgregarProducto = (nuevoProducto) => {
    setMostrarAgregarProducto(false);
    setProductoSeleccionado(null);
    
    if (nuevoProducto) {
      if (nuevoProducto.id) {
        // Actualizar producto existente
        setProductos(productos.map(p => 
          p.id === nuevoProducto.id ? nuevoProducto : p
        ));
      } else {
        // Añadir nuevo producto
        setProductos([...productos, nuevoProducto]);
        
        // Añadir nueva categoría al filtro si no existía
        if (nuevoProducto.categoria && !categorias.includes(nuevoProducto.categoria)) {
          setCategorias([...categorias, nuevoProducto.categoria]);
        }
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  if (mostrarAgregarProducto) {
    return (
      <AgregarProducto
        onClose={handleCerrarAgregarProducto}
        onAdd={handleCerrarAgregarProducto}
        categorias={categorias}
        productoExistente={productoSeleccionado}
      />
    );
  }

  const limpiarFiltros = () => {
    setFiltroNombre('');
    setFiltroCategoria('');
    setFiltroEstado('todos');
    setFiltroDestacados(false);
  };

  return (
    <div className="py-3 mt-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h1 className="fs-2 fw-bold text-dark">Productos</h1>
          <p className="text-muted">Aquí puedes gestionar tus productos.</p>
        </div>
        <button
          className="btn btn-danger d-flex align-items-center"
          style={{ background: 'linear-gradient(to right, #f472b6, #dd3675)' }}
          onClick={handleAbrirAgregarProducto}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" className="me-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Agregar Producto
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close float-end"
            onClick={() => setError(null)}
            aria-label="Close">
          </button>
        </div>
      )}

      {/* Filtros de productos */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Filtros</h5>
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                    className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre..."
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={filtroCategoria} 
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="todas">Todas las categorías</option>
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="activos">Solo activos</option>
                <option value="inactivos">Solo inactivos</option>
              </select>
            </div>
            <div className="col-md-2">
              <div className="form-check form-switch">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="filtroDestacados"
                  checked={filtroDestacados}
                  onChange={(e) => setFiltroDestacados(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="filtroDestacados">
                  Solo destacados
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      {cargando ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th style={{width: "80px"}}>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Destacado</th>
                <th>Última Actualización</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map(producto => (
                  <tr key={producto.id} className={!producto.activo ? 'table-secondary' : ''}>
                    <td>
                      <div 
                        className="product-thumbnail"
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundImage: `url(${producto.imagen})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '4px',
                          border: `2px solid ${producto.color}`,
                          opacity: producto.activo ? 1 : 0.6
                        }}
                      >
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold">{producto.nombre}</div>
                      <small className="text-muted">{producto.descripcion.substring(0, 50)}{producto.descripcion.length > 50 ? '...' : ''}</small>
                    </td>
                    <td>
                      <span className="badge bg-info">{producto.categoria}</span>
                    </td>
                    <td>
                      {producto.descuento ? (
                        <div>
                          <span className="fw-bold">{formatPrice(producto.precio)}</span>
                          <br />
                          <small className="text-decoration-line-through text-muted">
                            {formatPrice(producto.precioAnterior)}
                          </small>
                          <small className="text-success ms-2">
                            -{producto.porcentajeDescuento}%
                          </small>
                        </div>
                      ) : (
                        <span>{formatPrice(producto.precio)}</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${producto.stock > 10 ? 'bg-success' : (producto.stock > 0 ? 'bg-warning' : 'bg-danger')}`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={producto.activo}
                          onChange={() => handleCambiarEstado(producto.id)}
                          id={`estado-${producto.id}`}
                        />
                        <label className="form-check-label" htmlFor={`estado-${producto.id}`}>
                          {producto.activo ? 
                            <span className="badge bg-success">Activo</span> : 
                            <span className="badge bg-secondary">Inactivo</span>
                          }
                        </label>
                      </div>
                    </td>
                    <td>
                      {producto.destacado ? (
                        <span className="badge bg-warning">Destacado</span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      {new Date(producto.fechaActualizacion).toLocaleDateString()}
                    </td>
                    <td className="text-end">
                      <div className="btn-group">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditarProducto(producto.id)}
                          title="Editar producto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                          </svg>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleEliminarProducto(producto.id)}
                          title="Eliminar producto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => console.log('Ver detalles', producto.id)}
                          title="Ver detalles"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    {filtroNombre || filtroCategoria !== 'todas' || filtroEstado !== 'todos' || filtroDestacados ? 
                      'No se encontraron productos con los filtros aplicados' : 
                      'No hay productos disponibles'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center p-2">
            <div>
              <small className="text-muted">
                Mostrando {productosFiltrados.length} de {productos.length} productos
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosSection;