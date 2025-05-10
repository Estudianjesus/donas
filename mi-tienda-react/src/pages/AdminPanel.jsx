import React from 'react';
import { useState, useEffect } from 'react';
import { Search, Bell, LogOut, BarChart3, Filter, ChevronDown } from 'lucide-react';


// importar componentes
import VerProductos from '../components/admin/productos/verProductos';
import AgregarProducto from '../components/admin/productos/AgregarProducto';

// importar foto
const userPhoto = process.env.PUBLIC_URL + '/img/donaoso.jpg';


export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen width is less than 1000px
  useEffect(() => {
    const handleResize = () => {
      const narrowScreen = window.innerWidth < 1000;
      setIsMobile(narrowScreen);
      // Only auto-open sidebar on wider screens
      setSidebarOpen(!narrowScreen);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data
  const recentOrders = [
    { id: 'ORD-1234', customer: 'María García', products: 12, total: '$78.50', status: 'Completado' },
    { id: 'ORD-1235', customer: 'Juan López', products: 5, total: '$32.25', status: 'Pendiente' },
    { id: 'ORD-1236', customer: 'Ana Torres', products: 8, total: '$54.00', status: 'Completado' },
    { id: 'ORD-1237', customer: 'Pablo Ruiz', products: 3, total: '$18.75', status: 'Cancelado' }
  ];

  const topProducts = [
    { name: 'Dona Chocolate', sold: '245 unidades', percent: 85 },
    { name: 'Dona Glaseada', sold: '187 unidades', percent: 65 },
    { name: 'Cronut Especial', sold: '156 unidades', percent: 55 },
    { name: 'Dona Fresa', sold: '124 unidades', percent: 45 }
  ];

  const inventoryAlerts = [
    { name: 'Harina Especial', stock: '2 kg', status: 'critical' },
    { name: 'Cobertura Chocolate', stock: '5 kg', status: 'warning' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completado': return 'bg-success';
      case 'Pendiente': return 'bg-warning';
      case 'Cancelado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Completado': return 'text-success';
      case 'Pendiente': return 'text-warning';
      case 'Cancelado': return 'text-danger';
      default: return 'text-secondary';
    }
  };

  const getMenuIcon = (name) => {
    switch (name) {
      case 'Dashboard': return '🍩';
      case 'Productos': return '🧁';
      case 'Ventas': return '💰';
      case 'Clientes': return '👥';
      case 'Inventario': return '📦';
      case 'Reportes': return '📊';
      case 'Configuración': return '⚙️';
      default: return '○';
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: 'dashboard' },
    { name: 'Productos', path: 'productos' },
    { name: 'Ventas', path: 'ventas' },
    { name: 'Clientes', path: 'clientes' },
    { name: 'Inventario', path: 'inventario' },
    { name: 'Reportes', path: 'reportes' },
    { name: 'Configuración', path: 'configuracion' }
  ];

  // Filter orders by search term
  const filteredOrders = recentOrders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicks outside sidebar to close it (only on mobile)
  const handleOutsideClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light overflow-hidden">
      {/* Add global style to prevent horizontal scrolling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            overflow: hidden;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
          .content-scrollable {
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;
          }
          .table-responsive {
            overflow-x: auto;
            -ms-overflow-style: -ms-autohiding-scrollbar;
          }
        `
      }} />
      {/* Header - Colorful gradient */}
      <header className="bg-primary bg-gradient" style={{ padding: '0' }}>
        <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className="d-lg-none text-white me-2 btn btn-link p-0 border-0"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <span className="fs-4">✕</span> : <span className="fs-4">☰</span>}
            </button>
            <span className="text-white fw-bold fs-4">🍩 SweetDreams</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="text-white btn btn-link p-2 d-flex align-items-center">
              <img
                src={userPhoto}
                onError={(e) => { e.target.onerror = null; e.target.src = '/img/default-avatar.png'; }}
                alt="User Avatar"
                className="rounded-circle me-2"
                style={{ width: '32px', height: '32px' }}
              />
              <span className="d-none d-sm-inline">Usuario</span>
            </button>

            <button className="text-white btn btn-link p-2 d-flex align-items-center">
              <LogOut size={18} className="me-1" />
              <span className="d-none d-sm-inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="d-flex flex-grow-1 position-relative overflow-hidden">
        {/* Sidebar - Only use z-index when toggled on narrow screens */}
        <nav
          className={`bg-light border-end shadow-sm ${sidebarOpen ? 'd-block' : 'd-none'}`}
          style={{
            width: '250px',
            transition: 'all 0.3s ease',
            position: isMobile ? 'fixed' : 'relative',
            height: isMobile ? '100vh' : 'auto',
            zIndex: isMobile && sidebarOpen ? 1030 : 'auto',
            top: isMobile ? '0' : 'auto',
            left: isMobile ? '0' : 'auto',
            overflow: 'auto'
          }}
        >
          <div className="py-4 px-3 mt-5">
            {isMobile && (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-primary fw-bold mb-0">🍩 SweetDreams</h5>
                <button 
                  className="btn btn-link text-primary p-0" 
                  onClick={toggleSidebar}
                >
                  <span className="fs-4">✕</span>
                </button>
              </div>
            )}
            <h5 className="text-primary fw-bold mt-2">Menú</h5>
            <ul className="nav flex-column ">
              {menuItems.map((item) => (
                <li key={item.name} className="nav-item mb-2">
                  <button
                    className={`nav-link text-start ${activeSection === item.path
                        ? 'text-primary fw-bold'
                        : 'text-secondary'
                      }`}
                    onClick={() => {
                      setActiveSection(item.path);
                      if (isMobile) setSidebarOpen(false);
                    }}
                  >
                    {getMenuIcon(item.name)} {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 mt-auto">
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                setActiveSection('configuracion');
                if (isMobile) setSidebarOpen(false);
              }}
            >
              Configuración
            </button>
          </div>
        </nav>

        {/* Overlay for mobile view */}
        {isMobile && sidebarOpen && (
          <div 
            className="position-fixed top-0 left-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1020 }}
            onClick={handleOutsideClick}
          ></div>
        )}

        {/* Main content with proper scrolling */}
        <main 
          className="flex-grow-1 content-scrollable" 
          style={{ 
            transition: 'margin-left 0.3s',
            width: '100%'
          }}
        >
          {activeSection === 'dashboard' && (
            <div className='p-4 p-md-5'>
              {/* Header with filters */}
              <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
                <h1 className="fs-2 fw-bold text-dark">Dashboard</h1>
                <div className="d-flex align-items-center">
                </div>
              </div>

              {/* Stats Cards Row - Colorful cards */}
              <div className="row g-4 mb-5">
                <div className="col-6 col-md-3">
                  <div className="card bg-danger text-white position-relative overflow-hidden h-100">
                    <div className="position-absolute end-0 top-0 opacity-10 display-5 me-2">💰</div>
                    <div className="card-body">
                      <p className="text-uppercase small fw-medium text-white-50">Ventas</p>
                      <p className="fs-3 fw-bold mt-1">$14,385</p>
                      <span className="position-absolute bottom-0 end-0 m-2 badge bg-white bg-opacity-25">+12.8%</span>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="card bg-primary text-white position-relative overflow-hidden h-100">
                    <div className="position-absolute end-0 top-0 opacity-10 display-5 me-2">📦</div>
                    <div className="card-body">
                      <p className="text-uppercase small fw-medium text-white-50">Pedidos</p>
                      <p className="fs-3 fw-bold mt-1">347</p>
                      <span className="position-absolute bottom-0 end-0 m-2 badge bg-white bg-opacity-25">+5.2%</span>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="card bg-info text-white position-relative overflow-hidden h-100">
                    <div className="position-absolute end-0 top-0 opacity-10 display-5 me-2">👥</div>
                    <div className="card-body">
                      <p className="text-uppercase small fw-medium text-white-50">Clientes</p>
                      <p className="fs-3 fw-bold mt-1">189</p>
                      <span className="position-absolute bottom-0 end-0 m-2 badge bg-white bg-opacity-25">+8.7%</span>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="card bg-warning text-white position-relative overflow-hidden h-100">
                    <div className="position-absolute end-0 top-0 opacity-10 display-5 me-2">🍩</div>
                    <div className="card-body">
                      <p className="text-uppercase small fw-medium text-white-50">Donas Vendidas</p>
                      <p className="fs-3 fw-bold mt-1">1,428</p>
                      <span className="position-absolute bottom-0 end-0 m-2 badge bg-white bg-opacity-25">-2.3%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Panels - More vibrant */}
              <div className="row g-4 mb-5">
                 
                
              </div>
                 
              
            </div>
          )}

          {activeSection === 'productos' && (
            <div className='p-4 p-md-5'>
                <VerProductos/>
                
            </div>
          )}

          


        </main>
      </div>
    </div>
  );
}