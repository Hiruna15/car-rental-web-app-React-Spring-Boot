import { useCar } from "../contexts/CarContext";
import styles from "./CarInfoValidateError.module.css";

export default function CarInfoValidateError() {
  const { carAddingValidateError, setCarAddingValidateError } = useCar();
  return (
    <div className={styles.validateError}>
      <p>{carAddingValidateError}</p>
      <button onClick={() => setCarAddingValidateError("")}>x</button>
    </div>
  );
}
