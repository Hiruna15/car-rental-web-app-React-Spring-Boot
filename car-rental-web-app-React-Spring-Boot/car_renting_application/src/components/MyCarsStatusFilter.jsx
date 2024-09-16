import { useEffect, useRef, useState } from "react";
import styles from "./MyCarsStatusFilter.module.css";

export default function MyCarsStatusFilter({
  selectedType,
  setSelectedType,
  carCounts,
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
    <div className={styles.status_dropDown} ref={dropDownRef}>
      <span>{selectedType}</span>
      <img
        src="../dropdownnew.png"
        onClick={() => setShowDropDown((cur) => !cur)}
      />
      {showDropDown && (
        <ul>
          {[
            "available",
            "currentlyrented",
            "pending",
            "approved",
            "declined",
            "unavailable",
          ].map((status, index) => (
            <li
              key={status}
              onClick={
                !carCounts[index] ? undefined : () => setSelectedType(status)
              }
              className={!carCounts[index] ? styles.disable : ""}
            >
              {status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
