/* eslint-disable react/prop-types */
import CarStatusUpdateDropDown from "./CarStatusUpdateDropDown";
import styles from "./MyCarsCard.module.css";

export default function MyCarsCard({ carImage, car, handleChangeCarStatus }) {
  return (
    <div className={styles.car_card}>
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

      <div>
        <div className={styles.transmission}>
          <img src="../transmission2.png" />
          <span>{car.transmission}</span>
        </div>
        <div className={styles.fueltype}>
          <img src="../fueltype2.png" />
          <span>{car.fueltype}</span>
        </div>
      </div>

      <div className={styles.carStatus}>
        <div></div>
        <span>{car.status}</span>
      </div>

      <div>
        <span>{car.price} LKR</span>
        <span>per day</span>
      </div>

      {["available", "currentlyrented", "unavailable", "approved"].includes(
        car.status
      ) && (
        <CarStatusUpdateDropDown
          car={car}
          handleChangeCarStatus={handleChangeCarStatus}
        />
      )}
    </div>
  );
}
