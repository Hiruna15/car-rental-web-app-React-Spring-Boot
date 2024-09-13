/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./CarBrandOrModelSelector.module.css";

export default function CarBrandOrModelSelector({
  selectedOption,
  setSelectedOption,
  options,
  placeholder,
  search,
  setSearch,
  setModelSearch = null,
  setSelectedModel = null,
}) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  useEffect(
    function () {
      setFilteredOptions(options);
    },
    [options]
  );

  function handleSearchChange(e) {
    if (placeholder === "Car Brand") {
      if (e.target.value === "") {
        setModelSearch("");
        setSelectedOption("");
        setSelectedModel("");
      }
    }

    setSearch(e.target.value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  function handleOptionSelect(e) {
    if (placeholder === "Car Brand") {
      if (e.target.value !== search) {
        setModelSearch("");
      }
    }
    console.log("Hiruna:", e.target.value);
    setSelectedOption(e.target.value);
    setSearch(e.target.value); ////////////
    setFilteredOptions(options);
  }

  function handleShowHideDropdown() {
    setDropDownOpen((isopen) => !isopen);
  }

  return (
    <div className={styles.car_brand_model_select_container}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleSearchChange}
      />
      <button className={styles.dropdown_btn} onClick={handleShowHideDropdown}>
        <img src="../../drop-down.png" />
      </button>

      {dropDownOpen && (
        <ul>
          {filteredOptions.map((option, index) => (
            <li key={index}>
              <button value={option} onClick={(e) => handleOptionSelect(e)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
