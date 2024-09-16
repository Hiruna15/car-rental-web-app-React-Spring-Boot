import { useEffect, useState } from "react";
import "./TestComponent.css";

export default function TestComponent() {
  const [values, setValues] = useState([40, 80]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleMouseMove = (e) => {
    if (draggingIndex !== null) {
      const rect = e.target.closest(".range-slider").getBoundingClientRect();
      const newPercentage = Math.min(
        Math.max(((e.clientX - rect.left) / rect.width) * 100, 0),
        100
      );

      setValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[draggingIndex] = newPercentage;

        // Ensure values[0] is always less than values[1]
        if (newValues[0] > newValues[1]) {
          if (draggingIndex === 0) {
            newValues[0] = newValues[1];
          } else {
            newValues[1] = newValues[0];
          }
        }

        return newValues;
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const handleMouseDown = (index) => {
    setDraggingIndex(index);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingIndex]);

  return (
    <div className="range-slider-container">
      <div className="range-slider">
        <div className="slider-track">
          <div
            className="slider-fill"
            style={{
              left: `${values[0]}%`,
              right: `${100 - values[1]}%`,
            }}
          />
          <div
            className="slider-handle"
            style={{ left: `${values[0]}%` }}
            onMouseDown={() => handleMouseDown(0)}
          />
          <div
            className="slider-handle"
            style={{ left: `${values[1]}%` }}
            onMouseDown={() => handleMouseDown(1)}
          />
        </div>
        <div className="value-container">
          <div className="value-label" style={{ left: `${values[0]}%` }}>
            {Math.round(values[0])}
          </div>
          <div className="value-label" style={{ left: `${values[1]}%` }}>
            {Math.round(values[1])}
          </div>
        </div>
      </div>
    </div>
  );
}
