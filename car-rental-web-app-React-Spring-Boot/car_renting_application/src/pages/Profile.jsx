import { NavLink, Outlet, replace, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(2);

  const navigate = useNavigate();

  const { logOut, user } = useAuth();

  function handleLogOut() {
    logOut();
    navigate("/", { replace: true });
  }

  // useEffect(function () {
  //   if (user === null) {
  //     navigate("/", { replace: true });
  //     return null;
  //   }
  // }, []);

  return (
    <main className={styles.profile_container}>
      <NavBar />
      <div className={styles.tabs_container}>
        <ul>
          {/* <NavLink to={"/profile"}>
            <li
              className={activeTab === 1 ? styles.active : ""}
              onClick={() => setActiveTab(1)}
            >
              Profile
            </li>
          </NavLink> */}

          <NavLink to={"/profile"}>
            <li
              className={activeTab === 2 ? styles.active : ""}
              onClick={() => setActiveTab(2)}
            >
              My Bookings
            </li>
          </NavLink>

          <NavLink to={"mycars"}>
            <li
              className={activeTab === 3 ? styles.active : ""}
              onClick={() => setActiveTab(3)}
            >
              My Cars
            </li>
          </NavLink>

          <NavLink to={"myrentals"}>
            <li
              className={activeTab === 4 ? styles.active : ""}
              onClick={() => setActiveTab(4)}
            >
              My Rentals
            </li>
          </NavLink>

          {/* <NavLink>
            <li
              className={activeTab === 5 ? styles.active : ""}
              onClick={() => setActiveTab(5)}
            >
              Favorite Rides
            </li>
          </NavLink> */}
        </ul>

        <button className={styles.log_out_btn} onClick={handleLogOut}>
          <img src="../logout.png" />
          Log Out
        </button>
      </div>
      <Outlet />
    </main>
  );
}
