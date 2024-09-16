import styles from "./BrowseByType.module.css";
import BrowseByTypeItem from "./BrowseByTypeItem";

const carTypes = [
  ["Sedan", "../sedan.png", "200px", "120px", "-1.1em", "-1.5em", "12"],
  ["SUV", "../suv.png", "180px", "100px", "0.7em", "-1.4em", "10"],
  ["Hatchback", "../hatchback.png", "220px", "140px", "-1em", "-3em", "5"],
  ["Hybrid", "../hybrid.png", "190px", "110px", "-0.7em", "-1.7em", "10"],
  ["Pick-up", "../pick-up.png", "200px", "120px", "-0.7em", "-2em", "5"],
];

export default function BrowseByType() {
  return (
    <div className={styles.browseByType_container}>
      <div className={styles.top}>
        <span className={styles.title}>Browse By Type</span>
        <div>
          SEE ALL TYPES
          <img src="../rightarrowhead.png" />
        </div>
      </div>

      <div className={styles.types_container}>
        {Array.from({ length: 5 }).map((_, index) => (
          <BrowseByTypeItem key={index} carType={carTypes[index]} />
        ))}
      </div>
    </div>
  );
}
