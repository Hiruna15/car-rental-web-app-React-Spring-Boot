import { useCar } from "../contexts/CarContext";
import RentCarMap from "./RentCarMap";
import styles from "./VehicleLocation.module.css";

export default function VehicleLocation() {
  const { newCarDetails, setNewCarDetails } = useCar();

  return (
    <section className={styles.location_container}>
      <div className={styles.location_details}>
        <input
          type="text"
          placeholder="City"
          value={newCarDetails.carCity}
          readOnly
        />
        <input
          type="text"
          placeholder="Address"
          value={newCarDetails.carAddress}
          onChange={(e) =>
            setNewCarDetails((car) => ({ ...car, carAddress: e.target.value }))
          }
        />
      </div>
      <div className={styles.map_container}>
        <RentCarMap
          from="addVehicle"
          center={[6.927079, 79.861244]}
          zoom={13}
          zoomControl={false}
          width={"100%"}
          height={"100%"}
          clickNavigate={"/addvehicle"}
        />
      </div>
      {/* <Link to={"map"}>Choose your car location</Link> <br /> */}
      {/* <Outlet /> */}
    </section>
  );
}
