import styles from "./MyCars.module.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useFirebase } from "../contexts/FirebaseContext";
import MyCarsCard from "./MyCarsCard";
import MyCarsStatusFilter from "./MyCarsStatusFilter";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function MyListings() {
  const [selectedType, setSelectedType] = useState("all");
  const [myCars, setMyCars] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [carCounts, setCarCounts] = useState(new Array(6).fill(0));
  const [statusChangeToggle, setStattusChangeToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { doc, db, getDoc } = useFirebase();

  async function handleChangeCarStatus(carStatus, carid, status) {
    if (carStatus === status) {
      return;
    }
    if (status === "") {
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8082/RentARide/vehicles/${carid}`,
        { status: status, year: 0, price: 0 }
      );

      console.log("car stattus upated:", res.data);
      setStattusChangeToggle((cur) => !cur);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(
    function () {
      async function fetchCars() {
        try {
          setIsLoading(true);
          const res = await axios.get(
            `http://localhost:8082/RentARide/vehicles/cars/${user.id}`,
            {
              params: {
                statuses:
                  selectedType === "all"
                    ? "available,currentlyrented,unavailable"
                    : selectedType,
              },
            }
          );

          setMyCars(res.data);

          const images = [];
          for (const car of res.data) {
            const docRef = doc(db, "cars", `car_${car.id}`);
            const docSnap = await getDoc(docRef);

            images.push(docSnap.data().imageUrls[0]);
          }

          setCarImages(images);

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          throw new Error(error);
        }
      }

      fetchCars();
    },
    [selectedType, user, db, doc, getDoc, statusChangeToggle]
  );

  useEffect(
    function () {
      async function fetchCarCounts() {
        try {
          setIsLoading(true);
          const statuses = [
            "available",
            "currentlyrented",
            "pending",
            "approved",
            "declined",
            "unavailable",
          ];

          const counts = [];
          for (const status of statuses) {
            const res = await axios.get(
              `http://localhost:8082/RentARide/vehicles/carscount/${user.id}/${status}`
            );

            counts.push(res.data);
          }

          setCarCounts(counts);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          throw new Error(error);
        }
      }

      fetchCarCounts();
    },
    [user, statusChangeToggle]
  );

  return (
    <div className={styles.mycars_container}>
      <MyCarsStatusFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        carCounts={carCounts}
      />

      {isLoading ? (
        <Loader />
      ) : myCars.length === 0 ? (
        <div className={styles.add_car_btn}>
          <span>You have no cars listed on the site</span>
          <span>Add your car</span>
          <button onClick={() => navigate("/addvehicle")}>
            <img src="../plus.png" />
          </button>
        </div>
      ) : (
        <div className={styles.cars_container}>
          {myCars.map((car, index) => (
            <MyCarsCard
              key={index}
              carImage={carImages[index]}
              car={car}
              handleChangeCarStatus={handleChangeCarStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
