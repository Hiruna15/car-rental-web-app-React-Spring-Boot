/* eslint-disable react/prop-types */
import styles from "./ProfileMiniNav.module.css";

export default function ProfileMiniNav({ tabs, setActiveTab, activeTab }) {
  return (
    <nav className={styles.mininav}>
      <ul>
        {tabs.map((tab, index) => (
          <li
            key={tab}
            onClick={() => setActiveTab(index + 1)}
            className={activeTab === index + 1 ? styles.active : ""}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
}
