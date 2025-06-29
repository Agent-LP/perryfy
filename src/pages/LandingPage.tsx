
import Header from '../components/Header';

import Button from '../components/generic/Button';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
}



export const LandingPage = () => {
  //const { state: cartState, addItem } = useCart();


  {/*const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };*/}

  const handleLogin = () => {
    // TODO: Implementar login
    console.log('Login clicked');
  };

  const handleSignUp = () => {
    // TODO: Implementar registro
    console.log('Sign up clicked');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#2D3436] font-sans">
      {/* Header */}
      <Header
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#004E89] to-[#3A86FF] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Diseña, vende y destaca con tu propio merch
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Impulsa tu marca con productos personalizados bajo demanda. 
            Sin stock, sin complicaciones, solo resultados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Empieza a diseñar
            </Button>
            <Button variant="outline" size="lg">
              Ver productos
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#2D3436] mb-4">
              ¿Por qué elegir Perryfy?
            </h3>
            <p className="text-lg text-[#555] max-w-2xl mx-auto">
              Todo lo que necesitas para crear y vender productos personalizados en un solo lugar
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3A86FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-[#2D3436] mb-2">Diseño Intuitivo</h4>
              <p className="text-[#555]">Herramientas fáciles de usar para crear diseños únicos sin experiencia previa</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-[#2D3436] mb-2">Sin Stock</h4>
              <p className="text-[#555]">Producción bajo demanda. Solo pagas cuando vendes</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#004E89] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-[#2D3436] mb-2">Envío Rápido</h4>
              <p className="text-[#555]">Entrega en 3-5 días hábiles a cualquier parte del país</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#004E89] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">¿Eres emprendedor?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Crea tu tienda y empieza a vender sin preocuparte por el stock. 
            Nosotros nos encargamos de todo.
          </p>
          <Button variant="primary" size="lg">
            Quiero vender
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D3436] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Perryfy</h4>
              <p className="text-gray-300">
                Tu plataforma completa para crear y vender productos personalizados.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Productos</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Ropa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accesorios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Papelería</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hogar</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Empresa</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Soporte</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Estado del servicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reportar problema</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Perryfy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

