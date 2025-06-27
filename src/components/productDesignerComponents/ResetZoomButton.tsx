import React from "react";

/**
 * Props for the ResetZoomButton component
 * @interface ResetZoomButtonProps
 */
interface ResetZoomButtonProps {
  /** Callback function to reset the zoom level */
  onReset: () => void;
}

/**
 * A button component that resets the zoom level of the canvas
 * @component
 * @param {ResetZoomButtonProps} props - The component props
 * @param {() => void} props.onReset - Callback function to reset the zoom level
 * @returns {JSX.Element} A button that resets the zoom when clicked
 * @example
 * ```tsx
 * <ResetZoomButton onReset={() => handleResetZoom()} />
 * ```
 */
const ResetZoomButton: React.FC<ResetZoomButtonProps> = ({ onReset }) => (
  <button
    onClick={onReset}
    style={{
      position: "absolute",
      bottom: 24,
      left: 24,
      zIndex: 10,
      padding: "8px 16px",
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "6px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    Reset Zoom
  </button>
);

export default ResetZoomButton;