/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./VehicleReviewPanel.module.css";
import axios from "axios";
import { useFirebase } from "../contexts/FirebaseContext";
import RentCarMap from "./RentCarMap";

export default function VehicleReviewPanel({
  reviewCar,
  reviewCarOwner,
  setReviewCar,
  setReviewCarOwner,
}) {
  const [carImages, setCarImages] = useState([]);
  const [isCarImagesLoading, setIsCarImagesLoading] = useState(true);

  const { db, doc, getDoc } = useFirebase();

  async function handleAccept() {
    const res = await axios.put(
      `http://localhost:8082/RentARide/vehicles/${reviewCar.id}`,
      { ...reviewCar, status: "approved" }
    );

    // const res = await axios.patch(
    //   `http://localhost:8082/RentARide/vehicles/${reviewCar.id}`,
    //   { status: "approved" }
    // );

    setReviewCar(null);
    setReviewCarOwner(null);
  }

  async function handleDecline() {
    const res = await axios.put(
      `http://localhost:8082/RentARide/vehicles/${reviewCar.id}`,
      { ...reviewCar, status: "declined" }
    );
    // const res = await axios.patch(
    //   `http://localhost:8082/RentARide/vehicles/${reviewCar.id}`,
    //   { status: "declined" }
    // );

    setReviewCar(null);
    setReviewCarOwner(null);
  }

  useEffect(
    function () {
      async function fetchCarImages() {
        try {
          setIsCarImagesLoading(true);
          const carDocRef = doc(db, "cars", `car_${reviewCar.id}`);
          const carDoc = await getDoc(carDocRef);
          const carData = carDoc.data();
          setCarImages(carData.imageUrls);
          setIsCarImagesLoading(false);
        } catch (error) {
          setIsCarImagesLoading(false);
          throw new Error(error);
        }
      }

      fetchCarImages();
    },
    [db, doc, getDoc, reviewCar]
  );

  return (
    <div className={styles.review_panel_container}>
      {isCarImagesLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className={styles.images_container}>
            <div>
              <img src={carImages[0]} />
            </div>
            <div>
              <img src={carImages[1]} />
            </div>
            <div>
              <img src={carImages[2]} />
            </div>
            <div>
              <img src={carImages[3]} />
            </div>
          </div>

          <div className={styles.details_conatiner}>
            <div className={styles.map_container}>
              <RentCarMap
                width="100%"
                height="100%"
                zoom={16}
                zoomControl={false}
                selectedCar={reviewCar}
                from="admin"
                center={[reviewCar.lat, reviewCar.lng]}
              />
            </div>
            <div className={styles.top}>
              <span>{reviewCar.address}</span>
              <span>{reviewCar.city}</span>
              <div>
                <span>{reviewCar.brand}</span>
                <span>{reviewCar.model}</span>
                <span>{reviewCar.type}</span>
                <span>{reviewCar.year}</span>
              </div>
            </div>

            <div className={styles.middle}>
              <div>
                <span className={styles.price}>{reviewCar.price} LKR</span>
                <span>perday</span>
              </div>

              <div className={styles.profile}>
                <div>
                  <img src="../user2.png" />
                </div>
                <span>{reviewCarOwner.username}</span>
              </div>
            </div>

            <div className={styles.buttons}>
              <button onClick={handleDecline}>Desline</button>
              <button onClick={handleAccept}>Accept</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
