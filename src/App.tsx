import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div className="min-h-screen bg-[#F8F8F8] text-[#1E1E1E] font-sans">
          <nav className="bg-[#64168b] text-white px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Perryfy</h1>
            <div className="space-x-4">
              <button className="bg-white text-[#7F5AF0] px-4 py-2 rounded-full font-medium">Login</button>
              <button className="bg-[#FF6B35] px-4 py-2 rounded-full font-medium">Sign Up</button>
            </div>
          </nav>

          <section className="text-center py-20 px-6">
            <h2 className="text-4xl font-bold mb-4">Diseña, vende y destaca con tu propio merch</h2>
            <p className="text-lg text-[#555] mb-6">Impulsa tu marca con productos personalizados bajo demanda</p>
            <button className="bg-[#FF6B35] text-white px-6 py-3 rounded-full text-lg hover:bg-orange-600">Empieza ahora</button>
          </section>

          <section className="px-8 py-12">
            <h3 className="text-2xl font-semibold mb-6">Productos populares</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="w-full h-40 bg-gray-200 mb-4 rounded"></div>
                <p className="font-semibold">Polera Personalizada</p>
                <p className="text-[#7F5AF0] font-bold">Bs. 85</p>
              </div>
            </div>
          </section>

          <section className="bg-[#7F5AF0] text-white py-16 text-center px-6">
            <h3 className="text-3xl font-bold mb-4">¿Eres emprendedor?</h3>
            <p className="text-lg mb-6">Crea tu tienda y empieza a vender sin preocuparte por el stock</p>
            <button className="bg-[#FF6B35] px-6 py-3 rounded-full font-medium">Quiero vender</button>
          </section>

          <footer className="bg-white text-center py-4 text-[#999]">
            © 2025 Perryfy. Todos los derechos reservados.
          </footer>
        </div>

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
