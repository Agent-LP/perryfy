import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Text, Transformer, Image as KonvaImage } from "react-konva";
import DesignToolbar from "./DesignToolbar";
import useImage from "use-image";

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

  // Añadir figura
  const addShape = (type: "rect" | "circle" | "text" | "image") => {
    const newShape: Shape = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: Math.random() * 300, 
      y: Math.random() * 300,
      fill: "#FF6B35",
      ...(type === "rect" ? { width: 100, height: 80 } : {}),
      ...(type === "circle" ? { radius: 50 } : {}),
      ...(type === "text" ? { text: "Edítame", width: 100 } : {}),
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
        // Calcular dimensiones manteniendo la proporción
        let width = img.width;
        let height = img.height;
        const maxSize = 200;

        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        const newShape: Shape = {
          id: Math.random().toString(36).substr(2, 9),
          type: "image",
          x: Math.random() * 300,
          y: Math.random() * 300,
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
    <div className="flex screen bg-gray-100">
      <DesignToolbar onAddShape={addShape} onImageUpload={handleImageUpload} />

      {/* Canvas */}
      <div className="flex-1">
        <Stage
          ref={stageRef}
          width={window.innerWidth - 256}
          height={window.innerHeight - 80}
          onClick={handleStageClick}
        >
          <Layer>
            {shapes.map((shape) => {
              const commonProps = {
                id: shape.id,
                x: shape.x,
                y: shape.y,
                fill: shape.fill,
                draggable: true,
                onClick: handleSelect,
                onDragEnd: (e: any) => {
                  setShapes(
                    shapes.map((s) =>
                      s.id === shape.id
                        ? { ...s, x: e.target.x(), y: e.target.y() }
                        : s
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

            {/* Transformer (para resize/rotate) */}
            {selectedId && (
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  // Limitar el tamaño mínimo
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>
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
    </div>
  );
};

export default CanvasEditor;  