import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";

type Shape = {
  id: string;
  type: "rect" | "circle" | "text";
  x: number;
  y: number;
  fill: string;
  text?: string; // Solo para el tipo "text"
};

const CanvasEditor: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Añadir una nueva forma
  const addShape = (type: "rect" | "circle" | "text") => {
    const newShape: Shape = {
      id: Math.random().toString(36).substr(2, 9), // ID único
      type,
      x: Math.random() * 300,
      y: Math.random() * 300,
      fill: "#FF6B35",
      ...(type === "text" ? { text: "Edítame" } : {}), // Texto por defecto
    };
    setShapes([...shapes, newShape]);
  };

  // Manejador para arrastrar (actualiza posición en el estado)
  const handleDragEnd = (id: string, e: any) => {
    setShapes(
      shapes.map((shape) =>
        shape.id === id
          ? { ...shape, x: e.target.x(), y: e.target.y() }
          : shape
      )
    );
    setForceUpdate((prev) => prev + 1); // 👈 Actualización forzada
  };

  return (
    <div className="flex screen  bg-gray-100">
      {/* Barra lateral */}
      <div className="w-64 bg-white p-4 shadow-md">
        <button 
          onClick={() => addShape("rect")}
          className="mb-2 p-2 bg-blue-500 text-white rounded w-full"
        >
          Añadir Rectángulo
        </button>
        <button 
          onClick={() => addShape("circle")}
          className="mb-2 p-2 bg-blue-500 text-white rounded w-full"
        >
          Añadir Círculo
        </button>
        <button 
          onClick={() => addShape("text")}
          className="p-2 bg-blue-500 text-white rounded  w-full"
        >
          Añadir Texto
        </button>
      </div>

      {/* Canvas */}
      <Stage width={window.innerWidth - 256} height={window.innerHeight -70 }>
        <Layer>
          {shapes.map((shape) => {
            const commonProps = {
              id: shape.id,
              x: shape.x,
              y: shape.y,
              fill: shape.fill,
              draggable: true,
              onDragEnd: (e: any) => handleDragEnd(shape.id, e),
            };

            switch (shape.type) {
              case "rect":
                return <Rect key = {commonProps.id} {...commonProps} width={100} height={80} />;
              case "circle":
                return <Circle key = {commonProps.id} {...commonProps} radius={50} />;
              case "text":
                return (
                  <Text
                    key = {commonProps.id}
                    {...commonProps}
                    text={shape.text}
                    fontSize={20}
                    onDblClick={(e) => {
                      // Editar texto al hacer doble clic
                      const textNode = e.target;
                      textNode.hide(); // Oculta el texto temporalmente

                      // Crea un input HTML sobre el canvas
                      const textPosition = textNode.absolutePosition();
                      const stage = textNode.getStage();
                      const areaPosition = {
                        x: stage? stage.container().offsetLeft + textPosition.x: 0,
                        y: stage ? stage.container().offsetTop + textPosition.y : 0,
                      };

                      const textarea = document.createElement("textarea");
                      document.body.appendChild(textarea);
                      textarea.value = shape.text || "";
                      textarea.style.position = "absolute";
                      textarea.style.top = `${areaPosition.y}px`;
                      textarea.style.left = `${areaPosition.x}px`;
                      textarea.focus();

                      const handleBlur = () => {
                        setShapes(
                          shapes.map((s) =>
                            s.id === shape.id
                              ? { ...s, text: textarea.value }
                              : s
                          )
                        );
                        textarea.remove();
                        textNode.show();
                      };

                      textarea.addEventListener("blur", handleBlur);
                    }}
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasEditor;