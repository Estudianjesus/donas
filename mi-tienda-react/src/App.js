import { Routes, Route } from 'react-router-dom';

// Importando los componentes de las páginas
import LayoutWithHeader from './components/LayoutWithHeader';
import LayoutNoHeader from './components/LayoutNoHeader';

// Importando las páginas
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Productos from './pages/Productos';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Routes>
      {/* Página con header */}
      <Route path="/" element={<LayoutWithHeader><Inicio /></LayoutWithHeader>} />
      <Route path="/productos" element={<LayoutWithHeader><Productos /></LayoutWithHeader>} />
      {/* Página con header */}

      {/* Página sin header */}
      <Route path="/login" element={<LayoutNoHeader><Login /></LayoutNoHeader>} />
      <Route path="/admin" element={<LayoutNoHeader><AdminPanel /></LayoutNoHeader>} />
    </Routes>
  );
}

export default App;
