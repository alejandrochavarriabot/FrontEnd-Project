import { Navigate, Route, Routes } from 'react-router-dom';
import { NotifyProvider } from './context/NotifyContext.jsx';
import Presupuesto from './pages/Presupuesto.jsx';
import Favoritos from './pages/Favoritos.jsx';

export default function App() {
  return (
    <NotifyProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/presupuesto" replace />} />
        <Route path="/presupuesto" element={<Presupuesto />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<Navigate to="/presupuesto" replace />} />
      </Routes>
    </NotifyProvider>
  );
}
