import { MockupGeneratorRequest, DesignFile, Position } from '../../types/Printful';
import { Product } from '../../services/productService';

export const generateMockupRequest = (
  frontImageData: string,
  backImageData: string,
  product: Product,
  currentColor: string | undefined,
  currentSize: string
): MockupGeneratorRequest => {
  // Find the current color variant
  const currentColorVariant = product.colors.find(color => 
    color.hexadecimal === currentColor || color.color === currentColor
  );

  // Get the first print area for positioning (you might want to make this more specific)
  const printArea = {width:product.printAreas[0].width*10, height:product.printAreas[0].height*10 };

  const files: DesignFile[] = [];

  // Add front design if available
  if (frontImageData) {
    files.push({
      placement: 'front',
      image_url: frontImageData,
      position: {
        area_width: product.area_width,
        area_height: product.area_height,
        width: printArea.width,
        height: printArea.height
      }
    });
  }

  // Add back design if available
  if (backImageData) {
    files.push({
      placement: 'back',
      image_url: backImageData,
      position: {
        area_width: product.area_width,
        area_height: product.area_height,
        width: printArea.width,
        height: printArea.height
      }
    });
  }

  // Use the product ID as variant ID, or you might want to map this differently
  // Ensure variants_id is a number[] with no undefined values
  const validVariantIds: number[] = [
    product.printfulProductId,
    product.colors.find(color => color.hexadecimal === currentColor)?.colorId
  ].filter((id): id is number => typeof id === 'number');

  return {
    variants_id: validVariantIds,
    files
  };
};