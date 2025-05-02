import { Shape } from "../types/shapes";

export const exportToSVG = (
  shapes: Shape[],
  printableArea: { width: number; height: number },
  stageRef: any
) => {
  try {
    // Obtener el área imprimible del stage
    const stage = stageRef.current;
    if (!stage) return null;

    const layer = stage.findOne('Layer');
    const printableGroup = layer.findOne('Group');

    // Crear un nuevo stage temporal solo para el área imprimible
    const tempStage = stage.clone();
    const tempLayer = tempStage.findOne('Layer');
    
    // Limpiar todo excepto el grupo imprimible
    tempLayer.destroyChildren();
    const clonedGroup = printableGroup.clone();
    tempLayer.add(clonedGroup);

    // Ajustar las dimensiones y posición
    tempStage.width(printableArea.width);
    tempStage.height(printableArea.height);
    
    // Generar el SVG
    const svgString = tempStage.toDataURL({ pixelRatio: 2 });
    
    // Limpiar
    tempStage.destroy();

    return svgString;
  } catch (error) {
    console.error('Error exporting to SVG:', error);
    return null;
  }
}; 