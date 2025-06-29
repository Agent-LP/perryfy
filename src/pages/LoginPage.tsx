import React, { useState } from 'react';
import { login, setUserData, getUserRoles } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const collageImages = [
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userResponse = await login(email, password);
      
      // Guardar token, userId y roles
      setUserData(userResponse)
      if (getUserRoles().length > 1){
      // Redirigir a home
        navigate('/home');
      } else if (getUserRoles()[0] === "merchandiser"){
        //dirigir al dashboard
        navigate('/merchandiser');
      } else {
        navigate('/home');

      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      {/* Collage de imágenes */}
      <div className="hidden md:grid grid-cols-2 grid-rows-3 gap-2 w-1/2 p-8">
        {collageImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Collage"
            className="object-cover w-full h-40 rounded-lg shadow"
            style={{ aspectRatio: '1/1' }}
          />
        ))}
      </div>
      {/* Formulario login */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <h1 className="text-3xl font-bold text-[#FF6B35] mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full px-4 py-2 border border-[#2D3436] rounded focus:outline-none focus:ring-2 focus:ring-[#3A86FF] bg-[#F8F9FA] text-[#2D3436]"
            required
            tabIndex={0}
            aria-label="Email"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña *"
            className="w-full px-4 py-2 border border-[#2D3436] rounded focus:outline-none focus:ring-2 focus:ring-[#3A86FF] bg-[#F8F9FA] text-[#2D3436]"
            required
            tabIndex={0}
            aria-label="Contraseña"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#FF6B35] text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3A86FF]"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'LOGIN'}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center w-full max-w-sm">
          <span className="text-[#FF6B35] text-sm mb-2">No tienes una cuenta? únete a nosotros!</span>
          <button
            className="bg-[#FF6B35] text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#3A86FF]"
            onClick={() => navigate('/register')}
            tabIndex={0}
            aria-label="Registrate"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 