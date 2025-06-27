/*import { Shape } from "../types/shapes";

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

*/

import Konva from "konva";
import { Shape } from "../types/shapes";

export const exportToPNG = (
  shapes: Shape[],
  printableArea: { width: number; height: number },
  stageRef: any
): string | undefined => {
  try {
    // Crear un contenedor temporal
    const container = document.createElement("div");

    // Crear un nuevo stage temporal solo para exportar los shapes recibidos
    const tempStage = new Konva.Stage({
      container,
      width: printableArea.width,
      height: printableArea.height,
    });

    const tempLayer = new Konva.Layer();

    // Agregar los shapes al layer temporal
    shapes.forEach((shape) => {
      let konvaShape: Konva.Shape | null = null;
      switch (shape.type) {
        case "rect":
          konvaShape = new Konva.Rect({
            x: shape.x - (stageRef.current ? (stageRef.current.width() - printableArea.width) / 2 : 0),
            y: shape.y - (stageRef.current ? (stageRef.current.height() - printableArea.height) / 2 : 0),
            width: shape.width,
            height: shape.height,
            fill: shape.fill,
            stroke: shape.stroke,
            strokeWidth: shape.strokeWidth,
            cornerRadius: shape.cornerRadius,
          });
          break;
        case "circle":
          konvaShape = new Konva.Circle({
            x: shape.x - (stageRef.current ? (stageRef.current.width() - printableArea.width) / 2 : 0),
            y: shape.y - (stageRef.current ? (stageRef.current.height() - printableArea.height) / 2 : 0),
            radius: shape.radius,
            fill: shape.fill,
            stroke: shape.stroke,
            strokeWidth: shape.strokeWidth,
          });
          break;
        case "text":
          konvaShape = new Konva.Text({
            x: shape.x - (stageRef.current ? (stageRef.current.width() - printableArea.width) / 2 : 0),
            y: shape.y - (stageRef.current ? (stageRef.current.height() - printableArea.height) / 2 : 0),
            text: shape.text,
            fontSize: 20,
            fontFamily: shape.fontFamily || "Arial",
            fill: shape.fill,
          });
          break;
        case "image":
          // Para imágenes, necesitas cargar la imagen antes de exportar
          // Aquí solo se soporta si la imagen ya está cargada en el shape.imageUrl
          if (shape.imageUrl) {
            const img = new window.Image();
            img.src = shape.imageUrl;
            konvaShape = new Konva.Image({
              x: shape.x - (stageRef.current ? (stageRef.current.width() - printableArea.width) / 2 : 0),
              y: shape.y - (stageRef.current ? (stageRef.current.height() - printableArea.height) / 2 : 0),
              width: shape.width,
              height: shape.height,
              image: img,
            });
          }
          break;
        default:
          break;
      }
      if (konvaShape) tempLayer.add(konvaShape);
    });

    tempStage.add(tempLayer);

    // Exportar el área imprimible como PNG
    const dataURL = tempStage.toDataURL({
      mimeType: "image/png",
      quality: 1.0,
      pixelRatio: 2,
    });

    // Limpiar
    tempStage.destroy();
    container.remove();

    return dataURL;
  } catch (error) {
    console.error("Error exporting to PNG:", error);
  }
  return undefined;
};