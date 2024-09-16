import styles from "./HomeFeaturesSection.module.css";

export default function HomeFeaturesSection() {
  return (
    <div className={styles.features_container}>
      <div className={styles.left}>
        <span>Flexible Rental Plans</span>
        <p>
          Choose from flexible rental plans that suit your needs—whether it’s a
          short-term rental for a day or a long-term lease for weeks or months.
          Our affordable pricing ensures you get the best value for any
          duration.
        </p>
      </div>
      <div className={styles.middle}>
        <span>Wide Range of Vehicles</span>
        <p>
          We offer a diverse selection of vehicles, including sedans, SUVs,
          luxury cars, and eco-friendly options. Whether you need a car for a
          family trip or a stylish ride for a special occasion, we’ve got the
          perfect vehicle for you
        </p>
      </div>
      <div className={styles.right}>
        <span>Easy Online Booking & Instant Confirmation:</span>
        <p>
          Book your car in just a few clicks with our user-friendly platform.
        </p>
      </div>
    </div>
  );
}
