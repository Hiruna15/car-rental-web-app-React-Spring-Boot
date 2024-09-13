/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./PopupMessage.module.css";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function PopupMessage({ message, duration = 4000, onClose }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(
    function () {
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    },
    [message, duration, onClose]
  );

  return (
    <div
      className={`${styles.popup_msge_container} ${
        showPopup ? styles.show : ""
      }`}
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      </Stack>
    </div>
  );
}
