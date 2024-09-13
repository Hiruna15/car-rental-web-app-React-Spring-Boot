import styles from "./LoginFormLeft.module.css";

export default function LoginFormLeft({ children }) {
  return <div className={styles.loginForm_left}>{children}</div>;
}
