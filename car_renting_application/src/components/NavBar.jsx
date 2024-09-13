import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { user, activeNavTab, setActiveNavTab } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        scrolled ? `${styles.header_nav} ${styles.scrolled}` : styles.header_nav
      }
    >
      <h2>AUTOSLASH</h2>
      <nav>
        <ul>
          <li
            className={activeNavTab === 1 ? styles.active : ""}
            onClick={() => setActiveNavTab(1)}
          >
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li
            className={activeNavTab === 2 ? styles.active : ""}
            onClick={() => setActiveNavTab(2)}
          >
            <NavLink to={"/cars"}>Rent a car</NavLink>
          </li>
          <li
            className={activeNavTab === 3 ? styles.active : ""}
            onClick={() => setActiveNavTab(3)}
          >
            <NavLink to={"/addvehicle"}>Add vehicle</NavLink>
          </li>
          <li
            className={activeNavTab === 4 ? styles.active : ""}
            onClick={() => setActiveNavTab(4)}
          >
            <NavLink to={"/profile/mycars"}>My cars</NavLink>
          </li>
        </ul>
      </nav>
      {user ? (
        <div className={styles.profile_icon}>
          <NavLink to={"/profile"}>
            <img src="../../public/user_icon.png" />
          </NavLink>
        </div>
      ) : (
        <div className={styles.login_btn}>
          <NavLink to={"/login"}>Login</NavLink>
        </div>
      )}
    </header>
  );
}
