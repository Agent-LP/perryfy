import axios from 'axios';

//const PRINTFUL_API_URL = 'https://api.printful.com';
//const API_KEY = "tzYJu3EJ8gen8sVHVnt3SM6mEcStFyDgdplwTa97"; // Reemplaza con tu clave de API

export const createMockup = async (imageData: string, placement: string): Promise<string> => {
  try {
    const response = await axios.post('http://localhost:5000/api/create-mockup', { imageData, placement });
    return response.data;
  } catch (error) {
    console.error('Error al crear el mockup:', error);
    throw error;
  }
};

export const obtainMockupUrl = async (taskKey: string): Promise<[string]> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/get-mockup?taskKey=${taskKey}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el mockup:', error);
    throw error;
  }
};