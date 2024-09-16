import styles from "./HomeCarCollection.module.css";
import VehicleTypesNav from "./VehicleTypesNav";
import Loader from "./Loader";

import { useCar } from "../contexts/CarContext";
import { useFirebase } from "../contexts/FirebaseContext";

import axios from "axios";
import CarCard from "./CarCard";
import { useEffect, useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

export default function HomeCarCollection() {
  const [homeCars, setHomeCars] = useState([]);
  const [homeCarsImages, setHomeCarsImages] = useState([]);
  const [homeCarsOwners, setHomeCarsOwners] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [carImagesLoading, setCarImagesLoading] = useState(true);

  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
  });

  const isLoading = carsLoading || carImagesLoading;

  const { activeTab } = useCar();
  const { db, doc, getDoc } = useFirebase();

  useEffect(
    function () {
      async function fetchCars() {
        try {
          setCarsLoading(true);
          let res = await axios.get(
            `http://localhost:8082/RentARide/vehicles/${activeTab}`
          );

          console.log(res.data);
          setHomeCars(res.data);

          const owners = [];
          for (const car of res.data) {
            res = await axios.get(
              `http://localhost:8083/RentARide/users/${car.ownerid}`
            );

            owners.push(res.data);
          }

          setHomeCarsOwners(owners);

          setCarsLoading(false);
        } catch (error) {
          setCarsLoading(false);
          throw new Error(error);
        }
      }
      fetchCars();
    },
    [activeTab, setHomeCars]
  );

  useEffect(
    function () {
      async function getImages() {
        try {
          if (homeCars.length === 0) return;

          setCarImagesLoading(true);

          const carIds = homeCars.map((car) => car.id);
          const carFirstImages = [];

          for (const carId of carIds) {
            const carDocRef = doc(db, "cars", `car_${carId}`);
            const carDoc = await getDoc(carDocRef);
            const carData = carDoc.data();
            carFirstImages.push(carData.imageUrls[0]);
          }

          setHomeCarsImages(carFirstImages);
          setCarImagesLoading(false);
        } catch (error) {
          setCarImagesLoading(false);
          throw new Error(error);
        }
      }

      getImages();
    },
    [homeCars, db, doc, getDoc]
  );

  return (
    <div
      ref={ref}
      className={`${styles.car_collection} ${isVisible ? styles.visible : ""}`}
    >
      <span>Explore Our Car Collection</span>

      <VehicleTypesNav />

      {isLoading ? (
        <div className={styles.cars_loading}>
          <Loader />
        </div>
      ) : (
        <div className={styles.home_cars_list}>
          {homeCars.map((car, index) => (
            <CarCard
              key={index}
              car={car}
              carImage={homeCarsImages[index]}
              carOwner={homeCarsOwners[index]}
              widthHeight={["22em", "28em"]}
            />
          ))}

          <div className={styles.more_cars}>
            WATCH ALL COLLECTION
            <img src="../rightarrowhead.png" />
          </div>
        </div>
      )}
    </div>
  );
}
