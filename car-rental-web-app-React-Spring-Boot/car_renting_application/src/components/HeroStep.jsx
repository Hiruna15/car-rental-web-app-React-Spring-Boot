import styles from "./HeroStep.module.css";

export default function HeroStep({ children, color }) {
  return (
    <div className={styles.hero_step} style={{ background: color }}>
      {children}
    </div>
  );
}
