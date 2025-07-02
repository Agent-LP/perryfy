import axios from 'axios';
import { UserResponse } from '../types/user';

const API_URL = 'http://localhost:8083/auth';

export async function login(email: string, password: string): Promise<UserResponse> {
  try {
    console.log(email,password)
    const res = await axios.post(`${API_URL}/login`, { email, password });
    if (res.data ) {
      return res.data;
    }
    throw new Error('Token no recibido');
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Error al iniciar sesión');
  }
}

export async function register({ email, password, name, lastname }: { email: string; password: string; name: string; lastname: string; }): Promise<UserResponse> {
  try {
    const res = await axios.post(`${API_URL}/register`, { email, password, name, lastname });
    if (res.data) {
      return res.data;
    }
    throw new Error('Token no recibido');
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Error al registrarse');
  }
}

// Utilidades para manejar datos de usuario en localStorage (por si se quiere usar en otros contextos)
export function setUserData(user: UserResponse) {
  localStorage.setItem('perryfy_user_token', user.token);
  localStorage.setItem('perryfy_user_user_name', user.userName);
  localStorage.setItem('perryfy_user_id', user.userId.toString());
  localStorage.setItem('perryfy_user_roles', JSON.stringify(user.userRoles.map(r => r.role)));
}

// Utilidad para limpiar el token (logout)
export function clearUserData() {
  localStorage.removeItem('perryfy_user_token');
  localStorage.removeItem('perryfy_user_user_name');
  localStorage.removeItem('perryfy_user_id');
  localStorage.removeItem('perryfy_user_roles');
}

export function getToken(): string | null {
  return localStorage.getItem('perryfy_user_token');
}

export function getUserId(): string | null {
  return localStorage.getItem('perryfy_user_id');
}

export function getUserRoles(): string[] {
  const roles = localStorage.getItem('perryfy_user_roles');
  return roles ? JSON.parse(roles) : [];
}

export function getUserName(): string{
  return localStorage.getItem('perryfy_user_user_name') || "NoName";
}
