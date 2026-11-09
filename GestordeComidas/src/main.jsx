import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Primero Bootstrap, después nuestros estilos (para que los nuestros ganen).
// Los CSS salen de la carpeta /CSS, los mismos que usa la versión HTML: así hay un solo lugar donde editarlos.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../CSS/nd-base.css';
import '../CSS/presupuesto.css';
import '../CSS/favoritos.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
