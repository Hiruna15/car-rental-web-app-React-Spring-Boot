import styles from "./VehicleDetails.module.css";

import { useEffect, useRef, useState } from "react";
import { useCar } from "../contexts/CarContext";

export default function VehicleDetails() {
  const dropdownRefs = {
    brands: useRef(null),
    models: useRef(null),
    types: useRef(null),
    transmissions: useRef(null),
    fueltypes: useRef(null),
  };
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchBrands, setSearchBrands] = useState(brands);
  //   const [selectedBrand, setSelectedBrand] = useState("");
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [modelsLoading, setModelsLoading] = useState(false);

  const [searchModel, setSearchModel] = useState("");
  const [searchModels, setSearchModels] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { newCarDetails, setNewCarDetails } = useCar();

  function handleDropDownToggle(dropdown) {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  }

  function handleSelectBrand(brand) {
    setSearchBrand(brand);
    // setSelectedBrand(brand);
    setNewCarDetails((car) => ({ ...car, brand: brand }));
    setSearchModel("");
  }

  function handleSearchModel(model) {
    setSearchModel(model);
    setNewCarDetails((car) => ({ ...car, model: model }));
  }

  function handleSetYear(e) {
    if (isNaN(e.target.value) || e.target.value.length > 4) return;

    setNewCarDetails((car) => ({
      ...car,
      year: Number(e.target.value),
    }));
  }

  function handleSetPrice(e) {
    if (isNaN(e.target.value)) return;

    setNewCarDetails((car) => ({
      ...car,
      rentPrice: Number(e.target.value),
    }));
  }

  function handleSetType(type) {
    setNewCarDetails((car) => ({ ...car, type: type }));
  }

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOutside = Object.keys(dropdownRefs).every(
        (key) =>
          dropdownRefs[key].current &&
          !dropdownRefs[key].current.contains(event.target)
      );

      if (clickedOutside) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(
    function () {
      if (searchBrand.length === 0) {
        setSearchBrands(brands);
        setOpenDropdown(null);
        return;
      }

      const searchResults = brands.filter((brand) =>
        brand.toLowerCase().includes(searchBrand.toLowerCase())
      );
      setSearchBrands(searchResults);
      setOpenDropdown(null);
    },
    [searchBrand, brands]
  );

  useEffect(
    function () {
      if (searchModel.length === 0) {
        setSearchModels(models);
        setOpenDropdown(null);
        return;
      }

      const searchResults = models.filter((model) =>
        model.toLowerCase().includes(searchModel.toLowerCase())
      );
      setSearchModels(searchResults);
      setOpenDropdown(null);
    },
    [searchModel, models]
  );

  useEffect(
    function () {
      async function fetchAllCarBrands() {
        try {
          setBrandsLoading(true);
          const res = await fetch(
            "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
          );
          const data = await res.json();
          const makes = data.Results;
          const allBrands = makes.map((make) => make.MakeName);
          setBrands(allBrands);
          setBrandsLoading(false);
        } catch (error) {
          setBrandsLoading(false);
          throw new Error(error);
        }
      }

      fetchAllCarBrands();
    },
    [setBrands]
  );

  useEffect(
    function () {
      async function fetchCarModels() {
        try {
          setModelsLoading(true);
          const res = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${newCarDetails.brand}?format=json`
          );
          const data = await res.json();
          const fetchedModels = data.Results;
          const allModels = fetchedModels.map((model) => model.Model_Name);
          setModels(allModels);
          setSearchModels(allModels);
          //   setSearchModel("");
          setModelsLoading(false);
        } catch (error) {
          setModelsLoading(false);
          throw new Error(error);
        }
      }
      if (newCarDetails.brand) fetchCarModels();
    },
    [newCarDetails, setModels]
  );

  return (
    <section className={styles.vehicledetails_container}>
      <div>
        <div>
          <span>Brand</span>
          <div className={styles.dropdown_container} ref={dropdownRefs.brands}>
            <input
              type="text"
              placeholder="brand"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
            />
            <img
              src="../drop-down.png"
              className={styles.drop_down}
              onClick={() => handleDropDownToggle("brands")}
            />
            {openDropdown === "brands" && (
              <ul>
                {searchBrands.map((brand, index) => (
                  <li key={index} onClick={() => handleSelectBrand(brand)}>
                    {brand}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <span>Model</span>
          <div className={styles.dropdown_container} ref={dropdownRefs.models}>
            <input
              type="text"
              placeholder="model"
              value={searchModel}
              onChange={(e) => setSearchModel(e.target.value)}
            />
            <img
              src="../drop-down.png"
              className={styles.drop_down}
              onClick={() => handleDropDownToggle("models")}
            />
            {openDropdown === "models" && (
              <ul>
                {searchModels.map((model, index) => (
                  <li key={index} onClick={() => handleSearchModel(model)}>
                    {model}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <span>Type</span>
          <div className={styles.dropdown_container} ref={dropdownRefs.types}>
            <input type="text" placeholder="type" value={newCarDetails.type} />
            <img
              src="../drop-down.png"
              className={styles.drop_down}
              onClick={() => handleDropDownToggle("types")}
            />
            {openDropdown === "types" && (
              <ul>
                {[
                  "sedan",
                  "van",
                  "pickup",
                  "wagon",
                  "sports",
                  "couple",
                  "minivan",
                  "suv",
                  "jeep",
                  "hatchback",
                  "crossover",
                  "Electric",
                ].map((type) => (
                  <li key={type} onClick={() => handleSetType(type)}>
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <span>Year</span>
          <input
            type="text"
            placeholder="year"
            onChange={(e) => handleSetYear(e)}
            value={newCarDetails.year}
            className={styles.input_fields}
          />
        </div>
      </div>
      <div>
        <div>
          <span>price perday</span>
          <input
            type="text"
            placeholder="LKR"
            onChange={(e) => handleSetPrice(e)}
            value={newCarDetails.rentPrice}
            className={styles.input_fields}
          />
        </div>
        <div>
          <span>Number Plate</span>
          <input
            type="text"
            value={newCarDetails.numberplate}
            onChange={(e) =>
              setNewCarDetails((car) => ({
                ...car,
                numberplate: e.target.value,
              }))
            }
            placeholder="xxx-xxx"
            className={styles.input_fields}
          />
        </div>
        <div>
          <span>Transmission</span>
          <div
            className={styles.dropdown_container}
            ref={dropdownRefs.transmissions}
          >
            <input type="text" value={newCarDetails.transmition} />
            <img
              src="../drop-down.png"
              className={styles.drop_down}
              onClick={() => handleDropDownToggle("transmissions")}
            />
            {openDropdown === "transmissions" && (
              <ul>
                <li
                  onClick={() =>
                    setNewCarDetails((car) => ({
                      ...car,
                      transmition: "manual",
                    }))
                  }
                >
                  Manual
                </li>
                <li
                  onClick={() =>
                    setNewCarDetails((car) => ({
                      ...car,
                      transmition: "auto",
                    }))
                  }
                >
                  Auto
                </li>
              </ul>
            )}
          </div>
        </div>
        <div>
          <span>Fuel Type</span>
          <div
            className={styles.dropdown_container}
            ref={dropdownRefs.fueltypes}
          >
            <input type="text" value={newCarDetails.fuelType} />
            <img
              src="../drop-down.png"
              className={styles.drop_down}
              onClick={() => handleDropDownToggle("fueltypes")}
            />
            {openDropdown === "fueltypes" && (
              <ul>
                {["petrol", "diesel", "hybrid", "electric"].map((type) => (
                  <li
                    key={type}
                    onClick={() =>
                      setNewCarDetails((car) => ({
                        ...car,
                        fuelType: type,
                      }))
                    }
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
