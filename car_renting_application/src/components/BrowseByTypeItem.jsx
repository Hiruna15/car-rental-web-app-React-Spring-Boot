import styles from "./BrowseByTypeItem.module.css";

export default function BrowseByTypeItem({ carType }) {
  return (
    <div className={styles.browse_type}>
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
