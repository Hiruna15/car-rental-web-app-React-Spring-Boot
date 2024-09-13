import { useCar } from "../contexts/CarContext";
import styles from "./FuelTypeSelectBox.module.css";

export default function FuelTypeSelectBox() {
  const { selectedFuelTypes, setSelectedFuelTypes } = useCar();

  function handleSelectedFuelTypes(e) {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedFuelTypes([...selectedFuelTypes, value]);
      return;
    }

    const fuelTypes = selectedFuelTypes.filter((type) => type != value);
    if (fuelTypes.length !== 0) setSelectedFuelTypes(fuelTypes);
  }

  return (
    <div className={styles.fuel_type_selectBox_container}>
      <span>Fuel type</span>
      <div>
        {["petrol", "diesel", "hybrid", "electric"].map((type) => (
          <div key={type} className={styles.fueltype_container}>
            <input
              type="checkbox"
              value={type}
              id={type}
              onChange={handleSelectedFuelTypes}
              checked={selectedFuelTypes.includes(type)}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
