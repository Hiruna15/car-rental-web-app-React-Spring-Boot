import { createContext, useContext, useState } from "react";

const RentalContex = createContext();

function useRental() {
  return useContext(RentalContex);
}

function RentalProvider({ children }) {
  const [rentalPrice, setRentalPrice] = useState("");
  const [carOwner, setCarOwner] = useState({});
  const [car, setCar] = useState({});
  const [rentalPeriod, setRentalPeriod] = useState(1);
  const [carImages, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  return (
    <RentalContex.Provider
      value={{
        rentalPrice,
        setRentalPrice,
        carOwner,
        setCarOwner,
        car,
        setCar,
        rentalPeriod,
        setRentalPeriod,
        carImages,
        setImages,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        message,
        setMessage,
      }}
    >
      {children}
    </RentalContex.Provider>
  );
}

export { RentalProvider, useRental };
