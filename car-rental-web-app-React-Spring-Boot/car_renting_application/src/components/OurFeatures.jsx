import useIntersectionObserver from "../hooks/useIntersectionObserver";
import styles from "./OurFeatures.module.css";

export default function OurFeatures() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.4,
  });

  return (
    <div
      ref={ref}
      className={`${styles.our_features_section} ${
        isVisible ? styles.visible : ""
      }`}
    >
      <span
        ref={ref}
        className={`${styles.features_sec_header} ${
          isVisible ? styles.visible : ""
        }`}
      >
        Why Choose Us
      </span>
      <div>
        <div
          className={`${styles.feature} ${isVisible ? styles.visible : ""}`}
          ref={ref}
        >
          <span>Flexible Rental Plans</span>
          <p>
            Choose from flexible rental plans that suit your needs—whether it's
            a short-term rental for a day or a long-term lease for weeks or
            months. Our affordable pricing ensures you get the best value for
            any duration.
          </p>
          <img src="../bubble.png" />
        </div>

        <div
          className={`${styles.feature} ${isVisible ? styles.visible : ""}`}
          ref={ref}
        >
          <span>Wide Range of Vehicles</span>
          <p>
            We offer a diverse selection of vehicles, including sedans, SUVs,
            luxury cars, and eco-friendly options. Whether you need a car for a
            family trip or a stylish ride for a special occasion, we've got the
            perfect vehicle for you
          </p>
          <img src="../bubble.png" />
        </div>

        <div
          className={`${styles.feature} ${isVisible ? styles.visible : ""}`}
          ref={ref}
        >
          <span>Affordable Prices & Discounts</span>
          <p>
            we are dedicated to providing you with an exceptional car rental
            experience tailored to your needs. Whether you're looking for a
            quick weekend getaway or a long-term rental, we have you covered
            with our wide range of services
          </p>
          <img src="../bubble.png" />
        </div>
      </div>
    </div>
  );
}
