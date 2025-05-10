import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgregarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(''); 
    const [precioAnterior, setPrecioAnterior] = useState(''); 
    const [descuento, setDescuento] = useState(true);
    const [porcentajeDescuento, setPorcentajeDescuento] = useState('');
    const [color, setColor] = useState('#ff6b6b');
    const [imagen, setImagen] = useState('');
    const [imagenFile, setImagenFile] = useState(null);
    const [imagenPreview, setImagenPreview] = useState('');
    const [categoria, setCategoria] = useState('');
    const [stock, setStock] = useState('');
    const [destacado, setDestacado] = useState(true);
    const [vistaPrevia, setVistaPrevia] = useState('card');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Estado para manejar categorías personalizadas
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [categorias, setCategorias] = useState([
        "Chocolates", 
        "Caramelos", 
        "Pasteles", 
        "Galletas"
    ]);
    
    // Función para agregar una nueva categoría
    const agregarCategoria = () => {
        if (nuevaCategoria.trim() !== '' && !categorias.includes(nuevaCategoria.trim())) {
            setCategorias([...categorias, nuevaCategoria.trim()]);
            setCategoria(nuevaCategoria.trim()); // Seleccionar automáticamente la nueva categoría
            setNuevaCategoria('');
        }
    };

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagenFile(file);
            
            // Crear URL para vista previa
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setImagenPreview(e.target.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        // Validaciones básicas
        if (!nombre || !precio || !categoria) {
            setError('Los campos Nombre, Precio y Categoría son obligatorios');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setSuccessMessage('');
        
        try {
            // Crear FormData para enviar imagen y datos
            const formData = new FormData();
            
            const productoData = {
                nombre,
                descripcion,
                precio: parseFloat(precio),
                precioAnterior: parseFloat(precioAnterior) || null,
                descuento,
                porcentajeDescuento: parseFloat(porcentajeDescuento) || 0,
                color,
                categoria,
                stock: parseInt(stock) || 0,
                destacado,
                usuario_id: 1 // Idealmente, esto debería venir de un sistema de autenticación
            };
            
            // Configuración de la solicitud
            let response;
            
            if (imagenFile) {
                // Si hay archivo, usar FormData
                formData.append('producto', JSON.stringify(productoData));
                formData.append('imagen', imagenFile);
                
                response = await fetch('/api/productos', { // Ajustar la URL según tu configuración
                    method: 'POST',
                    body: formData
                });
            } else if (imagen) {
                // Si solo hay URL, usar JSON
                productoData.imagen = imagen;
                
                response = await fetch('/api/productos', { // Ajustar la URL según tu configuración
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(productoData)
                });
            } else {
                // Sin imagen
                response = await fetch('/api/productos', { // Ajustar la URL según tu configuración
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(productoData)
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setSuccessMessage('Producto guardado exitosamente');
            console.log('Producto guardado:', data);
            
            // Resetear el formulario después de guardar
            resetForm();
            
        } catch (err) {
            setError(err.message || 'Error al guardar el producto');
            console.error('Error al guardar producto:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para resetear el formulario
    const resetForm = () => {
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setPrecioAnterior('');
        setDescuento(true);
        setPorcentajeDescuento('');
        setColor('#ff6b6b');
        setImagen('');
        setImagenFile(null);
        setImagenPreview('');
        setCategoria('');
        setStock('');
        setDestacado(true);
    };

    // Calculamos el precio con descuento para mostrarlo en la vista previa
    const precioConDescuento = descuento && precio && porcentajeDescuento
        ? (parseFloat(precio) * (1 - parseFloat(porcentajeDescuento) / 100)).toFixed(2) 
        : parseFloat(precio).toFixed(2);

    // URL de imagen para mostrar en la vista previa
    const imagenMostrar = imagenPreview || imagen || 'https://via.placeholder.com/300x300?text=Sin+Imagen';

    return (
        <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #f472b6, #a855f7, #60a5fa)' }}>
            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <h1 className="fs-3 fw-bold text-white mb-0">Sweet<span className="text-warning">Dreams</span></h1>
                        <span className="ms-4 text-white">Panel de Administración</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="bg-warning text-danger px-3 py-1 rounded-pill fw-bold me-3">
                            Admin
                        </div>
                        <div className="bg-white p-2 rounded-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#f472b6" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Formulario */}
                    <div className="col-lg-6">
                        <div className="bg-white p-4 rounded-3 shadow">
                            <h2 className="fs-4 fw-bold mb-4 text-danger d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="me-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Agregar Producto
                            </h2>
                            
                            {/* Mensajes de éxito o error */}
                            {successMessage && (
                                <div className="alert alert-success" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <div className="mb-3">
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Nombre:</label>
                                        <div className="input-group">
                                            <span className="input-group-text text-danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            </span>
                                            <input
                                                type="text"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                className="form-control"
                                                placeholder="Nombre del producto"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Categoría:</label>
                                        <div className="mb-2">
                                            <div className="input-group">
                                                <span className="input-group-text text-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nombre de categoría"
                                                    value={nuevaCategoria}
                                                    onChange={(e) => setNuevaCategoria(e.target.value)}
                                                />
                                                <button 
                                                    className="btn btn-outline-danger" 
                                                    type="button"
                                                    onClick={agregarCategoria}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text text-danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                                                </svg>
                                            </span>
                                            <select
                                                className="form-select"
                                                value={categoria}
                                                onChange={(e) => setCategoria(e.target.value)}
                                            >
                                                <option value="">Seleccionar categoría existente</option>
                                                {categorias.map((cat, index) => (
                                                    <option key={index} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <div className="d-flex flex-wrap gap-1">
                                                {categorias.map((cat, index) => (
                                                    <span key={index} className="badge bg-light text-dark border me-1 mb-1 p-2">
                                                        {cat}
                                                        <button 
                                                            type="button" 
                                                            className="btn-close ms-1" 
                                                            style={{fontSize: '0.6rem'}}
                                                            onClick={() => setCategorias(categorias.filter(c => c !== cat))}
                                                            aria-label="Eliminar"
                                                        ></button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Descripción:</label>
                                    <div className="input-group">
                                        <span className="input-group-text text-danger">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                            </svg>
                                        </span>
                                        <textarea
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            className="form-control"
                                            rows="3"
                                            placeholder="Describe el producto..."
                                        />
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Precio:</label>
                                        <div className="input-group">
                                            <span className="input-group-text text-danger">$</span>
                                            <input
                                                type="number"
                                                value={precio}
                                                onChange={(e) => setPrecio(e.target.value)}
                                                className="form-control"
                                                step="0.01"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Precio Anterior:</label>
                                        <div className="input-group">
                                            <span className="input-group-text text-danger">$</span>
                                            <input
                                                type="number"
                                                value={precioAnterior}
                                                onChange={(e) => setPrecioAnterior(e.target.value)}
                                                className="form-control"
                                                step="0.01"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Stock:</label>
                                        <div className="input-group">
                                            <span className="input-group-text text-danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                            </span>
                                            <input
                                                type="number"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                                className="form-control"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="card bg-light">
                                            <div className="card-body py-2">
                                                <div className="form-check">
                                                    <input
                                                        id="descuento"
                                                        type="checkbox"
                                                        checked={descuento}
                                                        onChange={(e) => setDescuento(e.target.checked)}
                                                        className="form-check-input"
                                                    />
                                                    <label htmlFor="descuento" className="form-check-label fw-semibold">Aplicar Descuento</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Porcentaje (%):</label>
                                        <div className="input-group">
                                            <span className="input-group-text text-danger">%</span>
                                            <input
                                                type="number"
                                                value={porcentajeDescuento}
                                                onChange={(e) => setPorcentajeDescuento(e.target.value)}
                                                disabled={!descuento}
                                                className={`form-control ${!descuento ? 'bg-light' : ''}`}
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-12">
                                        <label className="form-label fw-semibold">Imagen del Producto:</label>
                                        <div className="card bg-light">
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text text-danger">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </span>
                                                        <input 
                                                            type="file" 
                                                            className="form-control" 
                                                            id="imagenFile"
                                                            accept="image/*"
                                                            onChange={handleImagenChange} 
                                                        />
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-text text-danger">URL</span>
                                                        <input
                                                            type="text"
                                                            value={imagen}
                                                            onChange={(e) => setImagen(e.target.value)}
                                                            className="form-control"
                                                            placeholder="O ingresa una URL de imagen"
                                                        />
                                                    </div>
                                                    <small className="text-muted">Puedes subir una imagen o ingresar su URL</small>
                                                </div>
                                                
                                                {/* Vista previa de imagen */}
                                                {(imagenPreview || imagen) && (
                                                    <div className="text-center border p-2">
                                                        <p className="mb-1 small text-muted">Vista previa:</p>
                                                        <img 
                                                            src={imagenMostrar} 
                                                            className="img-thumbnail" 
                                                            alt="Vista previa" 
                                                            style={{ height: "100px", objectFit: "contain" }} 
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Color:</label>
                                        <div className="d-flex">
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="form-control-color me-2"
                                            />
                                            <input
                                                type="text"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="form-control"
                                                placeholder="#000000"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Destacado:</label>
                                        <div className="card bg-light h-75">
                                            <div className="card-body d-flex align-items-center">
                                                <div className="form-check">
                                                    <input
                                                        id="destacado"
                                                        type="checkbox"
                                                        checked={destacado}
                                                        onChange={(e) => setDestacado(e.target.checked)}
                                                        className="form-check-input"
                                                    />
                                                    <label htmlFor="destacado" className="form-check-label fw-semibold">Producto Destacado</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleSubmit} 
                                    className="btn btn-danger w-100 py-2 mt-3 fw-bold"
                                    style={{ background: 'linear-gradient(to right, #f472b6, #dd3675)' }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="me-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                        </svg>
                                    )}
                                    {isLoading ? 'Guardando...' : 'Guardar Producto'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Vista previa */}
                    <div className="col-lg-6">
                        <div className="bg-white p-3 rounded-3 shadow mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="fs-5 fw-bold text-danger mb-0">Vista Previa</h2>
                                <div className="btn-group" role="group">
                                    <button 
                                        onClick={() => setVistaPrevia('card')} 
                                        className={`btn btn-sm ${vistaPrevia === 'card' ? 'btn-danger' : 'btn-light'}`}
                                    >
                                        Tarjeta
                                    </button>
                                    <button 
                                        onClick={() => setVistaPrevia('detail')} 
                                        className={`btn btn-sm ${vistaPrevia === 'detail' ? 'btn-danger' : 'btn-light'}`}
                                    >
                                        Detalle
                                    </button>
                                </div>
                            </div>
                        </div>

                        {vistaPrevia === 'card' ? (
                            <div className="card shadow">
                                <div className="position-relative">
                                    <img src={imagenMostrar} alt={nombre || 'Producto'} className="card-img-top" style={{ height: "256px", objectFit: "cover" }} />
                                    {destacado && (
                                        <span className="position-absolute top-0 end-0 badge bg-warning m-2 rounded-pill">
                                            Destacado
                                        </span>
                                    )}
                                    {descuento && porcentajeDescuento > 0 && (
                                        <span className="position-absolute top-0 start-0 badge bg-danger m-2 rounded-pill">
                                            {porcentajeDescuento}% OFF
                                        </span>
                                    )}
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <h5 className="card-title fw-bold">{nombre || 'Nombre del producto'}</h5>
                                        <div className="rounded-circle" style={{ height: "20px", width: "20px", backgroundColor: color }}></div>
                                    </div>
                                    <p className="text-danger mb-2 small fw-semibold">{categoria || 'Categoría'}</p>
                                    <div className="mb-2">
                                        {descuento && porcentajeDescuento > 0 && precio ? (
                                            <div className="d-flex align-items-center">
                                                <span className="fw-bold fs-5">${isNaN(precioConDescuento) ? '0.00' : precioConDescuento}</span>
                                                <span className="text-muted text-decoration-line-through ms-2">${isNaN(parseFloat(precioAnterior)) ? '0.00' : parseFloat(precioAnterior).toFixed(2)}</span>
                                            </div>
                                        ) : (
                                            <span className="fw-bold fs-5">${isNaN(parseFloat(precio)) ? '0.00' : parseFloat(precio).toFixed(2)}</span>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className={`small fw-semibold ${parseInt(stock) < 5 ? 'text-danger' : 'text-success'}`}>
                                            {!stock ? 'Sin stock' : parseInt(stock) < 5 ? `¡Solo ${stock} disponibles!` : 'En stock'}
                                        </span>
                                        <button className="btn btn-sm btn-danger rounded-pill">
                                            Ver producto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card shadow">
                                <div className="card-body">
                                    <div className="row g-4">
                                        <div className="col-md-6 position-relative">
                                            <img src={imagenMostrar} alt={nombre || 'Producto'} className="img-fluid rounded" style={{ maxHeight: "300px", objectFit: "contain", width: "100%" }} />
                                            {destacado && (
                                                <span className="position-absolute top-0 end-0 badge bg-warning m-2 rounded-pill">
                                                    Destacado
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h4 className="fw-bold">{nombre || 'Nombre del producto'}</h4>
                                                <div className="rounded-circle" style={{ height: "24px", width: "24px", backgroundColor: color }}></div>
                                            </div>
                                            <p className="text-danger small fw-semibold mb-3">{categoria || 'Categoría'}</p>
                                            <div className="mb-3">
                                                {descuento && porcentajeDescuento > 0 && precio ? (
                                                    <div className="d-flex align-items-center">
                                                        <span className="fw-bold fs-4">${isNaN(precioConDescuento) ? '0.00' : precioConDescuento}</span>
                                                        <span className="text-muted text-decoration-line-through ms-3">${isNaN(parseFloat(precioAnterior)) ? '0.00' : parseFloat(precioAnterior).toFixed(2)}</span>
                                                        <span className="ms-3 badge bg-danger">{porcentajeDescuento || 0}% OFF</span>
                                                    </div>
                                                ) : (
                                                    <span className="fw-bold fs-4">${isNaN(parseFloat(precio)) ? '0.00' : parseFloat(precio).toFixed(2)}</span>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <h6 className="fw-semibold">Descripción:</h6>
                                                <p className="text-muted">{descripcion || 'Sin descripción'}</p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <span className={`me-3 fw-semibold ${!stock ? 'text-danger' : parseInt(stock) < 5 ? 'text-danger' : 'text-success'}`}>
                                                    {!stock ? 'Sin stock' : parseInt(stock) < 5 ? `¡Solo ${stock} disponibles!` : `${stock} en stock`}
                                                </span>
                                                <button className="btn btn-danger rounded-pill fw-semibold"
                                                    style={{ background: 'linear-gradient(to right, #f472b6, #dd3675)' }}>
                                                    Añadir al carrito
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarProducto;