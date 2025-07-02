import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Text, Transformer, Image as KonvaImage, Group } from "react-konva";
import DesignToolbar from "./DesignToolbar";
import useImage from "use-image";
import EditorOptions from "./EditorOptions";
import ViewSwitcher from "./ViewSwitcher";
import { defaultShapeProperties } from "../../utils/data/colors";
import { Shape } from "../../types/shapes";
import { exportToPNG } from "../../services/exportImageService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";
import { changeFont } from "../../utils/functions/changeFont";
import { onwheel } from "../../utils/functions/onWheel";
import ResetZoomButton from "./ResetZoomButton";
import { getProductById, Product } from "../../services/productService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Color } from "fabric";


// Componente para manejar imágenes en Konva
const ImageShape: React.FC<{
  shape: Shape;
  isSelected: boolean;
  onClick: (e: any) => void;
  onDragEnd: (e: any) => void;
}> = ({ shape, /*isSelected,*/ onClick, onDragEnd }) => {
  const [image] = useImage(shape.imageUrl || "");

  return (
    <KonvaImage
      id={shape.id}
      image={image}
      fill={"#green"}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      draggable
      onClick={onClick}
      onDragEnd={onDragEnd}
    />
  );
};

const CanvasEditor: React.FC = () => {
  const {productId } = useParams();
  const location = useLocation();
  const {productImages, printfulProductId, firstColor, printAreas} = location.state;

  // TODOS LOS HOOKS DEBEN ESTAR AQUÍ AL PRINCIPIO
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>( null);

  const [shapes, setShapes] = useState<{ front: Shape[]; back: Shape[] }>({
    front: [],
    back: [],
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [currentSize, setCurrentSize] = useState<string>('M');
  const [currentColor, setCurrentColor] = useState<string>(firstColor.hexadecimal);
  const [currentColorName, setCurrentColorName] = useState<string>(firstColor.color);
  const [currentFont, setCurrentFont] = useState<string>('Arial');
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigate = useNavigate();
  
  const [textEdit, setTextEdit] = useState<{
    isEditing: boolean;
    x: number;
    y: number;
    value: string;
    id: string | null;
  }>({ isEditing: false, x: 0, y: 0, value: "", id: null });

  // Estado para mantener las dimensiones del Stage
  const [stageDimensions, setStageDimensions] = useState({
    width: window.innerWidth - 300,
    height: window.innerHeight
  });

  // Estado para elementos fuera del área
  const [/*outOfBoundsShapes*/, setOutOfBoundsShapes] = useState<Set<string>>(new Set());

  // REFS
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Estado para la URL de fondo actual
  const [backgroundUrl, setBackgroundUrl] = useState<string>("/src/utils/images/Spinner@1x-1.0s-200px-200px.gif");

  // COMPUTED VALUES
  const currentShapes = shapes[currentView];
  const selectedShape = currentShapes.find(shape => shape.id === selectedId);

  // Definir dimensiones del área imprimible
  const printableArea = {
    width: printAreas.width,
    height: printAreas.height
  };

  // Estado para actualizar la imagen de fondo
  const [backgroundKey, setBackgroundKey] = useState<number>(0);

  // FUNCTIONS
  const setCurrentShapes = (newShapes: Shape[]) => {
    setShapes((prev) => ({
      ...prev,
      [currentView]: newShapes,
    }));
  };

  // Función auxiliar para obtener las coordenadas centrales del área imprimible
  const getCenterCoordinates = () => {
    const centerX = (stageDimensions.width - printableArea.width) / 2 + printableArea.width / 2;
    const centerY = (stageDimensions.height - printableArea.height) / 2 + printableArea.height / 2;
    return { x: centerX, y: centerY };
  };

  // Función para verificar si un elemento está fuera del área imprimible
  const checkIfShapeIsOutOfBounds = (shape: Shape) => {
    const shapeRight = shape.x + (shape.width || shape.radius || 0);
    const shapeBottom = shape.y + (shape.height || shape.radius || 0);
    
    return (
      shape.x < (stageDimensions.width - printableArea.width ) / 2||
      shape.y < (stageDimensions.height - printableArea.height ) / 2 ||
      shapeRight > (stageDimensions.width - printableArea.width ) / 2 + printableArea.width ||
      shapeBottom > (stageDimensions.height - printableArea.height ) / 2 + printableArea.height
    );
  };

  // Función para setear color y nombre de color al mismo tiempo
  const setCurrentColorAndName = (hexadecimal: string, colorName: string) => {
    setCurrentColor(hexadecimal);
    setCurrentColorName(colorName);
    setBackgroundKey(prev => prev + 1);
    

    console.log(backgroundImage)
  };

  // USE EFFECTS
  useEffect(() => {
    const handleFetchProduct = async()=>{
      console.log(productImages)
      console.log(printAreas)
      console.log(firstColor)
      console.log(currentColor)
      console.log(printfulProductId)
      console.log(backgroundImage)
      setLoading(true);
      setError(null)
      try{
        const product = await getProductById(productId!)
        console.log(product)
        setProduct(product)
        
        setCurrentSize(product.sizes[0])
        
      } catch (err: any){
        setError(err  || `Error al obtener el producto${productId}`)
      } finally {
        setLoading(false);
      }
    }; handleFetchProduct()
  },[]);

  // Efecto para calcular las dimensiones del Stage
  useEffect(() => {
    const handleResize = () => {
      setStageDimensions({
        width: window.innerWidth - 300,
        height: window.innerHeight
        });
      };
      
    window.addEventListener('resize', handleResize);
    console.log('Dimensiones del Stage:', stageDimensions);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { 
    console.log('x de la forma seleccionada:', selectedShape?.x);
    console.log('y de la forma seleccionada:', selectedShape?.y);
    console.log('width de la forma seleccionada:', selectedShape?.width);
    console.log('height de la forma seleccionada:', selectedShape?.height);
    console.log('medidas del area imprimible:', printableArea);
  }, [selectedShape]);

  // Efecto para cargar la fuente
  useEffect(() => {
    console.log("current font: ", currentFont);
    console.log("font cargado?: ", fontLoaded);
    changeFont(currentFont, setFontLoaded);
    console.log("font cargado? 2: ", fontLoaded);
  }, [currentFont]);

  // Efecto para actualizar elementos fuera de bounds
  useEffect(() => {
    const outOfBounds = new Set<string>();
    currentShapes.forEach((shape) => {
      if (checkIfShapeIsOutOfBounds(shape)) {
        outOfBounds.add(shape.id);
      }
    });
    setOutOfBoundsShapes(outOfBounds);
  }, [currentShapes]);

  // Actualizar el Transformer cuando se selecciona una figura
  useEffect(() => {
    if (!transformerRef.current || !selectedId) return;

    const selectedNode = stageRef.current.findOne(`#${selectedId}`);
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  // Efecto para actualizar la URL de fondo cuando cambian color, vista o producto
  useEffect(() => {
    if (!printfulProductId || !currentColorName) {
      setBackgroundUrl("/src/utils/images/Spinner@1x-1.0s-200px-200px.gif");
      return;
    }
    const svgUrl = `https://res.cloudinary.com/drqiwggfb/image/upload/v1751205867/product${printfulProductId}_${currentView}_${currentColorName}.svg`;
    const pngUrl = `https://res.cloudinary.com/drqiwggfb/image/upload/v1751205867/product${printfulProductId}_${currentView}_${currentColorName}.png`;

    // Intentar cargar SVG primero, luego PNG
    const testImage = (url: string) => new Promise<boolean>(resolve => {
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });

    (async () => {
      if (await testImage(svgUrl)) {
        setBackgroundUrl(svgUrl);
      } else if (await testImage(pngUrl)) {
        setBackgroundUrl(pngUrl);
      } else {
        setBackgroundUrl("/src/utils/images/Spinner@1x-1.0s-200px-200px.gif");
      }
    })();
  }, [printfulProductId, currentColorName, currentView]);

  const [backgroundImage] = useImage(backgroundUrl);

  // AHORA SÍ PUEDE HABER EARLY RETURNS
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Manejador para cambios en las propiedades de la forma
  const handleShapePropertyChange = (property: string, value: string | number | boolean) => {
    if (!selectedId) return;
    console.log('---------------------------------------')  
    setShapes(prev => {
      // Crear una COPIA PROFUNDA del estado anterior
      const newShapes = {
        front: [...prev.front],
        back: [...prev.back]
      };
      
      newShapes[currentView]=newShapes[currentView].map(shape => {
        if (shape.id === selectedId) {
          const updatedShape = { ...shape };
          
          // Manejar propiedades específicas
          switch (property) {
            case 'fill':
              (updatedShape as Shape)[property] = value as string;
              console.log('Color de relleno actualizado:', value);
              console.log('nueva forma:', updatedShape);
              break;
            case 'stroke':
              (updatedShape as Shape)[property] = value as string;
              console.log('Color de trazo actualizado:', value);
              console.log('nueva forma:', updatedShape);

              break;
            case 'strokeWidth':
              (updatedShape as Shape)['strokeWidth'] = value as number;
              console.log('Ancho de trazo actualizado:', value);
              console.log('nueva forma:', updatedShape);

              break;
            case 'cornerRadius':
              if (shape.type === 'rect') {
                (updatedShape as Shape)['cornerRadius'] = value as number;
                console.log('Radio de esquina actualizado:', value);
              console.log('nueva forma:', updatedShape);

              }
              break;
           case 'fitToArea':
              if (value === true) {
                // Calcular dimensiones para ajustar al área imprimible
                const printableAreaWidth = printableArea.width;
                const printableAreaHeight = printableArea.height;
                
                if (shape.type === 'rect' || shape.type === 'image') {
                  const aspectRatio = (shape.width || 1) / (shape.height || 1);
                  if (aspectRatio > 1) {
                    updatedShape.width = printableAreaWidth;
                    updatedShape.height = printableAreaWidth / aspectRatio;
                  } else {
                    updatedShape.height = printableAreaHeight;
                    updatedShape.width = printableAreaHeight * aspectRatio;
                  }
                } else if (shape.type === 'circle') {
                  const diameter = Math.min(printableAreaWidth, printableAreaHeight);
                  updatedShape.radius = diameter / 2;
                }
                
                // Centrar en el área imprimible
                const center = getCenterCoordinates();
                updatedShape.x = center.x - (updatedShape.width || updatedShape.radius || 0) / 2;
                updatedShape.y = center.y - (updatedShape.height || updatedShape.radius || 0) / 2;
                console.log('Ajustando a área imprimible:', updatedShape);
                console.log('nueva forma:', updatedShape);

              }
              
              console.log('Ajustar a área:', value);
              console.log('nueva forma:', updatedShape);
              // Si el valor es false, no se ajusta a la área imprimible
              // Actualizar la propiedad fitToArea
              (updatedShape as Shape)['fitToArea'] = value as boolean;
              break; 

            case 'fontFamily':
                (updatedShape as Shape)[property] = value as string;
                setCurrentFont(value as string);
                console.log('Familia de fuente actualizada:', value);
                console.log('nueva forma:', updatedShape);

                break;
          }
          
          console.log('updatedShape a setear:', updatedShape);
          return updatedShape;
        }
        console.log('shape:', shape); 
        return shape;
      });
      return newShapes;
    });
    console.log('Propiedad actualizada:', property, 'Nuevo valor:', value);
  };

  //añadir figura
  // Modificar addShape para incluir las propiedades por defecto
  const addShape = (type: "rect" | "circle" | "text" | "image") => {
    const center = getCenterCoordinates();
    const newShape: Shape = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: center.x,
      y: center.y,
      fill: defaultShapeProperties.fill,
      stroke: defaultShapeProperties.stroke,
      strokeWidth: defaultShapeProperties.strokeWidth,
      ...(type === "rect" ? { 
        width: 100, 
        height: 80,
        x: center.x - 50, //centrar el rectangulo
        y: center.y - 40,
        cornerRadius: defaultShapeProperties.cornerRadius,
      } : {}),
      ...(type === "circle" ? { 
        radius: 50,
        x: center.x,
        y: center.y
      } : {}),
      ...(type === "text" ? { 
        text: "Edítame", 
        fontFamily: currentFont,
        width: 100,
        x: center.x - 38, //centrar el texto
        y: center.y - 10
      } : {}),
      ...(type === "image" ? { 
        imageUrl: "",
        width: 100,
        height: 100,
      } : {}),
      fitToArea: false,
    };
    setCurrentShapes([...currentShapes, newShape]);

  };

  // Manejador de clic en una figura
  const handleSelect = (e: any) => {
    e.cancelBubble = true; // Evita que el clic llegue al Stage
    setSelectedId(e.target.id());
  };

  // Manejador de clic en el Stage (deseleccionar)
  const handleStageClick = () => {
    setSelectedId(null);
  };

  
  // Mostrar el textarea al hacer doble clic
  const handleTextDblClick = (e: any, shape: Shape) => {
    const textNode = e.target;
    const stageBox = stageRef.current.container().getBoundingClientRect();

    setTextEdit({
      isEditing: true,
      x: stageBox.left + textNode.x(),
      y: stageBox.top + textNode.y(),
      value: shape.text || "",
      id: shape.id,
    });

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  // Guardar el texto editado
  const handleTextareaBlur = () => {
    if (textEdit.id) {
      setCurrentShapes(
        currentShapes.map((shape) =>
          shape.id === textEdit.id ? { ...shape, text: textEdit.value } : shape
        )
      );
    }
    setTextEdit({ isEditing: false, x: 0, y: 0, value: "", id: null });
  };

  // Función para manejar la carga de imágenes
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const maxSize = 200;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        const center = getCenterCoordinates();
        const newShape: Shape = {
          id: Math.random().toString(36).substr(2, 9),
          type: "image",
          x: center.x - width / 2, //centrar la imagen
          y: center.y - height / 2,
          fill: "transparent",
          width,
          height,
          imageUrl: e.target?.result as string,
          stroke: defaultShapeProperties.stroke,
          strokeWidth: defaultShapeProperties.strokeWidth,
          fitToArea: false
        };
        setCurrentShapes([...currentShapes, newShape]);
      };
    };
    reader.readAsDataURL(file);
  };



  // Función para manejar la exportación
  const handleExport = async (view: 'front' | 'back'): Promise<string> => {
    const pngData = exportToPNG(shapes[view], printableArea, stageRef);
    if (pngData) {
      console.log('Imagen generado exitosamente');
      // Aquí posteriormente añadiremos la lógica para mostrar la preview
      console.log('PNG data:', pngData);

      //Sube la imagen a Cloudinary
      const imageUrl = await uploadImageToCloudinary(pngData);
      if (imageUrl) { 
        console.log('Imagen subida a Cloudinary:', imageUrl);
        return imageUrl; // Retorna el la url del SVG generado
      }
    }
    throw new Error('Error al exportar imagen');
  };

  const handleBackToHome = () => navigate("/home")

  // Función para restear el zoom
  const resetZoom = () => {
  const stage = stageRef.current;
  if (!stage) return;
  stage.scale({ x: 1, y: 1 });
  stage.position({ x: 0, y: 0 });
  stage.batchDraw();
};


  return (
    <>
    
    <div className="flex screen bg-gray-100">
      <DesignToolbar onAddShape={addShape} onImageUpload={handleImageUpload} onClickBackToHome={handleBackToHome}/>
      {/* Canvas */}
      <div className="flex-1 relative">
        <Stage
          ref={stageRef}
          width={stageDimensions.width}
          height={stageDimensions.height}
          onClick={handleStageClick}
          onWheel={onwheel(stageRef)}
        >
          <Layer>
            {/* Imagen SVG de fondo */}
            {backgroundImage && (
              // Ajustar el factor de escala según el printfulProductId
              (() => {
                const is603 = printfulProductId === 603;
                const isWhite = firstColor === "white";
                const frontFactor = is603 ? 0.50 : 0.1;
                const backFactor = is603 ? 0.50  : 0.06;
                const factor = currentView === 'front' ? frontFactor : backFactor;
                const width = backgroundImage.width * factor;
                const height = backgroundImage.height * factor;
                return (
                  <KonvaImage
                    key={backgroundUrl}
                    image={backgroundImage}
                    width={width}
                    height={height}
                    x={(stageDimensions.width - width) / 2}
                    y={(stageDimensions.height - height) / 2}
                  />
                );
              })()
            )}

            {/* Área imprimible - borde visual */}
            <Rect
              x={(stageDimensions.width - printableArea.width) / 2}
              y={(stageDimensions.height - printableArea.height) / 2}
              width={printableArea.width}
              height={printableArea.height}
              stroke="#666"
              strokeWidth={1}
              dash={[5, 5]}
            />

            {/* Grupo con clipFunc para el área imprimible */}
            <Group
              clipFunc={(ctx) => {
                ctx.beginPath();
                ctx.rect(
                  (stageDimensions.width - printableArea.width) / 2,
                  (stageDimensions.height - printableArea.height) / 2,
                  printableArea.width,
                  printableArea.height
                );
                ctx.closePath();
              }}
            >
              {currentShapes.map((shape) => {
                const commonProps = {
                  id: shape.id,
                  x: shape.x,
                  y: shape.y,
                  fill: shape.fill,
                  draggable: true,
                  onClick: handleSelect,
                  onDragEnd: (e: any) => {
                    const newX = e.target.x();
                    const newY = e.target.y();
                    setCurrentShapes(
                      currentShapes.map((s) =>
                        s.id === shape.id ? { ...s, x: newX, y: newY } : s
                      )
                    );
                  },
                };

                switch (shape.type) {
                  case "rect":
                    return (
                      <Rect
                        key={commonProps.id}
                        {...commonProps}
                        width={shape.width}
                        height={shape.height}
                        cornerRadius={shape.cornerRadius}
                        stroke={shape.stroke}
                        strokeWidth={shape.strokeWidth}
                      />
                    );
                  case "circle":
                    return (
                      <Circle 
                        key={commonProps.id} 
                        {...commonProps} 
                        radius={shape.radius}
                        stroke={shape.stroke}
                        strokeWidth={shape.strokeWidth}
                      />
                    );
                  case "text":
                    return (
                      <Text
                        key={commonProps.id}
                        {...commonProps}
                        text={shape.text}
                        fontSize={20}
                        fontFamily = {fontLoaded? shape.fontFamily : "Arial"} 
                        onDblClick={(e) => handleTextDblClick(e, shape)}
                      />
                    );
                  case "image":
                    return (
                      <ImageShape
                        key={commonProps.id}
                        shape={shape}
                        isSelected={selectedId === shape.id}
                        onClick={commonProps.onClick}
                        onDragEnd={commonProps.onDragEnd}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </Group>

            {/* Transformer fuera del grupo clipeado para que siempre sea visible */}
            {selectedId && (
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>

        <ViewSwitcher 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
        
        {/* Botón para resetear zoom */}
        <ResetZoomButton onReset={resetZoom} />

        {/* Textarea para editar texto */}
        {textEdit.isEditing && (
          <textarea
            ref={textareaRef}
            style={{
              position: "absolute",
              top: textEdit.y,
              left: textEdit.x,
              fontSize: "20px",
              border: "1px solid #ccc",
              padding: "4px",
              resize: "both",
              background: "white",
              
            
            }}
            
            value={textEdit.value}
            onChange={(e) =>
              setTextEdit({ ...textEdit, value: e.target.value })
            }
            onBlur={handleTextareaBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                // Guardar el texto y cerrar el editor si solo se presiona Enter
                e.preventDefault();
                handleTextareaBlur();
              } else if (e.key === "Enter" && e.shiftKey) {
                // Permitir un salto de línea si se presiona Shift + Enter
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                const cursorPosition = textarea.selectionStart;
                const newValue =
                  textEdit.value.substring(0, cursorPosition) +
                  "\n" +
                  textEdit.value.substring(cursorPosition);
                setTextEdit({ ...textEdit, value: newValue });
                setTimeout(() => {
                  textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1;
                }, 0);
              }
            }}
          />
        )}
      </div>
      <EditorOptions 
        onColorChange={setCurrentColorAndName} 
        onSizeChange={setCurrentSize} 
        currentColor={currentColor}
        currentSize={currentSize} 
        currentView={currentView}
        selectedShape={selectedShape || null}
        onShapePropertyChange={handleShapePropertyChange}
        onExport={handleExport}
        product={product}
      />
    </div>
    </>
  );
};

export default CanvasEditor;