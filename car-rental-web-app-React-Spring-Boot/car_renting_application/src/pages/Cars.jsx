import { Outlet } from "react-router-dom";
import Filter from "../components/Filter";
import FilteredCars from "../components/FilteredCars";
import NavBar from "../components/NavBar";
import styles from "./Cars.module.css";

export default function Cars() {
  return (
    <main className={styles.cars_main_container}>
      <NavBar />
      <Filter />
      <FilteredCars />
      <Outlet />
    </main>
  );
}
