import { useEffect, useState } from "react";
import styles from "./NewVehicles.module.css";
import axios from "axios";
import NewVehicle from "./NewVehicle";
import VehicleReviewPanel from "./VehicleReviewPanel";
import { useFirebase } from "../contexts/FirebaseContext";
import Loader from "./Loader";

export default function NewVehicles() {
  const [newVehicles, setNewVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carOwners, setCarOwners] = useState({});
  const [carImages, setCarImages] = useState([]);
  // const [isVehicleReviewPanelOpen, setIsVehicleReviewPanelOpen] =
  //   useState(false);

  const [reviewCar, setReviewCar] = useState(null);
  const [reviewCarOwner, setReviewCarOwner] = useState(null);

  const { db, doc, getDoc } = useFirebase();

  useEffect(
    function () {
      async function fetchNewCars() {
        try {
          setIsLoading(true);
          let res = await axios.get(
            "http://localhost:8082/RentARide/vehicles/status/pending"
          );

          setNewVehicles(res.data);
          const cars = res.data;

          let ownerIds = [];
          ownerIds = [...new Set(res.data.map((car) => car.ownerid))];

          res = await axios.get(
            "http://localhost:8083/RentARide/users/usersbyids",
            { params: { ids: ownerIds.join(",") } }
          );

          const owners = {};

          for (const owner of res.data) {
            owners[owner.id] = owner;
          }

          setCarOwners(owners);

          const carFirstImages = [];

          for (const car of cars) {
            const carDocRef = doc(db, "cars", `car_${car.id}`);
            const carDoc = await getDoc(carDocRef);
            const carData = carDoc.data();
            carFirstImages.push(carData.imageUrls[0]);
          }

          setCarImages(carFirstImages);

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          throw new Error(error);
        }
      }

      fetchNewCars();
    },
    [db, doc, getDoc, reviewCar, reviewCarOwner]
  );

  return (
    <div className={styles.new_vehicles_container}>
      {/* {isVehicleReviewPanelOpen && <VehicleReviewPanel vehicle={} />} */}
      {reviewCar && reviewCarOwner && (
        <VehicleReviewPanel
          reviewCar={reviewCar}
          reviewCarOwner={reviewCarOwner}
          setReviewCar={setReviewCar}
          setReviewCarOwner={setReviewCarOwner}
        />
      )}

      {!reviewCar && !reviewCarOwner && (
        <div className={styles.new_vehicles}>
          {isLoading ? (
            <Loader />
          ) : newVehicles.length === 0 ? (
            <h1>No pending cars</h1>
          ) : (
            newVehicles.map((vehicle, index) => (
              <NewVehicle
                key={vehicle.id}
                vehicle={vehicle}
                carOwner={carOwners[vehicle.ownerid]}
                carImage={carImages[index]}
                setReviewCar={setReviewCar}
                setReviewCarOwner={setReviewCarOwner}

                // setIsVehicleReviewPanelOpen={setIsVehicleReviewPanelOpen}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
