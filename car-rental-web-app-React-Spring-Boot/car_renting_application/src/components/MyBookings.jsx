import styles from "./MyBookings.module.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useFirebase } from "../contexts/FirebaseContext";
import ProfileMiniNav from "./ProfileMiniNav";
import MyBookingsCard from "./MyBookingsCard";
import Loader from "./Loader";

const statuses = {
  1: "active",
  2: "pending",
  3: "declined",
  4: "rejected",
};

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState({});
  const [bookingOwners, setBookingOwners] = useState({});
  const [carImages, setCarImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { db, doc, getDoc } = useFirebase();

  useEffect(
    function () {
      async function fetchBookings() {
        try {
          setIsLoading(true);
          let res = await axios.get(
            `http://localhost:8084/RentARide/bookings/${user.id}/${statuses[activeTab]}`
          );

          setBookings(res.data);
          const fetchedBookings = res.data;

          if (res.data.length === 0) {
            setIsLoading(false);
            return;
          }

          const carids = [
            ...new Set(fetchedBookings.map((booking) => booking.carid)),
          ];

          res = await axios.get(
            "http://localhost:8082/RentARide/vehicles/filter",
            {
              params: {
                carIds: carids.join(","),
                minPrice: 0,
                maxPrice: 0,
              },
            }
          );

          const carsObject = {};
          res.data.forEach((car) => (carsObject[car.id] = car));
          setCars(carsObject);

          const images = {};
          for (const carid of carids) {
            const docRef = doc(db, "cars", `car_${carid}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              images[carid] = docSnap.data().imageUrls[0];
            }
          }

          setCarImages(images);

          const ownerIds = [
            ...new Set(fetchedBookings.map((booking) => booking.ownerid)),
          ];

          res = await axios.get(
            "http://localhost:8083/RentARide/users/usersbyids",
            {
              params: {
                ids: ownerIds.join(","),
              },
            }
          );

          const ownersObject = {};

          res.data.forEach((owner) => (ownersObject[owner.id] = owner));

          setBookingOwners(ownersObject);

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          throw new Error(error);
        }
      }

      fetchBookings();
    },
    [activeTab, user, db, doc, getDoc]
  );

  return (
    <div className={styles.mybookings_container}>
      <ProfileMiniNav
        tabs={["Active", "Pending", "Declined", "Timed Out"]}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

      {isLoading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <h4>No booking found</h4>
      ) : (
        <>
          {bookings.map((booking) => (
            <MyBookingsCard
              key={booking.id}
              car={cars[booking.carid]}
              carImage={carImages[booking.carid]}
              carOwner={bookingOwners[booking.ownerid]}
              booking={booking}
            />
          ))}
        </>
      )}
    </div>
  );
}
