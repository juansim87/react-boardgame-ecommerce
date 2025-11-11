# Toast Component

Sistema de notificaciones temporales no intrusivas para proporcionar feedback inmediato al usuario sobre el estado de las acciones realizadas.

## Características

✅ **4 tipos de notificaciones** - Success, Error, Warning, Info con colores temáticos  
✅ **3 posiciones disponibles** - Flexibilidad de posicionamiento superior  
✅ **Duración personalizable** - Control preciso del tiempo de visualización  
✅ **Hook useToast incluido** - Gestión de estado simplificada  
✅ **Auto-close opcional** - Cierre automático o manual  
✅ **Accesibilidad completa** - ARIA labels y semántica correcta

> **Nota:** Las posiciones están limitadas a la parte superior de la pantalla (top-left, top-center, top-right) para proporcionar una mejor experiencia de usuario y evitar interferencias con el contenido principal.

## Componentes Incluidos

-   **Toast** - Componente de notificación individual
-   **ToastContainer** - Contenedor para múltiples toasts
-   **useToast** - Hook para gestión de estado

## API

### Toast Props

| Prop        | Tipo                                          | Default       | Descripción                         |
| ----------- | --------------------------------------------- | ------------- | ----------------------------------- |
| `children`  | `ReactNode`                                   | -             | Contenido del toast (texto o JSX)   |
| `type`      | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'`      | Tipo visual del toast               |
| `duration`  | `number`                                      | `4000`        | Duración en ms (0 = sin auto-close) |
| `isVisible` | `boolean`                                     | `true`        | Control externo de visibilidad      |
| `onClose`   | `function`                                    | -             | Callback ejecutado al cerrar        |
| `position`  | `'top-right' \| 'top-left' \| 'top-center'`   | `'top-right'` | Posición del toast en pantalla      |
| `className` | `string`                                      | `''`          | Clases CSS adicionales              |

### useToast Hook

```jsx
const {
    toasts, // Array<ToastData> - Toasts activos
    addToast, // (message, type, options) => id
    removeToast, // (id) => void
    clearAllToasts, // () => void
    success, // (message, options) => id
    error, // (message, options) => id
    warning, // (message, options) => id
    info, // (message, options) => id
} = useToast();
```

#### Métodos del Hook

| Método           | Parámetros                 | Retorna  | Descripción                  |
| ---------------- | -------------------------- | -------- | ---------------------------- |
| `addToast`       | `(message, type, options)` | `number` | Añade un toast personalizado |
| `removeToast`    | `(id)`                     | `void`   | Remueve un toast específico  |
| `clearAllToasts` | -                          | `void`   | Remueve todos los toasts     |
| `success`        | `(message, options)`       | `number` | Añade toast de éxito         |
| `error`          | `(message, options)`       | `number` | Añade toast de error         |
| `warning`        | `(message, options)`       | `number` | Añade toast de advertencia   |
| `info`           | `(message, options)`       | `number` | Añade toast informativo      |

#### Opciones Disponibles

```jsx
const options = {
    duration: 4000, // Duración en ms (default: 4000)
    position: "top-right", // Posición: 'top-left', 'top-center', 'top-right' (default: 'top-right')
};
```

### ToastContainer Props

| Prop      | Tipo           | Default | Descripción                        |
| --------- | -------------- | ------- | ---------------------------------- |
| `toasts`  | `ToastData[]`  | `[]`    | Array de toasts a renderizar       |
| `onClose` | `(id) => void` | -       | Función para cerrar/remover toasts |

## Ejemplos de Uso

### Uso Básico con useToast

```jsx
import { useToast, ToastContainer } from "../components/Toast";

function App() {
    const toast = useToast();

    const handleSuccess = () => {
        toast.success("¡Operación completada exitosamente!");
    };

    const handleError = () => {
        toast.error("Error al procesar la solicitud");
    };

    return (
        <div>
            <button onClick={handleSuccess}>Mostrar éxito</button>
            <button onClick={handleError}>Mostrar error</button>
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
    );
}
```

### Toast Individual

```jsx
import { Toast } from "../components/Toast";
import { useState } from "react";

function IndividualToast() {
    const [showToast, setShowToast] = useState(false);

    return (
        <div>
            <button onClick={() => setShowToast(true)}>Mostrar Toast</button>
            {showToast && (
                <Toast type="success" onClose={() => setShowToast(false)}>
                    ¡Mensaje de éxito!
                </Toast>
            )}
        </div>
    );
}
```

### Tipos de Toast

```jsx
function ToastTypes() {
    const toast = useToast();

    return (
        <div className="space-y-2">
            <button onClick={() => toast.success("¡Operación exitosa!")}>Success</button>
            <button onClick={() => toast.error("Error en la operación")}>Error</button>
            <button onClick={() => toast.warning("Advertencia importante")}>Warning</button>
            <button onClick={() => toast.info("Información adicional")}>Info</button>
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
    );
}
```

### Posiciones Personalizadas

```jsx
function ToastPositions() {
    const toast = useToast();

    return (
        <div className="grid grid-cols-3 gap-4">
            <button onClick={() => toast.success("Top Left", { position: "top-left" })}>Top Left</button>
            <button onClick={() => toast.success("Top Center", { position: "top-center" })}>
                Top Center
            </button>
            <button onClick={() => toast.success("Top Right", { position: "top-right" })}>Top Right</button>
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
    );
}
```

### Duraciones Personalizadas

```jsx
function ToastDurations() {
    const toast = useToast();

    return (
        <div className="space-y-2">
            <button onClick={() => toast.info("Toast rápido", { duration: 1000 })}>1 segundo</button>
            <button onClick={() => toast.warning("Toast normal", { duration: 4000 })}>
                4 segundos (default)
            </button>
            <button onClick={() => toast.error("Toast persistente", { duration: 0 })}>Sin auto-close</button>
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
    );
}
```

### Toast con Contenido Rico

```jsx
function RichToast() {
    const toast = useToast();

    const showRichToast = () => {
        toast.addToast(
            <div>
                <strong>Archivo subido</strong>
                <p className="text-sm">documento.pdf (2.3 MB)</p>
            </div>,
            "success",
            { duration: 6000, position: "top-center" }
        );
    };

    return (
        <div>
            <button onClick={showRichToast}>Mostrar Toast Rico</button>
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
    );
}
```

## Casos de Uso Comunes

### Formularios y Validación

```jsx
function LoginForm() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {
        setLoading(true);

        try {
            await loginUser(formData);
            toast.success("¡Bienvenido de vuelta!", { duration: 3000 });
        } catch (error) {
            toast.error("Credenciales incorrectas", { duration: 5000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* campos del formulario */}
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </form>
    );
}
```

### Operaciones Asíncronas

```jsx
function FileUpload() {
    const toast = useToast();

    const uploadFile = async (file) => {
        const uploadToastId = toast.info("Subiendo archivo...", { duration: 0 });

        try {
            await uploadFileToServer(file);
            toast.removeToast(uploadToastId);
            toast.success("¡Archivo subido correctamente!");
        } catch (error) {
            toast.removeToast(uploadToastId);
            toast.error("Error al subir el archivo");
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => uploadFile(e.target.files[0])} />
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
    );
}
```

### Notificaciones del Sistema

```jsx
function SessionManager() {
    const toast = useToast();

    useEffect(() => {
        const warningTimer = setTimeout(() => {
            toast.warning("Tu sesión expirará en 5 minutos", { duration: 8000 });
        }, 25 * 60 * 1000);

        const expirationTimer = setTimeout(() => {
            toast.error("Sesión expirada. Por favor, inicia sesión nuevamente", {
                duration: 0,
                position: "top-center",
            });
        }, 30 * 60 * 1000);

        return () => {
            clearTimeout(warningTimer);
            clearTimeout(expirationTimer);
        };
    }, [toast]);

    return (
        <div>
            {/* contenido de la app */}
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
    );
}
```

### Secuencias de Toasts

```jsx
function UpdateProcess() {
    const toast = useToast();

    const handleUpdate = async () => {
        toast.info("Verificando actualizaciones...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.info("Descargando actualización...");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.warning("Aplicando cambios...", { duration: 2000 });
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success("¡Actualización completada!", { position: "top-center" });
    };

    return (
        <div>
            <button onClick={handleUpdate}>Actualizar Sistema</button>
            <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
    );
}
```

## Buenas Prácticas

### ✅ Recomendado

-   **Mensajes claros y específicos**: Proporciona información útil al usuario
-   **Duraciones apropiadas**: Ajusta el tiempo según la importancia del mensaje
-   **Posicionamiento consistente**: Mantén la misma posición en toda la aplicación
-   **Tipos semánticamente correctos**: Usa el tipo apropiado para cada situación
-   **Gestión de estado limpia**: Limpia toasts al cambiar de página o contexto

```jsx
// ✅ Bueno - Mensaje claro y específico
toast.success("Producto agregado al carrito correctamente");

// ✅ Bueno - Duraciones según importancia
toast.info("Datos guardados", { duration: 2000 }); // Info rápida
toast.warning("Verificar datos", { duration: 5000 }); // Advertencia
toast.error("Error crítico", { duration: 0 }); // Error importante

// ✅ Bueno - Evitar toasts duplicados
const showUniqueToast = (message, type) => {
    const exists = toast.toasts.some((t) => t.message === message);
    if (!exists) {
        toast[type](message);
    }
};

// ✅ Bueno - Limpiar al cambiar de página
useEffect(() => {
    return () => toast.clearAllToasts();
}, [location.pathname]);
```

### ❌ Evitar

-   **Mensajes vagos o genéricos** que no aportan información útil
-   **Demasiados toasts simultáneos** que abruman al usuario
-   **Duraciones incorrectas** muy cortas o muy largas
-   **Posiciones inconsistentes** que confunden la experiencia
-   **Tipos incorrectos** que no corresponden al contexto

```jsx
// ❌ Malo - Mensaje vago
toast.success("Éxito");

// ❌ Malo - Múltiples toasts sin control
onClick={() => {
    toast.success("Mensaje 1");
    toast.info("Mensaje 2");
    toast.warning("Mensaje 3"); // Demasiados a la vez
}}

// ❌ Malo - Duración muy corta para leer
toast.error("Error crítico en el sistema", { duration: 500 });

// ❌ Malo - Posiciones inconsistentes
toast.success("Éxito", { position: "top-left" });
toast.error("Error", { position: "bottom-right" }); // Diferentes posiciones
```

## Accesibilidad

### Características Incluidas

-   **ARIA attributes** - `role="alert"`, `aria-live="polite"`, `aria-atomic="true"`
-   **Navegación por teclado** - Botón de cierre accesible
-   **Lectores de pantalla** - Anuncios automáticos de cambios
-   **Etiquetas descriptivas** - `aria-label` en botones y contenedores

### Mejores Prácticas

```jsx
// Mensajes descriptivos para lectores de pantalla
toast.success('Producto "Laptop HP" agregado al carrito');

// Evitar solo iconos o colores como indicadores
toast.error("Error: No se pudo procesar el pago");

// Duración apropiada para lectura completa
toast.info("Mensaje informativo importante", { duration: 6000 });
```

## Personalización CSS

### Variables CSS

```css
:root {
    --color-success-50: #f0fdf4;
    --color-success-200: #bbf7d0;
    --color-success-600: #16a34a;

    --color-error-50: #fef2f2;
    --color-error-200: #fecaca;
    --color-error-600: #dc2626;

    --color-brand-100: #fffaed;
    --color-brand-300: #ffd60a;
    --color-brand-400: #ffc600;
}
```

### Clases Personalizadas

```css
.toast-container .toast {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-container .toast.entering {
    transform: translateY(-100%);
    opacity: 0;
}

.toast-container .toast.exiting {
    transform: translateY(-100%);
    opacity: 0;
}
```
