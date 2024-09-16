/* eslint-disable react/prop-types */
import styles from "./PriceRange.module.css";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";

const CustomSlider = styled(Slider)({
  color: "#05CAAD",
  height: 8,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#1C1C22",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-track": {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#05CAAD",
  },
  "& .MuiSlider-rail": {
    height: 8,
    borderRadius: 4,
    opacity: 0.5,
    backgroundColor: "#52525B",
  },
});

function valuetext(value) {
  return `${value} USD`;
}

export default function PriceRange({ setPriceRange, priceRange, maxPrice }) {
  // const [value, setValue] = useState(range);

  const handleChange = (event, newValue) => {
    if (newValue[1] - newValue[0] > 1000) {
      setPriceRange(newValue);
    }
  };

  return (
    <div className={styles.price_range_container}>
      <CustomSlider
        getAriaLabel={() => "Price range"}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={maxPrice}
        step={100}
        disableSwap
        // minDistance={100}
      />
    </div>
  );
}
