/* eslint-disable react/prop-types */
import styles from "./MyRentalsCard.module.css";

const tabs = {
  1: "Avtive",
  2: "Pending",
  3: "Completed",
  4: "Declined",
  5: "Timed Out",
};

export default function MyRentalsCard({
  carImage,
  car,
  activeTab,
  rentalsCount,
  setExpandCarIndex,
  index,
  expandCarIndex,
}) {
  return (
    <div className={styles.myrentals_card}>
      <div>
        <div className={styles.carImage}>
          <img src={carImage} />
        </div>
        <div className={styles.carDetails}>
          <span>{car.brand}</span>
          <span>{car.model}</span>
          <span>{car.type}</span>
          <span>{car.year}</span>
        </div>
      </div>

      <div className={styles.carStatus}>
        <div></div>
        <span>{car.status}</span>
      </div>

      <div className={styles.rental_count}>
        <span>{tabs[activeTab]} Rentals</span>
        <span>
          {rentalsCount.toString().length === 1
            ? `0${rentalsCount}`
            : rentalsCount}
        </span>
      </div>

      <div
        className={styles.expand_btn}
        onClick={() => setExpandCarIndex(index)}
      >
        <img
          src="../drop-down.png"
          className={expandCarIndex === index ? styles.expanded_image : ""}
        />
      </div>
    </div>
  );
}
