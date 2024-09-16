import styles from "./HomeCarsList.module.css";

import { useEffect, useRef, useState } from "react";
import { useCar } from "../contexts/CarContext";
import { useFirebase } from "../contexts/FirebaseContext";

import axios from "axios";
import CarCard from "./CarCard";

export default function HomeCarsList() {
  const [homeCars, setHomeCars] = useState([]);
  const [homeCarsImages, setHomeCarsImages] = useState([]);
  const [homeCarsOwners, setHomeCarsOwners] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [carImagesLoading, setCarImagesLoading] = useState(true);
  const carListRef = useRef(null);

  const isLoading = carsLoading || carImagesLoading;

  const { activeTab } = useCar();
  const { db, doc, getDoc } = useFirebase();

  function scrollLeft() {
    carListRef.current.scrollBy({
      left: -carListRef.current.children[0].offsetWidth,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    carListRef.current.scrollBy({
      left: carListRef.current.children[0].offsetWidth,
      behavior: "smooth",
    });
  }

  function handleWheelScroll(e) {
    e.preventDefault();

    carListRef.current.scrollBy({
      left:
        e.deltaY < 0
          ? -carListRef.current.children[0].offsetWidth
          : carListRef.current.children[0].offsetWidth,
      behavior: "smooth",
    });
  }

  useEffect(
    function () {
      if (!isLoading && carListRef.current) {
        const listContainer = carListRef.current;
        listContainer.addEventListener("wheel", handleWheelScroll);

        return function () {
          listContainer.removeEventListener("wheel", handleWheelScroll);
        };
      }
    },
    [isLoading]
  );

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
    <div className={styles.home_cars_list_container}>
      {isLoading ? (
        <h4>Loading....</h4>
      ) : (
        <>
          <img
            src="../../right_scroll_btn.png"
            className={styles.right_scroll_btn}
            onClick={scrollRight}
          />
          <img
            src="../../left_scroll_btn.png"
            className={styles.left_scroll_btn}
            onClick={scrollLeft}
          />
          <div className={styles.home_cars_list} ref={carListRef}>
            {homeCars.map((car, index) => (
              <CarCard
                key={index}
                car={car}
                carImage={homeCarsImages[index]}
                carOwner={homeCarsOwners[index]}
                widthHeight={["22em", "28em"]}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
