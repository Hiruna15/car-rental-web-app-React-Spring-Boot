import SideBar from "../components/SideBar";
import styles from "./Admin.module.css";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <main className={styles.admin_page_container}>
      <SideBar />
      <Outlet />
    </main>
  );
}
