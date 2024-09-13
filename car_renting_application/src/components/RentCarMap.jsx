/* eslint-disable react/prop-types */
import styles from "./RentCarMap.module.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useFirebase } from "../contexts/FirebaseContext";

import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCar } from "../contexts/CarContext";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function RentCarMap({
  selectedCar = null,
  center,
  zoom,
  zoomControl,
  width,
  height,
  findBy = "available",
  from = null,
  clickNavigate = null,
}) {
  const [cars, setCars] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const navigate = useNavigate();

  const { db, getDoc, doc } = useFirebase();
  const { setNewCarDetails, newCarDetails } = useCar();

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // const customIcon = L.icon({
  //   iconUrl: "../gps_new.png",
  //   iconSize: [38, 38],
  //   iconAnchor: [22, 38],
  //   popupAnchor: [-3, -38],
  // });

  useEffect(
    function () {
      async function fetchAllAvailableCars() {
        try {
          if (from === "addVehicle") return;

          setIsMapLoading(true);

          const res = await axios.get(
            "http://localhost:8082/RentARide/vehicles/filter",
            {
              params: {
                statuses:
                  findBy === "available"
                    ? "available"
                    : "available,booked,underMaintanance",

                maxPrice: 0,
                minPrice: 0,
              },
            }
          );

          let newCars = [];
          if (
            selectedCar &&
            selectedCar.status !== "available" &&
            findBy !== "all"
          ) {
            setCars([...res.data, selectedCar]);
            newCars = [...res.data, selectedCar];
          } else {
            setCars(res.data);
            newCars = res.data;
          }

          const images = [];
          for (const car of newCars) {
            const docRef = doc(db, "cars", `car_${car.id}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              images.push(docSnap.data().imageUrls[0]);
            }
          }

          setCarImages(images);

          setIsMapLoading(false);
        } catch (error) {
          setIsMapLoading(false);
          throw new Error(error);
        }
      }

      fetchAllAvailableCars();
    },
    [selectedCar, db, doc, getDoc, findBy, from]
  );

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getCity() {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        setNewCarDetails((car) => ({ ...car, carCity: data.city }));
        setNewCarDetails((car) => ({
          ...car,
          carLatLng: [data.latitude, data.longitude],
        }));
      }

      getCity();
    },
    [lat, lng, setNewCarDetails]
  );

  return (
    <div
      className={styles.mapContainer}
      style={{ width: `${width}`, height: `${height}` }}
    >
      {isMapLoading ? (
        <div className={styles.loader}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          className={styles.map}
          minZoom={6}
          zoomControl={zoomControl}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          /> */}

          {cars.length > 0 &&
            cars.map((car, index) => (
              <Marker
                position={[car.lat, car.lng]}
                key={car.id}
                // className={
                //   selectedCar && car.id === selectedCar.id
                //     ? styles.selectedCarIcon
                //     : ""
                // }

                // icon={customIcon}
              >
                <Popup>
                  <div
                    onClick={
                      from !== "admin"
                        ? () => navigate(`/rentcar/${car.id}`)
                        : null
                    }
                    className={styles.customPopup}
                  >
                    <img src={carImages[index]} />
                    <span>{car.status}</span>
                    <span>{car.brand}</span>
                    <span>{car.model}</span>
                    <span>{car.price} LKR perday</span>
                    <span>{car.city}</span>
                  </div>
                </Popup>
              </Marker>
            ))}

          {newCarDetails.carLatLng.length > 0 && (
            <Marker
              position={[
                newCarDetails.carLatLng[0],
                newCarDetails.carLatLng[1],
              ]}
            >
              {/* <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup> */}
            </Marker>
          )}

          {from === "addVehicle" && (
            <DetectClick clickNavigate={clickNavigate} />
          )}
        </MapContainer>
      )}
    </div>
  );
}

function DetectClick({ clickNavigate }) {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(lat, lng);

      if (clickNavigate) navigate(`${clickNavigate}/?lat=${lat}&lng=${lng}`);
    },
  });
}
