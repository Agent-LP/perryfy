import axios from 'axios';
import { MockupGeneratorRequest } from '../types/Printful';



export const createMockup = async (mockupRequest: MockupGeneratorRequest): Promise<string> => {
  try {
    console.log("mockmockupRequest: ", mockupRequest)
    const response = await axios.post('http://localhost:8083/api/printful/mockup-generator',  mockupRequest );
    return response.data.taskKey;
  } catch (error) {
    console.error('Error al crear el mockup:', error);
    throw error;
  }
};

export const obtainMockupUrl = async (taskKey: string): Promise<[string]> => {
  try {
    const response = await axios.get(`http://localhost:8083/api/printful/mockup-generator/task/${taskKey}`);
    return response.data.mockupUrls;
  } catch (error) {
    console.error('Error al obtener el mockup:', error);
    throw error;
  }
};