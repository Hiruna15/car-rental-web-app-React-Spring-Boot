import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./RentCar.module.css";
import { useEffect, useState } from "react";

import axios from "axios";
import { useFirebase } from "../contexts/FirebaseContext";
import RentCarMap from "../components/RentCarMap";
import CustomTimePicker from "../components/CustomTimePicker";
import PopupMessage from "../components/PopupMessage";
import { useRental } from "../contexts/RentalContext";
import { useAuth } from "../contexts/AuthContext";

export default function RentCar() {
  const [loadingCar, setLoadingCar] = useState(true);
  const [hasAPendingBooking, setHasAPendingBooking] = useState(false);
  const [prevImageIndex, setPrevImageIndex] = useState(0);
  const [dateDropDownToggle, setDateDropDownToggle] = useState(false);

  const { id: carId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { db, getDoc, doc } = useFirebase();
  const { user } = useAuth();

  const {
    rentalPrice,
    setRentalPrice,
    carOwner,
    setCarOwner,
    car,
    setCar,
    rentalPeriod,
    setRentalPeriod,
    carImages,
    setImages,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    message,
    setMessage,
  } = useRental();

  function getDateRange() {
    const today = new Date();
    const dates = [];

    for (let i = 0; i <= 10; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      dates.push(futureDate);
    }

    return dates;
  }

  const dateOptions = getDateRange();

  function formatDateForDisplay(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getDateValue(date) {
    return date.toISOString().split("T")[0];
  }

  function handleSetRentalPeriod(button) {
    if (disable) return;

    if (rentalPeriod)
      if (button === "up") {
        if (rentalPeriod === 5) return;
        setRentalPeriod((cur) => ++cur);
        setRentalPrice(car.price * (rentalPeriod + 1));
        return;
      }

    if (rentalPeriod === 1) return;
    setRentalPeriod((cur) => --cur);
    setRentalPrice(car.price * (rentalPeriod - 1));
  }

  /////
  async function handleRentCar(e) {
    e.preventDefault();

    if (!selectedTime || car.status !== "available") return;

    // navigate(`/payment`);
    navigate(`/test`);
  }

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setMessage]);

  useEffect(
    function () {
      setRentalPeriod(1);
      setSelectedDate(new Date().toISOString().split("T")[0]);
      setSelectedTime("");
    },
    [setRentalPeriod, setSelectedDate, setSelectedTime]
  );

  useEffect(
    function () {
      async function checkIfPending() {
        try {
          setLoadingCar(true);
          const res = await axios.get(
            `http://localhost:8084/RentARide/bookings/pendingcount/${user.id}/${carId}`
          );

          if (res.data) setHasAPendingBooking(true);
          else setHasAPendingBooking(false);

          setLoadingCar(false);
        } catch (error) {
          setLoadingCar(false);
          throw new Error(error);
        }
      }

      checkIfPending();

      return function () {
        setMessage("");
      };
    },

    [carId, user]
  );

  useEffect(
    function () {
      async function fetchCar() {
        try {
          setLoadingCar(true);
          let res = await axios.get(
            `http://localhost:8082/RentARide/vehicles/car/${carId}`
          );
          console.log("Vehicle:", res.data);
          setCar(res.data);
          setRentalPrice(res.data.price);

          const fetchedCar = res.data;

          const docRef = doc(db, "cars", `car_${fetchedCar.id}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setImages(docSnap.data().imageUrls);
          }

          res = await axios.get(
            `http://localhost:8083/RentARide/users/${fetchedCar.ownerid}`
          );
          console.log("ownser:", res.data);
          setCarOwner(res.data);

          setLoadingCar(false);
        } catch (error) {
          setLoadingCar(false);
          throw new Error(error);
        }
      }

      fetchCar();
    },
    [carId, db, doc, getDoc, setCar, setCarOwner, setImages, setRentalPrice]
  );

  const disable =
    user?.id === car.ownerid ||
    !["available", "currentlyrented"].includes(car.status) ||
    hasAPendingBooking;

  return (
    <main className={styles.rent_car_container}>
      <NavBar />

      {loadingCar ? (
        <h4>Loading.....</h4>
      ) : (
        <>
          {message && (
            <PopupMessage message={message} onClose={() => setMessage("")} />
          )}
          <div className={styles.left_container}>
            <div className={styles.status_container}>
              <div></div>
              <span>{car.status}</span>
            </div>

            <div className={styles.images_container}>
              <div className={styles.image_preview}>
                <img src={carImages[prevImageIndex]} />
              </div>
              <div className={styles.mini_images}>
                {carImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setPrevImageIndex(index)}
                    className={
                      index === prevImageIndex ? styles.active_mini_image : ""
                    }
                  >
                    <img src={carImages[index]} />
                  </div>
                ))}
              </div>
            </div>

            {/* <div className={styles.profile}>
              <div>
                <div className={styles.pro_image}></div>
              </div>
              <div>
                <span>{carOwner.username}</span>
              </div>
            </div> */}

            <div className={styles.cardetails_container1}>
              <div>
                <span className={styles.brand}>{car.brand}</span>
                <span className={styles.model}>{car.model}</span>
                <span className={styles.type}>{car.type}</span>
              </div>
              <div>
                <span className={styles.car_price}>{car.price} LKR</span>
                <span>/ day</span>
              </div>
            </div>

            <div className={styles.cardetails_container2}>
              <div>
                <div>
                  <img src="../gas-pump.png" />
                  <span>{car.fueltype}</span>
                </div>
                <div>
                  <img src="../transmission.png" />
                  <span>{car.transmission}</span>
                </div>
              </div>

              <div>
                <img src="../contact.png" />
                <span>{carOwner.mobile}</span>
              </div>
            </div>
          </div>

          <div className={styles.right_container}>
            <div className={styles.map_container}>
              <RentCarMap
                center={[car.lat, car.lng]}
                zoom={14}
                zoomControl={false}
                width="100%"
                height="20em"
                findBy="all"
              />
              <div>
                <div className={styles.car_city}>
                  <img src="../city.png" />
                  <span>{car.city}</span>
                </div>
                <div className={styles.car_address}>
                  <img src="../gps1.png" />
                  <span>{car.address}</span>
                </div>
              </div>
            </div>

            <div className={styles.rent_details_container}>
              <form onSubmit={handleRentCar}>
                <section>
                  <div
                    className={
                      disable
                        ? `${styles.date_picker} ${styles.date_disable}`
                        : styles.date_picker
                    }
                  >
                    <span>PICK-UP DATE</span>
                    <div>
                      <span>{selectedDate}</span>
                      <img
                        src="../drop-down.png"
                        onClick={() => setDateDropDownToggle((cur) => !cur)}
                      />
                      {dateDropDownToggle && !disable && (
                        <ul>
                          {dateOptions.map((date) => (
                            <li
                              key={getDateValue(date)}
                              onClick={() =>
                                setSelectedDate(getDateValue(date))
                              }
                            >
                              {formatDateForDisplay(date)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div>
                    <span>PICK-UP TIME</span>
                    <CustomTimePicker
                      selectedDate={selectedDate}
                      carStatus={car.status}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      disable={disable}
                    />
                  </div>

                  <div
                    className={
                      disable
                        ? `${styles.rent_period} ${styles.disable}`
                        : styles.rent_period
                    }
                  >
                    <span>RENTAL PERIOD (days)</span>
                    <div>
                      <input
                        type="text"
                        value={rentalPeriod}
                        disabled={disable}
                      />
                      <div className={styles.number_up_down_btns}>
                        <img
                          src="../move-up.png"
                          onClick={() => handleSetRentalPeriod("up")}
                        />
                        <img
                          src="../move-down.png"
                          onClick={() => handleSetRentalPeriod("down")}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <span className={disable ? styles.disable : ""}>
                    Total Price
                  </span>
                  <input
                    type="text"
                    readOnly
                    value={rentalPrice + " LKR"}
                    disabled={disable}
                    className={disable ? styles.disable : ""}
                  />
                  <button
                    disabled={disable}
                    className={disable ? styles.disable : ""}
                  >
                    RENT CAR
                  </button>
                </section>
              </form>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
