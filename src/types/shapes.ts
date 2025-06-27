export type Shape = {
  id: string;
  type: "rect" | "circle" | "text" | "image";
  x: number;
  y: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  width?: number;
  height?: number;
  radius?: number;
  cornerRadius?: number;
  text?: string;
  fontFamily?: string;
  imageUrl?: string;
  fitToArea: boolean;
}; 