export interface MockupGeneratorRequest {
    variants_id: number[];
    files: DesignFile[];
  }
  
  export interface DesignFile {
    placement: 'front' | 'back' | string; // puedes restringir más los valores si quieres
    image_url: string;
    position: Position;
  }
  
  export interface Position {
    width: number;
    height: number;
    area_width: number
    area_height : number
  }