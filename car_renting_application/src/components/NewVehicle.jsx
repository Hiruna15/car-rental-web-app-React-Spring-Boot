/* eslint-disable react/prop-types */
import styles from "./NewVehicle.module.css";

export default function NewVehicle({
  vehicle,
  carOwner,
  carImage,
  // setIsVehicleReviewPanelOpen,
  setReviewCar,
  setReviewCarOwner,
}) {
  function handleReviewClick() {
    setReviewCar(vehicle);
    setReviewCarOwner(carOwner);
  }

  return (
    <div className={styles.new_vehicle}>
      <div className={styles.top}>
        <div className={styles.car_image}>
          <img src={carImage} />
        </div>
        <div className={styles.details}>
          <span>{vehicle.brand}</span>
          <span style={{ fontSize: "20px" }}>{vehicle.model}</span>
          <span style={{ fontSize: "14px" }}>{vehicle.type}</span>
          <span style={{ fontSize: "14px" }}>{vehicle.city}</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.owner_profile}>
          <div>
            <img src="../user2.png" />
          </div>
          <span>{carOwner.username}</span>
        </div>

        <div className={styles.review_btn} onClick={() => handleReviewClick()}>
          <span>Review</span>
          <img src="../rightarrowhead.png" />
        </div>
      </div>
    </div>
  );
}
