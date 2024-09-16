/* eslint-disable react/prop-types */
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import styles from "./BrowseByTypeItem.module.css";

export default function BrowseByTypeItem({ carType }) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.4,
  });

  return (
    <div
      ref={ref}
      className={`${styles.browse_type} ${isVisible ? styles.visible : ""}`}
    >
      <span>{carType[6]} Cars</span>
      <span>{carType[0]}</span>
      <img
        src={carType[1]}
        alt={carType[0]}
        style={{
          width: carType[2],
          height: carType[3],
          bottom: carType[4],
          right: carType[5],
        }}
      />
      <div>
        <div></div>
      </div>
    </div>
  );
}
