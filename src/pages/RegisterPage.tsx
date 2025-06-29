import React, { useState } from 'react';
import { register, setUserData } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const userResponse = await register({ email, password, firstName, lastName });
      setUserData(userResponse);
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-4 border border-[#F8F9FA]">
        <h1 className="text-3xl font-bold text-[#FF6B35] mb-4 text-center">Sign Up</h1>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email *"
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
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="Nombre *"
          className="w-full px-4 py-2 border border-[#2D3436] rounded focus:outline-none focus:ring-2 focus:ring-[#3A86FF] bg-[#F8F9FA] text-[#2D3436]"
          required
          tabIndex={0}
          aria-label="Nombre"
        />
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Apellido *"
          className="w-full px-4 py-2 border border-[#2D3436] rounded focus:outline-none focus:ring-2 focus:ring-[#3A86FF] bg-[#F8F9FA] text-[#2D3436]"
          required
          tabIndex={0}
          aria-label="Apellido"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={e => setAcceptTerms(e.target.checked)}
            className="accent-[#FF6B35]"
            id="terms"
            tabIndex={0}
            aria-label="Aceptar términos"
          />
          <label htmlFor="terms" className="text-xs text-[#2D3436]">Estoy de acuerdo con la Política de privacidad y Términos de Uso de Perryfy</label>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#FF6B35] text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3A86FF]"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'SIGN UP NOW'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage; 