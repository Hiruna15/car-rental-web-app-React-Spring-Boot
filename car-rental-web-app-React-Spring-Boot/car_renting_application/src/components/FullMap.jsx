import { useLayoutEffect, useState } from "react";
import styles from "./FullMap.module.css";
import RentCarMap from "./RentCarMap";
import { useNavigate } from "react-router-dom";

export default function FullMap() {
  const [findBy, setFindBt] = useState("all");
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className={styles.fullmap_container}>
      <div>
        <div className={styles.fullmap_top}>
          <div>
            <img src="../../gps.png" />
            <span>Find the car you want to rent</span>
          </div>
          <button
            onClick={() => setFindBt("all")}
            className={
              findBy === "all"
                ? `${styles.filter_btn} ${styles.active}`
                : styles.filter_btn
            }
          >
            All
          </button>
          <button
            onClick={() => setFindBt("available")}
            className={
              findBy === "available"
                ? `${styles.filter_btn} ${styles.active}`
                : styles.filter_btn
            }
          >
            Available
          </button>
          <button
            onClick={() => navigate("/cars")}
            className={styles.close_btn}
          >
            <img src="../../close_btn.png" />
          </button>
        </div>
        <div>
          <RentCarMap
            center={["6.927079", "79.861244"]}
            zoom={10}
            zoomControl={false}
            width={"100%"}
            height={"100%"}
            findBy={findBy}
          />
        </div>
      </div>
    </div>
  );
}
