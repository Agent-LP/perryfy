import axios from 'axios';

const API_URL = 'http://localhost:8083/api/auth';

export async function login(email: string, password: string): Promise<string> {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    if (res.data && res.data.token) {
      return res.data.token;
    }
    throw new Error('Token no recibido');
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Error al iniciar sesión');
  }
}

export async function register({ email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string; }): Promise<string> {
  try {
    const res = await axios.post(`${API_URL}/register`, { email, password, firstName, lastName });
    if (res.data && res.data.token) {
      return res.data.token;
    }
    throw new Error('Token no recibido');
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Error al registrarse');
  }
}

// Utilidad para obtener el token actual
export function getToken(): string | null {
  return localStorage.getItem('perryfy_token');
}

// Utilidad para setear el token (por si se quiere usar en otros contextos)
export function setToken(token: string) {
  localStorage.setItem('perryfy_token', token);
}

// Utilidad para limpiar el token (logout)
export function clearToken() {
  localStorage.removeItem('perryfy_token');
} 