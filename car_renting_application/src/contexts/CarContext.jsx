import { createContext, useContext, useState } from "react";

const CarContext = createContext();

function useCar() {
  return useContext(CarContext);
}

const carTypes = [
  "sedan",
  "suv",
  "Electric",
  "sports",
  "crossover",
  "hatchback",
  "jeep",
  "minivan",
  "couple",
  "wagon",
  "pickup",
  "van",
];

function CarProvider({ children }) {
  const [activeTab, setActiveTab] = useState("sedan");
  const [isLoadingCars, setIsLoadingCars] = useState(true); /// updated from false to true
  const [filteredCars, setFilteredCars] = useState([]);
  const [filteredCarImages, setFilteredCarImages] = useState([]);
  const [filteredCarOwners, setFilteredCarOwners] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([
    "manual",
    "auto",
  ]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([
    "petrol",
    "diesel",
    "hybrid",
    "electric",
  ]);

  const [newCarDetails, setNewCarDetails] = useState({
    brand: "",
    model: "",
    type: "",
    fuelType: "petrol",
    transmition: "manual",
    rentPrice: 0,
    year: "",
    numberplate: "",
    selectedImages: [],
    carLatLng: [],
    carAddress: "",
    carCity: "",
  });

  const [carAddingStep, setCarAddingStep] = useState(1);
  const [carAddingValidateError, setCarAddingValidateError] = useState("");

  return (
    <CarContext.Provider
      value={{
        activeTab,
        setActiveTab,
        carTypes,
        filteredCars,
        setFilteredCars,
        isLoadingCars,
        setIsLoadingCars,
        filteredCarImages,
        setFilteredCarImages,
        selectedTypes,
        setSelectedTypes,
        selectedTransmissions,
        setSelectedTransmissions,
        selectedFuelTypes,
        setSelectedFuelTypes,
        filteredCarOwners,
        setFilteredCarOwners,
        newCarDetails,
        setNewCarDetails,
        carAddingStep,
        setCarAddingStep,
        carAddingValidateError,
        setCarAddingValidateError,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export { CarProvider, useCar };
