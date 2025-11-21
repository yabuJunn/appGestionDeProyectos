# FlowAI - Gestión Inteligente para Pymes

FlowAI es una plataforma moderna que combina Inteligencia Artificial con gestión de inventarios y pedidos, diseñada específicamente para pequeñas y medianas empresas.

## 🚀 Características

- **Landing Page** moderna y responsive con diseño oscuro y acentos púrpura
- **Dashboard de administrador** con métricas en tiempo real
- **Gestión de inventario** con alertas de stock bajo y fechas de vencimiento
- **Sistema de pedidos** con seguimiento de estados
- **Integración con Supabase** para almacenamiento y autenticación
- **Diseño responsive** optimizado para desktop, tablet y móvil

## 📋 Requisitos Previos

- Node.js >= 18.0.0
- npm o yarn
- Cuenta en [Supabase](https://supabase.com) (opcional para desarrollo local)

## 🛠️ Instalación

1. **Clonar el repositorio** (o descargar el código)

```bash
cd aplicacionFlowIA
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` y agrega tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

> **Nota:** Si no tienes un proyecto de Supabase aún, puedes ejecutar la aplicación en modo desarrollo con datos mock. Las funciones de API usarán datos de ejemplo automáticamente.

4. **Configurar la base de datos en Supabase**

- Crea un nuevo proyecto en [Supabase](https://supabase.com)
- Ve al SQL Editor
- Copia y ejecuta el contenido de `sql/schema.sql`
- Esto creará todas las tablas necesarias y configurará las políticas de seguridad (RLS)

## 🏃 Ejecutar la Aplicación

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Modo Producción

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
aplicacionFlowIA/
├── src/
│   ├── api/              # Funciones de API para Supabase
│   │   ├── products.ts
│   │   ├── inventory.ts
│   │   └── orders.ts
│   ├── components/
│   │   ├── dashboard/    # Componentes del dashboard
│   │   │   ├── Sidebar.tsx
│   │   │   ├── KpiCard.tsx
│   │   │   ├── InventoryTable.tsx
│   │   │   └── OrdersList.tsx
│   │   ├── landing/      # Componentes de la landing page
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── FeatureCards.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/         # Contextos de React
│   │   └── AuthContext.tsx
│   ├── lib/              # Utilidades y configuraciones
│   │   └── supabase.ts
│   ├── pages/            # Páginas principales
│   │   ├── LandingPage.tsx
│   │   └── Dashboard.tsx
│   ├── styles/           # Estilos globales
│   │   └── index.css
│   ├── App.tsx           # Componente raíz con rutas
│   └── main.tsx          # Punto de entrada
├── sql/
│   └── schema.sql        # Schema de base de datos
├── .env.example          # Ejemplo de variables de entorno
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🔐 Autenticación

La aplicación incluye un sistema de autenticación básico (stub) que simula login/logout. Para producción, debes reemplazarlo con Supabase Auth.

### Reemplazar con Supabase Auth

1. **Instalar dependencias adicionales** (si es necesario):
```bash
npm install @supabase/auth-helpers-react
```

2. **Modificar `src/contexts/AuthContext.tsx`**:

```typescript
import { supabase } from '../lib/supabase'

const login = async (email: string, password: string): Promise<boolean> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    console.error('Error de autenticación:', error)
    return false
  }
  
  if (data.user) {
    // Obtener información del usuario desde la tabla users
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    setUser(userData)
    return true
  }
  
  return false
}

const logout = async () => {
  await supabase.auth.signOut()
  setUser(null)
  localStorage.removeItem('flowai_user')
}
```

3. **Configurar sesión persistente**:

```typescript
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      // Cargar datos del usuario
    }
  })

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    // Manejar cambios de autenticación
  })

  return () => subscription.unsubscribe()
}, [])
```

## 🎨 Personalización

### Colores

Los colores principales están definidos en `tailwind.config.js`. Puedes modificar la paleta en la sección `theme.extend.colors`:

```javascript
colors: {
  primary: {
    // Tu paleta púrpura personalizada
  },
  dark: {
    // Tu paleta oscura personalizada
  },
}
```

### Tipografía

Las fuentes están configuradas en `index.html`. Por defecto usa Inter y Poppins. Puedes cambiar las fuentes modificando los enlaces de Google Fonts.

## 📊 API y Supabase

### Funciones Disponibles

- `getProducts(companyId)` - Obtener productos de una compañía
- `getInventory(companyId)` - Obtener inventario con información de productos
- `getOrders(companyId)` - Obtener pedidos de una compañía
- `createProduct(product)` - Crear un nuevo producto
- `updateInventory(inventoryId, quantity)` - Actualizar cantidad en inventario
- `createOrder(order)` - Crear un nuevo pedido
- `updateOrderStatus(orderId, status)` - Actualizar estado de un pedido

### Datos Mock

Si no tienes Supabase configurado, la aplicación usa datos mock automáticamente. Los componentes detectan cuando no hay datos reales y muestran ejemplos.

## 🧪 Testing Manual

1. **Landing Page** (`/`):
   - Verifica que todos los componentes se muestren correctamente
   - Navega por las secciones (Características, Testimonios)
   - Prueba el botón "Iniciar Sesión" o "Empezar Gratis"

2. **Dashboard** (`/dashboard`):
   - Sin autenticación: debe redirigir a `/`
   - Con autenticación: muestra el dashboard completo
   - Verifica que los KPI cards muestren datos
   - Verifica que la tabla de inventario tenga datos
   - Verifica que la lista de pedidos funcione

3. **Autenticación**:
   - Cualquier email/password funciona en modo stub
   - Al hacer login, se guarda en localStorage
   - El logout limpia la sesión

## 🚢 Despliegue

### Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Deploy automático en cada push

### Netlify

1. Conecta tu repositorio a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configura variables de entorno

### Build Manual

```bash
npm run build
```

Los archivos estáticos estarán en la carpeta `dist/`.

## 📝 Notas Importantes

- **Variables de entorno**: Vite usa el prefijo `VITE_` para variables de entorno. El código también soporta `REACT_APP_` para compatibilidad.
- **RLS (Row Level Security)**: Las políticas de seguridad están configuradas en `sql/schema.sql`. Ajusta según tus necesidades.
- **CORS**: Asegúrate de configurar los dominios permitidos en Supabase si despliegas la aplicación.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y está destinado para uso educativo.

## 🆘 Soporte

Si encuentras problemas:

1. Verifica que todas las dependencias estén instaladas
2. Verifica que las variables de entorno estén configuradas
3. Revisa la consola del navegador para errores
4. Verifica que el schema de Supabase esté correctamente configurado

---

Desarrollado con ❤️ usando React, TypeScript, Tailwind CSS y Supabase

