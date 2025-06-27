import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drqiwggfb/image/upload'; // Reemplaza <your-cloud-name> con tu Cloud Name
const UPLOAD_PRESET = 'perryfy_images'; // Reemplaza con tu Upload Preset configurado en Cloudinary
//const CLOUDINARY_API_KEY = '3yCS4Etu3rOShEjA98M8B0bmMrw'; // Reemplaza con tu API Key de Cloudinary

export const uploadImageToCloudinary = async (imageData: string): Promise<string | null> => {
    try {
      // Convertir el SVG a Base64 (como ya no es SVG se queda como base64)
      const base64Image = imageData;
  
      // Subir a Cloudinary
      const formData = new FormData();
      formData.append('file', base64Image);
      formData.append('upload_preset', UPLOAD_PRESET);
  
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Retornar la URL de la imagen subida
      //console.log('SVG subido a Cloudinary:', response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error al subir el SVG a Cloudinary:', error);
      return null;
    }
  };