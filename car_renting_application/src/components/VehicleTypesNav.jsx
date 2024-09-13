import styles from "./VehicleTypesNav.module.css";
import { useCar } from "../contexts/CarContext";

export default function VehicleTypesNav() {
  const { activeTab, setActiveTab } = useCar();

  return (
    <nav className={styles.vehicleTypesNav}>
      <ul>
        {["sedan", "suv", "Electric", "sports", "crossover"].map((type) => (
          <li
            key={type}
            onClick={() => setActiveTab(type)}
            className={type === activeTab ? styles.activeTab : ""}
          >
            {type}
          </li>
        ))}
      </ul>
    </nav>
  );
}
