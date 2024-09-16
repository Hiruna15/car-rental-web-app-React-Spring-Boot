import styles from "./VehicleTypesSelectBox.module.css";
import { useCar } from "../contexts/CarContext";

export default function VehicleTypesSelectBox() {
  const { selectedTypes, setSelectedTypes, carTypes } = useCar();

  function handleSelectCarTypes(e) {
    const { value, checked } = e.target;

    if (value === "all") {
      if (!checked) return;
      setSelectedTypes([]);

      return;
    }

    if (checked) setSelectedTypes([...selectedTypes, value]);
    else setSelectedTypes(selectedTypes.filter((type) => type != value));
  }

  return (
    <div className={styles.select_v_types_container}>
      <span>Type</span>
      <div>
        <div className={styles.type_container}>
          <div>
            <input
              type="checkbox"
              id="all"
              value="all"
              checked={selectedTypes.length === 0}
              onChange={handleSelectCarTypes}
            />
            <label htmlFor="all">all</label>
          </div>

          {carTypes.map((type) => (
            <div key={type}>
              <input
                type="checkbox"
                id={type}
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={handleSelectCarTypes}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
