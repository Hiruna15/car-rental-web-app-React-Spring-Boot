import styles from "./AddVehiclee.module.css";

import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useCar } from "../contexts/CarContext";
import { useFirebase } from "../contexts/FirebaseContext";

import axios from "axios";
import VehicleDetails from "../components/VehicleDetails";
import VehicleImages from "../components/VehicleImages";
import VehicleLocation from "../components/VehicleLocation";
import CarInfoValidateError from "../components/CarInfoValidateError";

export default function AddVehicle() {
  const { user } = useAuth();
  const { db, storage, ref, uploadBytes, getDownloadURL, setDoc, doc } =
    useFirebase();
  const {
    newCarDetails,
    carAddingStep,
    setCarAddingStep,
    carAddingValidateError,
    setCarAddingValidateError,
    setNewCarDetails,
  } = useCar();

  const navigate = useNavigate();

  async function handleAddVehicle(e) {
    e.preventDefault();

    if (carAddingStep === 1) {
      if (
        newCarDetails.type &&
        newCarDetails.transmition &&
        newCarDetails.brand &&
        newCarDetails.model &&
        newCarDetails.numberplate &&
        newCarDetails.fuelType &&
        newCarDetails.year &&
        newCarDetails.rentPrice
      ) {
        setCarAddingStep((step) => ++step);
        setCarAddingValidateError("");
        return;
      } else {
        setCarAddingValidateError("Fill all the information!");
      }
    }

    if (carAddingStep === 2) {
      if (newCarDetails.selectedImages.length === 4) {
        setCarAddingStep((step) => ++step);
        setCarAddingValidateError("");
        return;
      } else {
        setCarAddingValidateError("Please Select 4 images");
      }
    }

    if (carAddingStep === 3) {
      if (
        newCarDetails.carCity &&
        newCarDetails.carAddress &&
        newCarDetails.carLatLng.length === 2
      ) {
        setCarAddingStep((step) => ++step);
        setCarAddingValidateError("");
        addCar();
      } else {
        setCarAddingValidateError("Select Your vehicle's location");
      }
    }
  }

  async function addCar() {
    try {
      const res = await axios.post("http://localhost:8082/RentARide/vehicles", {
        ownerid: user.id,
        brand: newCarDetails.brand,
        model: newCarDetails.model,
        price: newCarDetails.rentPrice,
        year: newCarDetails.year,
        type: newCarDetails.type,
        status: "pending", //should be pending
        transmission: newCarDetails.transmition,
        fueltype: newCarDetails.fuelType,
        lat: newCarDetails.carLatLng[0] + "",
        lng: newCarDetails.carLatLng[1] + "",
        city: newCarDetails.carCity,
        address: newCarDetails.carAddress,
        numberplate: newCarDetails.numberplate,
        rentaltype: "perday",
        color: "red",
      });

      console.log(res.data);

      const imageUrls = [];

      for (let i = 0; i < newCarDetails.selectedImages.length; i++) {
        const image = newCarDetails.selectedImages[i];

        const storageRef = ref(
          storage,
          `cars/${user.id}/${res.data.id}/image${i + 1}`
        );

        const snapshot = await uploadBytes(storageRef, image);

        const downloadURL = await getDownloadURL(snapshot.ref);

        imageUrls.push(downloadURL);
      }

      const userDocRef = doc(db, "cars", `car_${res.data.id}`);

      await setDoc(
        userDocRef,
        {
          imageUrls: imageUrls,
        },
        { merge: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleClickHome() {
    setCarAddingStep(1);
    navigate("/");
  }

  useEffect(
    function () {
      return function () {
        setNewCarDetails({
          brand: "",
          model: "",
          type: "",
          fuelType: "petrol",
          transmition: "manual",
          rentPrice: 0,
          year: "",
          numberplate: "",
          selectedImages: [],
          carLatLng: [],
          carAddress: "",
          carCity: "",
        });

        setCarAddingStep(1);
      };
    },
    [setNewCarDetails, setCarAddingStep]
  );

  useEffect(
    function () {
      if (!user) {
        navigate("/login");
      }
    },
    [user, navigate]
  );

  useEffect(
    function () {
      setCarAddingValidateError("");
    },
    [setCarAddingValidateError]
  );

  if (!user) return null;

  return (
    <main className={styles.add_vahicle_container}>
      <NavBar />

      {carAddingStep === 4 ? (
        <div className={styles.vehicle_submit_msge_container}>
          <img src="../admin.png" />
          <div className={styles.message}>
            <span>Hi {user.username}</span>
            <p>Your vehicle is now pending review by our administrators.</p>
            <p>
              Please note that once your vehicle is approved, you'll receive a
              notification, and it will appear in the "Approved Vehicles"
              section of your profile
            </p>
          </div>
          <div className={styles.home_btn} onClick={handleClickHome}>
            <div>
              <img src="../home.png" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.steps_container}>
            <div className={styles.active}>
              <div>
                <img src="../information.png" className={styles.step_icons} />
              </div>
              <div>
                <span>Add vehicle information</span>
                <p>
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make
                </p>
              </div>
            </div>
            <div className={carAddingStep !== 1 ? styles.active : ""}>
              <div>
                <img src="../camera (2).png" className={styles.step_icons} />
              </div>
              <div>
                <span>Add images</span>
                <p>
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make
                </p>
              </div>
            </div>
            <div className={carAddingStep > 2 ? styles.active : ""}>
              <div>
                <img src="../location2.png" className={styles.step_icons} />
              </div>
              <div>
                <span>Add location</span>
                <p>
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleAddVehicle} className={styles.form_container}>
            {carAddingStep === 1 && <VehicleDetails />}
            {carAddingStep === 2 && <VehicleImages />}
            {carAddingStep === 3 && <VehicleLocation />}

            <div className={styles.form_bottom}>
              <button>NEXT</button>
            </div>
          </form>
          {carAddingValidateError && <CarInfoValidateError />}
        </>
      )}
    </main>
  );
}
