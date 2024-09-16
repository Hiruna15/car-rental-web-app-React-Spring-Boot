import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.hero_section_container}>
      <div className={styles.left_container}>
        <div>
          <span>FIND YOUR PERFECT RIDE</span>
          <span>Anytime Anywhere</span>
        </div>

        <div className={styles.list_car}>
          <span>List Your Car and Earn</span>
          <p>
            Want to turn your car into an earning asset? It's simple! List your
            car on our platform and start earning by renting it out to trusted
            drivers.
          </p>
          <div>
            <img src="../eye.png" />
            <img src="../right_arrow.png" />
          </div>
        </div>

        <div className={styles.short_dec}>
          <p>
            Discover the best deals on car rentals near you, or turn your idle
            car into extra income. Whether you're looking to drive or list,
            we've got you covered.
          </p>
          <div></div>
        </div>
      </div>

      <div className={styles.car_board}>
        <img src="hero_car.png" />
      </div>
      <div className={styles.car_board_behind}></div>

      <div className={styles.right_container}>
        <div>
          <span>Wide Collection of Cars</span>
        </div>

        <div className={styles.hero_map_container}>
          <div>
            <img src="hero_map.svg" />
          </div>
          <div>
            <p>Use out map feature to find the car nearest to you </p>
          </div>
          <div className={styles.hero_map_button}>
            <img src="../navigation2.png" />
          </div>
          <div className={styles.round_pin}></div>
        </div>

        <div className={styles.browse_cars_btn}>
          <div>
            <img src="../eye.png" />
          </div>
          <span>Browse Cars</span>
        </div>
      </div>

      <div className={styles.hero_bottom_btn}>
        <img src="../move_down.png" />
      </div>

      <div className={styles.style_round1}></div>
      <div className={styles.style_round3}></div>
      <div className={styles.style_round4}></div>
    </div>
  );
}
