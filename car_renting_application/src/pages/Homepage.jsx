import NavBar from "../components/NavBar";
import VehicleTypesNav from "../components/VehicleTypesNav";
import HomeCarsList from "../components/HomeCarsList";
import styles from "./Homepage.module.css";
import HeroSection from "../components/HeroSection";
import BrowseByType from "../components/browseByType";
import BookingSteps from "../components/BookingSteps";
import HomeCarCollection from "../components/HomeCarCollection";
import HomeFeaturesSection from "../components/HomeFeaturesSection";
import { useAuth } from "../contexts/AuthContext";
import OurFeatures from "../components/OurFeatures";
import Footer from "../components/Footer";

export default function Homepage() {
  const { user } = useAuth();
  console.log("logged user:", user);

  return (
    <main className={styles.homepage_main_container}>
      <NavBar />
      <HeroSection />
      <BrowseByType />
      <OurFeatures />
      <HomeCarCollection />
      <BookingSteps />
      <Footer />

      {/* <HomeFeaturesSection /> */}
      {/* <VehicleTypesNav />
      <HomeCarsList /> */}
    </main>
  );
}
