import { useState } from "react";
import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={styles.side_bar}>
      <span>AUTOSLASH</span>
      <ul className={styles.ul}>
        <li
          className={activeTab === 1 ? styles.active : ""}
          onClick={() => setActiveTab(1)}
        >
          <Link to={"/admin"}>DashBoard</Link>
        </li>
        <li
          className={activeTab === 2 ? styles.active : ""}
          onClick={() => setActiveTab(2)}
        >
          <Link to={"newVehicles"}>NEW VEHICLES</Link>
        </li>
        <li
          className={activeTab === 3 ? styles.active : ""}
          onClick={() => setActiveTab(3)}
        >
          <Link>TRANSACTIONS</Link>
        </li>
      </ul>
    </div>
  );
}
