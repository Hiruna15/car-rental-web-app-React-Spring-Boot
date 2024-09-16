/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from "./CarStatusUpdateDropDown.module.css";

export default function CarStatusUpdateDropDown({
  car,
  handleChangeCarStatus,
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropDown} ref={dropDownRef}>
      <span>{car.status === "approved" ? "" : car.status}</span>
      <img
        src="../expandArrow.png"
        onClick={() => setShowDropDown((cur) => !cur)}
      />
      {showDropDown && (
        <ul>
          {car.status === "available" &&
            ["available", "currentlyrented", "unavailable"].map((status) => (
              <li
                key={status}
                onClick={() =>
                  handleChangeCarStatus(car.status, car.id, status)
                }
              >
                {status}
              </li>
            ))}

          {car.status === "currentlyrented" &&
            ["currentlyrented", "available", "unavailable"].map((status) => (
              <li
                key={status}
                onClick={() =>
                  handleChangeCarStatus(car.status, car.id, status)
                }
              >
                {status}
              </li>
            ))}

          {car.status === "unavailable" &&
            ["unavailable", "available", "currentlyrented"].map((status) => (
              <li
                key={status}
                onClick={() =>
                  handleChangeCarStatus(car.status, car.id, status)
                }
              >
                {status}
              </li>
            ))}

          {car.status === "approved" &&
            ["available", "unavailable"].map((status) => (
              <li
                key={status}
                onClick={() =>
                  handleChangeCarStatus(car.status, car.id, status)
                }
              >
                {status}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
