import { useCar } from "../contexts/CarContext";
import styles from "./FilteredCars.module.css";
import CarCard from "./CarCard";
import Loader from "./Loader";

export default function FilteredCars() {
  const { isLoadingCars, filteredCarImages, filteredCars, filteredCarOwners } =
    useCar();

  return (
    <div className={styles.filtered_cars_Container}>
      {isLoadingCars ? (
        <Loader />
      ) : (
        filteredCars.map((car, index) => (
          <CarCard
            key={index}
            car={car}
            carImage={filteredCarImages[index]}
            carOwner={filteredCarOwners[index]}
            widthHeight={["20em", "28em"]}
          />
        ))
      )}
    </div>
  );
}
