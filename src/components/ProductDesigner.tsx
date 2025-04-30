import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Text, Transformer, Image as KonvaImage, Group } from "react-konva";
import DesignToolbar from "./DesignToolbar";
import useImage from "use-image";
import EditorOptions from "./EditorOptions";
import ViewSwitcher from "./ViewSwitcher";

type Shape = {
  id: string;
  type: "rect" | "circle" | "text" | "image";
  x: number;
  y: number;
  fill: string;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  imageUrl?: string;
};

// Componente para manejar imágenes en Konva
const ImageShape: React.FC<{
  shape: Shape;
  isSelected: boolean;
  onClick: (e: any) => void;
  onDragEnd: (e: any) => void;
}> = ({ shape, isSelected, onClick, onDragEnd }) => {
  const [image] = useImage(shape.imageUrl || "");

  return (
    <KonvaImage
      id={shape.id}
      image={image}
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
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  
  const [textEdit, setTextEdit] = useState<{
    isEditing: boolean;
    x: number;
    y: number;
    value: string;
    id: string | null;
  }>({ isEditing: false, x: 0, y: 0, value: "", id: null });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Cargar la imagen SVG de fondo basada en la vista actual
  const [backgroundImage] = useImage(
    currentView === 'front' 
      ? "/src/utils/images/flat templates/p1adelante.svg"
      : "/src/utils/images/flat templates/p1atras.svg"
  );
  
  // Estado para mantener las dimensiones del Stage
  const [stageDimensions, setStageDimensions] = useState({
    width: window.innerWidth - 192,
    height: window.innerHeight
  });

  // Definir dimensiones del área imprimible
  const printableArea = {
    width: 80,
    height: 90
  };

  // Estado para elementos fuera del área
  const [outOfBoundsShapes, setOutOfBoundsShapes] = useState<Set<string>>(new Set());

  // Efecto para calcular las dimensiones del Stage
  useEffect(() => {
    const handleResize = () => {
      setStageDimensions({
        width: window.innerWidth - 192,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Efecto para actualizar elementos fuera de bounds
  useEffect(() => {
    const outOfBounds = new Set<string>();
    shapes.forEach((shape) => {
      if (checkIfShapeIsOutOfBounds(shape)) {
        outOfBounds.add(shape.id);
      }
    });
    setOutOfBoundsShapes(outOfBounds);
  }, [shapes]);

  // Función auxiliar para obtener las coordenadas centrales del área imprimible
  const getCenterCoordinates = () => {
    const centerX = (stageDimensions.width - printableArea.width) / 2 + printableArea.width / 2;
    const centerY = (stageDimensions.height - printableArea.height) / 2 + printableArea.height / 2;
    return { x: centerX, y: centerY };
  };

  // Añadir figura
  const addShape = (type: "rect" | "circle" | "text" | "image") => {
    const center = getCenterCoordinates();
    const newShape: Shape = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: center.x,
      y: center.y,
      fill: "#FF6B35",
      ...(type === "rect" ? { 
        width: 100, 
        height: 80,
        x: center.x - 50, // Centrar el rectángulo
        y: center.y - 40
      } : {}),
      ...(type === "circle" ? { 
        radius: 50,
        x: center.x,
        y: center.y
      } : {}),
      ...(type === "text" ? { 
        text: "Edítame", 
        width: 100,
        x: center.x - 38, // Centrar el texto
        y: center.y - 10
      } : {}),
      ...(type === "image" ? { imageUrl: "" } : {}),
    };
    setShapes([...shapes, newShape]);
  };

  // Actualizar el Transformer cuando se selecciona una figura
  useEffect(() => {
    if (!transformerRef.current || !selectedId) return;

    const selectedNode = stageRef.current.findOne(`#${selectedId}`);
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

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
      setShapes(
        shapes.map((shape) =>
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
          x: center.x - width / 2, // Centrar la imagen
          y: center.y - height / 2,
          fill: "transparent",
          width,
          height,
          imageUrl: e.target?.result as string,
        };
        setShapes([...shapes, newShape]);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
    <div className="flex screen bg-gray-100">
      <DesignToolbar onAddShape={addShape} onImageUpload={handleImageUpload} />
      {/* Canvas */}
      <div className="flex-1 relative">
        <Stage
          ref={stageRef}
          width={stageDimensions.width}
          height={stageDimensions.height}
          onClick={handleStageClick}
        >
          <Layer>
            {/* Imagen SVG de fondo */}
            {backgroundImage && (
              <KonvaImage
                image={backgroundImage}
                width={currentView === 'front' ? backgroundImage.width * 0.1 : backgroundImage.width * 0.06}
                height={currentView === 'front' ? backgroundImage.height * 0.1 : backgroundImage.height * 0.06}
                x={(stageDimensions.width - (currentView === 'front' ? backgroundImage.width * 0.1 : backgroundImage.width * 0.06)) / 2}
                y={(stageDimensions.height - (currentView === 'front' ? backgroundImage.height * 0.1 : backgroundImage.height * 0.06)) / 2}
              />
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
              {shapes.map((shape) => {
                const commonProps = {
                  id: shape.id,
                  x: shape.x,
                  y: shape.y,
                  fill: outOfBoundsShapes.has(shape.id) ? "#FF000080" : shape.fill,
                  draggable: true,
                  onClick: handleSelect,
                  onDragEnd: (e: any) => {
                    const newX = e.target.x();
                    const newY = e.target.y();
                    setShapes(
                      shapes.map((s) =>
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
                      />
                    );
                  case "circle":
                    return <Circle key={commonProps.id} {...commonProps} radius={shape.radius} />;
                  case "text":
                    return (
                      <Text
                        key={commonProps.id}
                        {...commonProps}
                        text={shape.text}
                        fontSize={20}
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
      <EditorOptions onColorChange={() => {}} onSizeChange={() => {}} currentColor={""} currentSize={""} />
    </div>
    </>
  );
};

export default CanvasEditor;  