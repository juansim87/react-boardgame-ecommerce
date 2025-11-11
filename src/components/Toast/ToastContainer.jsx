import { Toast } from "./Toast.jsx";

/**
 * ToastContainer Component - Contenedor para múltiples notificaciones Toast del sistema de diseño Eleven Code
 *
 * @param {Object} props - Propiedades del componente
 * @param {Array<{id: string, type: string, message: string, position?: string}>} [props.toasts=[]] - Array de objetos toast para renderizar
 * @param {Function} props.onClose - Función callback para cerrar/remover un toast específico
 *
 * Valores aceptados:
 * - toasts: Array de objetos con propiedades {id, type, message, position}
 * - onClose: Función que recibe el id del toast a cerrar
 *
 * @component
 * @example
 * const toasts = [
 *   { id: '1', type: 'success', message: '¡Éxito!', position: 'top-right' },
 *   { id: '2', type: 'error', message: 'Error ocurrido', position: 'top-right' }
 * ];
 *
 * <ToastContainer
 *   toasts={toasts}
 *   onClose={(id) => removeToast(id)}
 * />
 *
 * @example
 * function App() {
 *   const { toasts, removeToast } = useToast();
 *
 *   return (
 *     <div>
 *       <main>Mi aplicación</main>
 *       <ToastContainer toasts={toasts} onClose={removeToast} />
 *     </div>
 *   );
 * }
 */
export const ToastContainer = ({ toasts = [], onClose }) => {
    return (
        <div className="toast-container" role="region" aria-label="Notificaciones" aria-live="polite">
            {toasts.map((toast, index) => (
                <Toast
                    key={toast.id}
                    type={toast.type}
                    duration={0}
                    position={toast.position}
                    onClose={() => onClose(toast.id)}
                    style={{
                        top: `${4 + index * 80}px`,
                        zIndex: 1000 - index,
                    }}
                >
                    {toast.message}
                </Toast>
            ))}
        </div>
    );
};
