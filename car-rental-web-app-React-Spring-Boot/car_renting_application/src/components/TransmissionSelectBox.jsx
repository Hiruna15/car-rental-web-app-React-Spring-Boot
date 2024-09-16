import styles from "./TransmissionSelectBox.module.css";
import { useCar } from "../contexts/CarContext";

export default function TransmissionSelectBox() {
  const { selectedTransmissions, setSelectedTransmissions } = useCar();

  function handleSelectedTransmissionTypes(e) {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedTransmissions([...selectedTransmissions, value]);
      return;
    }

    const transmissions = selectedTransmissions.filter((type) => type != value);
    if (transmissions.length !== 0) setSelectedTransmissions(transmissions);
  }

  return (
    <div className={styles.transmission_select_box_container}>
      <span>Transmission</span>
      <div>
        {["manual", "auto"].map((transmission) => (
          <div key={transmission} className={styles.transmission_container}>
            <input
              type="checkbox"
              id={transmission}
              value={transmission}
              onChange={handleSelectedTransmissionTypes}
              checked={selectedTransmissions.includes(transmission)}
            />
            <label htmlFor={transmission}>{transmission}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
