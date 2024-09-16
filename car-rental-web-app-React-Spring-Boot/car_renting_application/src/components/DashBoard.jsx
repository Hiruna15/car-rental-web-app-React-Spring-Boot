import { useState } from "react";
import styles from "./DashBoard.module.css";
import StaticCount from "./StaticCount";

import { BarChart } from "@mui/x-charts/BarChart";
import RentCarMap from "./RentCarMap";

export default function DashBoard() {
  const [totalCounts, setTotalCounts] = useState([30, 50, 25, 180000]);

  return (
    <div className={styles.dashBoard_container}>
      <div className={styles.statics_counts_container}>
        <StaticCount first={true}>
          <div className={styles.top}>
            <div>
              <img src="../file_11222824.png" />
            </div>
            <span>Booking vs this month</span>
          </div>

          <div className={styles.bottom}>
            <span>Total Booking</span>
            <span>{totalCounts[0]}</span>
          </div>
        </StaticCount>

        <StaticCount>
          <div className={styles.top}>
            <div>
              <img src="../icons8-sedan-100.png" />
            </div>
          </div>

          <div className={styles.bottom}>
            <span>Total Cars</span>
            <span>{totalCounts[1]}</span>
          </div>
        </StaticCount>

        <StaticCount>
          <div className={styles.top}>
            <div>
              <img src="../icons8-user-96.png" />
            </div>
          </div>

          <div className={styles.bottom}>
            <span>Total Users</span>
            <span>{totalCounts[2]}</span>
          </div>
        </StaticCount>

        <StaticCount>
          <div className={styles.top}>
            <div>
              <img src="../icons8-money-96.png" />
            </div>
            <span>Income vs this month</span>
          </div>

          <div className={styles.bottom}>
            <span>Total Income</span>
            <span>{totalCounts[3]}</span>
          </div>
        </StaticCount>
      </div>

      <div className={styles.map_container}>
        <RentCarMap
          center={[6.8849, 79.876]}
          zoom={14}
          zoomControl={false}
          width={"100%"}
          height={"100%"}
          from={"admin"}
        />
      </div>

      <div className={styles.barchart_container}>
        <span>Bookings</span>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: ["January", "February", "March", "April", "May", "June"],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: [2000, 1300, 4000, 2400, 3400, 6000],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
