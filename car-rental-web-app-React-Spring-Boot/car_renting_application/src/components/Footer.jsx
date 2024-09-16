import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>AUTOSLASH</span>

      <div className={styles.social_media}>
        <div>
          <img src="../fb.png" />
        </div>
        <div>
          <img src="../insta.png" />
        </div>
      </div>

      <div className={styles.contact_info}>
        <div>
          <img src="../email.png" />
          <a href="">autoslash24n@gmail.com</a>{" "}
        </div>
        <div>
          <img src="../call.png" />
          <span>0767139018</span>
        </div>
      </div>
    </footer>
  );
}
