import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useCar } from "../contexts/CarContext";
import { useNavigate } from "react-router-dom";
// import { useUrlPosition } from "../../../worldwise/src/hooks/useUrlPosition";
import { useEffect } from "react";

export default function Map() {
  //   const [lat, lng] = useUrlPosition();
  //   const { newCarDetails, setNewCarDetails } = useCar();
  //   useEffect(
  //     function () {
  //       if (!lat && !lng) return;
  //       async function getCity() {
  //         const res = await fetch(
  //           `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  //         );
  //         const data = await res.json();
  //         setNewCarDetails((car) => ({ ...car, carCity: data.city }));
  //         setNewCarDetails((car) => ({
  //           ...car,
  //           carLatLng: [data.latitude, data.longitude],
  //         }));
  //       }
  //       getCity();
  //     },
  //     [lat, lng, setNewCarDetails]
  //   );
  //   return (
  //     <div className={styles.mapContainer}>
  //       <div>
  //         <input readOnly type="text" placeholder="city" value={carCity} />
  //         <input
  //           type="text"
  //           placeholder="address"
  //           onChange={(e) => setCarAddress(e.target.value)}
  //           value={carAddress}
  //         />
  //       </div>
  //       <MapContainer
  //         center={[7.8731, 80.7718]}
  //         zoom={6}
  //         scrollWheelZoom={false}
  //         className={styles.map}
  //       >
  //         <TileLayer
  //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         />
  //         {carLatLng.length > 0 && (
  //           <Marker position={[carLatLng[0], carLatLng[1]]}>
  //             <Popup>
  //               A pretty CSS3 popup. <br /> Easily customizable.
  //             </Popup>
  //           </Marker>
  //         )}
  //         <DetectClick />
  //       </MapContainer>
  //     </div>
  //   );
  // }
  // function DetectClick() {
  //   const navigate = useNavigate();
  //   useMapEvents({
  //     click: (e) => {
  //       const { lat, lng } = e.latlng;
  //       navigate(`/addvehicle/map?lat=${lat}&lng=${lng}`);
  //     },
  //   });
}
