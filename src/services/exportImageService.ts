import { Shape } from "../types/shapes";

export const exportToPNG = (
  shapes: Shape[],
  printableArea: { width: number; height: number },
  stageRef: any
): string | undefined => {
  try {
    // Obtener el área imprimible del stage
    const stage = stageRef.current;
    if (!stage) return "no stage found";

    const layer = stage.findOne('Layer');
    const printableGroup = layer.findOne('Group');

    // Crear un nuevo stage temporal solo para el área imprimible
    const tempStage = stage.clone();
    const tempLayer = tempStage.findOne('Layer');

    const clonedGroup = printableGroup.clone();
 

    console.log('tempStage', tempStage);
    console.log('tempLayer', tempLayer);
    console.log('clonedGroup', clonedGroup);

    
    const dataURL = clonedGroup.toDataURL({
      mimeType: 'image/png',
      quality: 1.0
  });
    console.log('dataURL', dataURL);
    const img = new Image();
    img.src = dataURL;

    img.onload = () => {

      // Convertir el canvas a   formato JPG
      //const jpgData = canvas.toDataURL('image/jpeg', 0.8); // 0.8 es la calidad de la imagen (80%)
      //console.log('jpgData', jpgData);
      // Crear un enlace para descargar el archivo
      const link = document.createElement('a');
      link.href = img.src;
      link.download = 'exported-image.jpg'; // Nombre del archivo
      link.click();
      //link.folder = 'images'; // Carpeta de destino (no siempre funciona en todos los navegadores)

      // Limpiar
      tempStage.destroy();
    };
    return img.src;
  } catch (error) {
    console.error('Error exporting to JPG:', error);
  }
  return undefined;
};

