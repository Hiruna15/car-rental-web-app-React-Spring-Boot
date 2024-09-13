/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./CarCard.module.css";

export default function CarCard({ car, carImage, carOwner, widthHeight }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.car_card}
      onClick={() => navigate(`/rentcar/${car.id}`)}
      style={{ width: `${widthHeight[0]}`, height: `${widthHeight[1]}` }}
    >
      <div className={styles.image_container}>
        <img src={carImage} />
      </div>

      <div className={styles.carDetails_container1}>
        <div>
          <span>{car.brand}</span>
          <span>{car.model}</span>
          {/* <span>M4 competitionnnnnnnnn</span> */}
          <span>{car.year}</span>
        </div>
        <div className={styles.owner_profile}>
          <div>
            <img src="../user_icon.png" />
          </div>
          <span>{carOwner.username}</span>
          {/* <span>Hiruna Dilmith</span> */}
        </div>
      </div>

      <div className={styles.carDetails_container2}>
        <div>
          <img src="../transmission.png" /> <span>{car.transmission}</span>
        </div>
        <div>
          <img src="../fueltype2.png" /> <span>{car.fueltype}</span>
        </div>
        <div>
          <img src="../manufacture.png" /> <span>{car.year}</span>
        </div>
      </div>

      <div className={styles.price_container}>
        <div>
          <span>{car.price} LKR</span>
          <span>day</span>
        </div>
        <button>Rent Now</button>
      </div>
      {/* <div>
        <span>{car.brand}</span>
        <br />
        <span>{car.model}</span> <br />
        <span>{car.year}</span>
        <br />
        <span>{car.type}</span>
        <img src="../../fav_unfill.png" />
      </div>
      <div>
        <img src={carImage} alt={car.model} className={styles.car_card_img} />
        <div>
          <div>
            <img src="../../transmission.png" />
            <span>{car.transmission}</span>
          </div>
          <div>
            <img src="../../gas-pump.png" />
            <span>{car.fueltype}</span>
          </div>
          <div>
            <div>
              <img src="../../user_icon.png" />
            </div>
            <span>{carOwner.username}</span>
          </div>
        </div>
      </div>
      <div>
        <p>
          {car.price} LKR <span>/ day</span>
        </p>
      </div>
      <button>Rent Now</button> */}
    </div>
  );
}
