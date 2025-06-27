# Perryfy - Ecommerce de Productos Personalizados

Perryfy es una plataforma completa de ecommerce para crear y vender productos personalizados bajo demanda. Permite a emprendedores, diseñadores e influencers crear su propio merch sin preocuparse por el stock.

## 🎨 Paleta de Colores

| Color | Código HEX | Uso típico |
|-------|------------|------------|
| Naranja vibrante | #FF6B35 | Botones principales, CTAs, elementos interactivos |
| Azul profundo | #004E89 | Cabeceras, barras de navegación, footer |
| Azul claro | #3A86FF | Subtítulos, iconos secundarios, hover effects |
| Gris oscuro | #2D3436 | Textos principales, bordes, áreas de contenido |
| Blanco roto | #F8F9FA | Fondos, tarjetas, espacios en blanco |

## ✨ Funcionalidades Implementadas

### 🛍️ Ecommerce Core
- **Landing Page Completa**: Hero section, características, productos destacados, testimonios
- **Sistema de Carrito**: Gestión completa con contexto de React
- **Componentes Reutilizables**: Button, ProductCard, Header
- **Navegación Responsive**: Header con menú móvil y búsqueda
- **Newsletter Signup**: Formulario funcional para suscripciones

### 🎯 Características de Productos
- **Productos con Variantes**: Precios originales, descuentos, calificaciones
- **Badges Dinámicos**: Nuevo, en oferta, agotado
- **Sistema de Rating**: Estrellas y número de reseñas
- **Categorización**: Organización por categorías

### 🛒 Funcionalidades del Carrito
- **Agregar/Remover Productos**: Gestión completa de cantidades
- **Cálculo Automático**: Total y número de items
- **Persistencia**: Estado mantenido durante la sesión
- **Dropdown del Carrito**: Vista previa en el header

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Git

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd perryfy
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Button.tsx      # Botón con variantes
│   ├── Header.tsx      # Header con navegación y carrito
│   ├── ProductCard.tsx # Tarjeta de producto
│   └── ...
├── context/            # Contextos de React
│   └── CartContext.tsx # Gestión del carrito
├── pages/              # Páginas principales
│   ├── LandingPage.tsx # Página de inicio
│   └── DesignerPage.tsx # Página del diseñador
├── types/              # Tipos TypeScript
│   └── ecommerce.ts    # Interfaces del ecommerce
├── services/           # Servicios externos
├── utils/              # Utilidades y helpers
└── assets/             # Recursos estáticos
```

## 🛠️ Recursos Necesarios para Funcionalidad Completa

### 🔧 Backend y APIs
- **Base de Datos**: PostgreSQL o MongoDB para productos, usuarios, órdenes
- **API REST**: Endpoints para CRUD de productos, usuarios, carrito
- **Autenticación**: JWT o OAuth para login/registro
- **Pagos**: Integración con Stripe, PayPal o similar
- **Email**: Servicio para newsletters y confirmaciones

### 🖼️ Gestión de Imágenes
- **CDN/Storage**: Cloudinary, AWS S3 o similar para imágenes de productos
- **Optimización**: Compresión y redimensionamiento automático
- **Placeholders**: Servicio de imágenes placeholder para desarrollo

### 📦 Funcionalidades Adicionales
- **Sistema de Usuarios**: Registro, login, perfiles
- **Gestión de Órdenes**: Estado, tracking, historial
- **Sistema de Reseñas**: Calificaciones y comentarios
- **Búsqueda Avanzada**: Filtros, ordenamiento, paginación
- **Wishlist**: Lista de deseos
- **Notificaciones**: Push notifications, emails

### 🔍 SEO y Analytics
- **SEO**: Meta tags, sitemap, structured data
- **Analytics**: Google Analytics, eventos de conversión
- **Performance**: Lazy loading, code splitting

### 🧪 Testing
- **Unit Tests**: Jest para componentes y utilidades
- **Integration Tests**: Testing Library para flujos de usuario
- **E2E Tests**: Cypress o Playwright para pruebas completas

## 🎨 Componentes Principales

### Button Component
```typescript
<Button variant="primary" size="lg" onClick={handleClick}>
  Texto del botón
</Button>
```

**Variantes**: `primary`, `secondary`, `outline`, `ghost`
**Tamaños**: `sm`, `md`, `lg`

### ProductCard Component
```typescript
<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
  onViewProduct={handleViewProduct}
/>
```

### Header Component
```typescript
<Header
  cartItems={cartItems}
  onSearch={handleSearch}
  onLogin={handleLogin}
  onSignUp={handleSignUp}
/>
```

## 🛒 Uso del Carrito

```typescript
import { useCart } from './context/CartContext';

const { state, addItem, removeItem, updateQuantity } = useCart();

// Agregar producto
addItem({
  id: 1,
  name: "Producto",
  price: 100,
  image: "url",
  category: "Ropa"
});

// Obtener cantidad de un producto
const quantity = getItemQuantity(productId);
```

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎯 Próximos Pasos

1. **Implementar Backend**: API REST con Node.js/Express
2. **Sistema de Autenticación**: JWT con refresh tokens
3. **Integración de Pagos**: Stripe o PayPal
4. **Gestión de Imágenes**: Cloudinary para uploads
5. **Sistema de Órdenes**: Tracking y notificaciones
6. **Panel de Administración**: Dashboard para gestión
7. **Optimización SEO**: Meta tags y structured data
8. **Testing**: Suite completa de pruebas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: contacto@perryfy.com
- **Website**: https://perryfy.com
- **Documentación**: https://docs.perryfy.com

---

Desarrollado con ❤️ por el equipo de Perryfy
