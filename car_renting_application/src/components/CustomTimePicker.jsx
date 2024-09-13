/* eslint-disable react/prop-types */
import styles from "./CustomTimePicker.module.css";
import { useEffect, useState } from "react";

export default function CustomTimePicker({
  selectedDate,
  selectedTime,
  setSelectedTime,
  carStatus,
  disable,
}) {
  const [minTime, setMinTime] = useState("00:00");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (selectedDate === today) {
      const now = new Date();
      const minutes = now.getMinutes();
      const nextQuarter = Math.ceil(minutes / 15) * 15;
      now.setMinutes(nextQuarter);
      now.setSeconds(0);
      const minTime = now.toTimeString().slice(0, 5);
      setMinTime(minTime);

      if (selectedTime < minTime) {
        setSelectedTime(minTime);
      }
    } else {
      setMinTime("00:00");
    }
  }, [selectedDate, selectedTime, setSelectedTime]);

  const handleTimeChange = (e) => {
    const time = e.target.value;

    const formattedTime = `${time}:00`;
    setSelectedTime(formattedTime);
  };

  return (
    <input
      className={styles.time_picker}
      type="time"
      id="timeSelect"
      value={selectedTime.slice(0, 5)}
      onChange={handleTimeChange}
      step="900" // 900 seconds = 15 minutes
      min={minTime}
      disabled={disable}
    />
  );
}
