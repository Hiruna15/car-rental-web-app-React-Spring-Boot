/* eslint-disable react/prop-types */
import styles from "./StaticCount.module.css";

export default function StaticCount({ children, first = false }) {
  return (
    <div
      className={
        first ? `${styles.static_count} ${styles.first}` : styles.static_count
      }
    >
      {children}
    </div>
  );
}
