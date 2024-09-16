import { useEffect, useState } from "react";
import styles from "./MyRentals.module.css";

import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useFirebase } from "../contexts/FirebaseContext";
import ProfileMiniNav from "./ProfileMiniNav";
import MyRentalsCard from "./MyRentalsCard";
import ExpandRental from "./ExpandRental";
import Loader from "./Loader";

const tabs = {
  1: "active",
  2: "pending",
  3: "completed",
  4: "declined",
  5: "rejected",
};

export default function MyRentals() {
  const [activeTab, setActiveTab] = useState(1);
  const [rentals, setRentals] = useState([]);
  const [cars, setCars] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [expandCarIndex, setExpandCarIndex] = useState(0);
  const [customers, setCustomers] = useState({});
  const [rerenderToggle, setRerenderToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { doc, db, getDoc } = useFirebase();

  async function handleAcceptBooking(rentalId) {
    try {
      await axios.put(
        `http://localhost:8084/RentARide/bookings/${rentalId}/accept`
      );
      setRerenderToggle((cur) => !cur);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handleDeclineBooking(rentalId) {
    try {
      await axios.put(
        `http://localhost:8084/RentARide/bookings/${rentalId}/decline`
      );
      setRerenderToggle((cur) => !cur);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handleCompleteRental(rentalId) {
    try {
      await axios.put(
        `http://localhost:8084/RentARide/bookings/${rentalId}/complete`
      );
      setRerenderToggle((cur) => !cur);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(
    function () {
      async function fetchRentals() {
        setExpandCarIndex(0);
        try {
          setIsLoading(true);
          let res = await axios.get(
            `http://localhost:8084/RentARide/bookings/ownerrentals/${user.id}/${tabs[activeTab]}`
          );

          console.log("owner rentals:", res.data);
          setRentals(res.data);

          if (res.data.length > 0) {
            const customerIds = [
              ...new Set(res.data.map((rental) => rental.userid)),
            ];

            const fetchedCustomers = {};

            for (const customerId of customerIds) {
              res = await axios.get(
                `http://localhost:8083/RentARide/users/${customerId}`
              );

              fetchedCustomers[customerId] = res.data;
              console.log("Customer:", res.data);
            }

            setCustomers(fetchedCustomers);
          } else {
            setCustomers({});
          }

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          throw new Error(error);
        }
      }

      fetchRentals();
    },
    [activeTab, user, rerenderToggle]
  );

  useEffect(
    function () {
      async function fetchCars() {
        try {
          setIsLoading(true);
          if (rentals.length === 0) {
            setCars([]);
            setCarImages([]);
            setIsLoading(false);
            return;
          }

          const carids = [...new Set(rentals.map((rental) => rental.carid))];
          const fetchedCars = [];
          for (const carId of carids) {
            const res = await axios.get(
              `http://localhost:8082/RentARide/vehicles/car/${carId}`
            );

            fetchedCars.push(res.data);
          }

          setCars(fetchedCars);

          const images = [];
          for (const carid of carids) {
            const docRef = doc(db, "cars", `car_${carid}`);
            const docSnap = await getDoc(docRef);

            images.push(docSnap.data().imageUrls[0]);

            // if (docSnap.exists()) {
            //   images[carid] = docSnap.data().imageUrls[0];
            // }
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
    [rentals, db, doc, getDoc]
  );

  return (
    <div className={styles.myrentals_container}>
      <ProfileMiniNav
        tabs={["Active", "new Rentals", "completed", "declined", "Timed out"]}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

      {isLoading ? (
        <Loader />
      ) : rentals.length === 0 ? (
        <span>no {tabs[activeTab]} rentals</span>
      ) : (
        <div className={styles.rentals_scroll}>
          {cars.map((car, index) => (
            <div key={index} className={styles.rental_container}>
              <MyRentalsCard
                carImage={carImages[index]}
                car={car}
                activeTab={activeTab}
                rentalsCount={
                  rentals.filter((rental) => rental.carid === car.id).length
                }
                setExpandCarIndex={setExpandCarIndex}
                index={index}
                expandCarIndex={expandCarIndex}
              />
              {expandCarIndex === index && (
                <div className={styles.expand_container}>
                  {rentals
                    .filter((rental) => rental.carid === car.id)
                    .map((rental) => (
                      <ExpandRental
                        key={rental.id}
                        rental={rental}
                        customer={customers[rental.userid]}
                        handleAcceptBooking={handleAcceptBooking}
                        handleDeclineBooking={handleDeclineBooking}
                        handleCompleteRental={handleCompleteRental}
                        activeTab={tabs[activeTab]}
                      />
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
