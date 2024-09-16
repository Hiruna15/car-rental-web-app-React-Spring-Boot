import styles from "./BookingStep.module.css";

export default function BookingStep({ children }) {
  return <div className={styles.booking_step}>{children}</div>;
}
