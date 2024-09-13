import styles from "./Filter.module.css";
import { useEffect, useState } from "react";
import PriceRange from "./PriceRange";

import axios from "axios";
import { useCar } from "../contexts/CarContext";
import { useFirebase } from "../contexts/FirebaseContext";
import CarBrandOrModelSelector from "./CarBrandOrModelSelector";
import VehicleTypesSelectBox from "./VehicleTypesSelectBox";
import TransmissionSelectBox from "./TransmissionSelectBox";
import FuelTypeSelectBox from "./FuelTypeSelectBox";
import RentCarMap from "./RentCarMap";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [availableNow, setAvailableNow] = useState(false);
  const [selectedBrand, setSelectedBarnd] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");

  const navigate = useNavigate();

  const {
    setFilteredCars,
    setIsLoadingCars,
    setFilteredCarImages,
    selectedTypes,
    selectedTransmissions,
    selectedFuelTypes,
    setFilteredCarOwners,
  } = useCar();

  const { db, getDoc, doc } = useFirebase();

  useEffect(function () {
    async function fetchBrands() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "http://localhost:8082/RentARide/vehicles/brands"
        );

        setBrands(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error(error);
      }
    }

    fetchBrands();
  }, []);

  useEffect(
    function () {
      async function fetchModels() {
        try {
          if (!selectedBrand) {
            setModels([]);
            return;
          }

          setIsLoading(true);

          const res = await axios.get(
            "http://localhost:8082/RentARide/vehicles/models",
            {
              params: { brand: selectedBrand },
            }
          );

          setModels(res.data);
          console.log(res.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          throw new Error(error);
        }
      }

      fetchModels();
    },
    [selectedBrand]
  );

  useEffect(function () {
    async function fetchMaxCarRentPrice() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "http://localhost:8082/RentARide/vehicles/maxprice"
        );

        console.log(res.data);
        setPriceRange([0, res.data]);
        setMaxPrice(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error(error);
      }
    }

    fetchMaxCarRentPrice();
  }, []);

  useEffect(
    function () {
      async function fetchFilteredCars() {
        try {
          setIsLoadingCars(true);
          const params = {
            types:
              selectedTypes.length > 0 ? selectedTypes.join(",") : undefined,
            brands: selectedBrand ? selectedBrand : undefined,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            statuses: availableNow
              ? "available"
              : "available,currentlyrented,unavailable",
            fueltypes: selectedFuelTypes.join(","),
            transmissions: selectedTransmissions.join(","),
          };

          let res = await axios.get(
            "http://localhost:8082/RentARide/vehicles/filter",
            { params }
          );

          const filteredCars = res.data;
          setFilteredCars(res.data);

          const carOwners = [];
          for (const car of filteredCars) {
            res = await axios.get(
              `http://localhost:8083/RentARide/users/${car.ownerid}`
            );

            carOwners.push(res.data);
          }

          setFilteredCarOwners(carOwners);

          ////
          const images = [];
          for (const car of filteredCars) {
            const docRef = doc(db, "cars", `car_${car.id}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              //   console.log("Document data:", docSnap.data());
              images.push(docSnap.data().imageUrls[0]);
            }
          }

          setFilteredCarImages(images);
          /////
          setIsLoadingCars(false);
        } catch (error) {
          setIsLoadingCars(false);
          throw new Error(error);
        }
      }

      fetchFilteredCars();
    },
    [
      selectedBrand,
      selectedModel,
      selectedTypes,
      selectedTransmissions,
      selectedFuelTypes,
      availableNow,
      priceRange,
      setFilteredCars,
      setIsLoadingCars,
      db,
      doc,
      getDoc,
      setFilteredCarImages,
      setFilteredCarOwners,
    ]
  );

  return (
    <div className={styles.filter_container}>
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          <div>
            <span>Filters</span>
            <button>Reset</button>
          </div>

          <div className={styles.model_brand_container}>
            <CarBrandOrModelSelector
              selectedOption={selectedBrand}
              setSelectedOption={setSelectedBarnd}
              options={brands}
              placeholder={"Car Brand"}
              search={brandSearch}
              setSearch={setBrandSearch}
              setModelSearch={setModelSearch}
              setSelectedModel={setSelectedModel}
            />
            <CarBrandOrModelSelector
              selectedOption={selectedModel}
              setSelectedOption={setSelectedModel}
              options={models}
              placeholder={"Car Model"}
              search={modelSearch}
              setSearch={setModelSearch}
            />
          </div>

          <div>
            <span>Price range</span>
            <PriceRange
              setPriceRange={setPriceRange}
              priceRange={priceRange}
              maxPrice={maxPrice}
            />
          </div>

          <VehicleTypesSelectBox />

          <div className={styles.availability_filter_container}>
            <span>Available now only</span>
            <label htmlFor="available">
              <div
                className={
                  availableNow
                    ? `${styles.switch} ${styles.active}`
                    : styles.switch
                }
              >
                <div className={availableNow ? styles.active : ""}></div>
              </div>
            </label>

            <input
              type="checkbox"
              id="available"
              onChange={() => setAvailableNow((isAvl) => !isAvl)}
              checked={availableNow}
            />
          </div>

          <TransmissionSelectBox />
          <FuelTypeSelectBox />

          <div className={styles.mini_map_container}>
            <div className={styles.minimap_title}>
              <span>Find available cars from the map</span>
              <img src="../../maximize2.png" onClick={() => navigate("map")} />
            </div>
            <RentCarMap
              center={["6.927079", "79.861244"]}
              zoom={16}
              zoomControl={false}
              width="300px"
              height="200px"
            />
          </div>
        </>
      )}
    </div>
  );
}
