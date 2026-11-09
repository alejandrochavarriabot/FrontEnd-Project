import { createContext, useCallback, useContext, useState } from 'react';
import { CloseButton, Toast, ToastContainer } from 'react-bootstrap';

// Aviso emergente que cualquier componente puede usar: const notify = useNotify(); notify('hola')
const NotifyContext = createContext(() => {});
export const useNotify = () => useContext(NotifyContext);

export function NotifyProvider({ children }) {
  const [aviso, setAviso] = useState({ texto: '', id: 0, visible: false });

  const notify = useCallback((texto) => {
    setAviso((a) => ({ texto, id: a.id + 1, visible: true })); // id nuevo = el temporizador reinicia
  }, []);

  const cerrar = () => setAviso((a) => ({ ...a, visible: false }));

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <ToastContainer position="bottom-end" className="p-3 position-fixed">
        <Toast
          key={aviso.id}
          show={aviso.visible}
          onClose={cerrar}
          delay={2800}
          autohide
          className="nd-toast"
          role="status"
          aria-live="polite"
        >
          <div className="d-flex">
            <Toast.Body>{aviso.texto}</Toast.Body>
            <CloseButton variant="white" className="me-2 m-auto" aria-label="Cerrar" onClick={cerrar} />
          </div>
        </Toast>
      </ToastContainer>
    </NotifyContext.Provider>
  );
}
