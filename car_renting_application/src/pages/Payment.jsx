import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRental } from "../contexts/RentalContext";
import styles from "./Payment.module.css";

import axios from "axios";
import PopupMessage from "../components/PopupMessage";
import { json, Navigate, useNavigate } from "react-router-dom";

export default function Payment() {
  const [userAccNum, setUserAccNum] = useState("");

  const {
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
    setMessage,
  } = useRental();

  const { user } = useAuth();

  const navigate = useNavigate();

  async function handlePay(e) {
    e.preventDefault();

    if (!userAccNum) return;

    console.log(
      user.id,
      car.ownerid,
      car.id,
      rentalPeriod,
      selectedDate,
      selectedTime,
      rentalPrice
    );

    try {
      const res = await axios.post("http://localhost:8084/RentARide/bookings", {
        userid: user.id,
        ownerid: car.ownerid,
        carid: car.id,
        rentalperiod: rentalPeriod,
        rentalstatus: "pending",
        bookingdate: selectedDate,
        bookingtime: selectedTime,
        paymentamount: rentalPrice,
      });

      console.log("booking:", res.data);

      navigate(`/rentcar/${car.id}`, {
        state: {
          message:
            "Payment Successful Your payment has been successfully processed and is currently on hold with our platform. The car owner will review your booking:",
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(
    function () {
      const storedCar = sessionStorage.getItem("car");
      const storedCarImages = sessionStorage.getItem("carImages");
      const storedCarOwner = sessionStorage.getItem("carOwner");
      const storedRentalPeriod = sessionStorage.getItem("rentalPeriod");
      const storedRentalPrice = sessionStorage.getItem("rentalPrice");
      const storedSelectedDate = sessionStorage.getItem("selectedDate");
      const storedSelectedTime = sessionStorage.getItem("selectedTime");

      if (
        storedCar &&
        storedCarImages &&
        storedCarOwner &&
        storedRentalPeriod &&
        storedRentalPrice &&
        storedSelectedDate &&
        storedSelectedTime
      ) {
        setCar(JSON.parse(storedCar));
        setImages(JSON.parse(storedCarImages));
        setCarOwner(JSON.parse(storedCarOwner));
        setRentalPeriod(storedRentalPeriod);
        setRentalPrice(storedRentalPrice);
        setSelectedDate(storedSelectedDate);
        setSelectedTime(storedSelectedTime);
      }
    },
    [
      setCar,
      setImages,
      setCarOwner,
      setRentalPeriod,
      setRentalPrice,
      setSelectedDate,
      setSelectedTime,
    ]
  );

  useEffect(
    function () {
      if (
        car &&
        carImages &&
        carOwner &&
        rentalPeriod &&
        rentalPrice &&
        selectedDate &&
        selectedTime
      ) {
        sessionStorage.setItem("car", JSON.stringify(car));
        sessionStorage.setItem("carImages", JSON.stringify(carImages));
        sessionStorage.setItem("carOwner", JSON.stringify(carOwner));
        sessionStorage.setItem("rentalPeriod", rentalPeriod);
        sessionStorage.setItem("rentalPrice", rentalPrice);
        sessionStorage.setItem("selectedDate", selectedDate);
        sessionStorage.setItem("selectedTime", selectedTime);
      }
    },
    [
      rentalPeriod,
      rentalPrice,
      selectedDate,
      selectedTime,
      car,
      carImages,
      carOwner,
    ]
  );

  return (
    <div className={styles.payment_container}>
      <form onSubmit={handlePay}>
        <img src={carImages[0]} /> <br />
        <input
          type="text"
          placeholder="your account number"
          value={userAccNum}
          onChange={(e) => setUserAccNum(e.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="owner account number"
          value={carOwner.bankaccnumber}
          readOnly
        />
        <br />
        <input readOnly type="text" value={rentalPrice} /> <br />
        <span>Total amount: {rentalPrice} LKR</span> <br /> <br />
        <span>Total days: {rentalPeriod}</span> <br />
        <span>Price: {car.price} LKR / Per Day </span> <br /> <br />
        <button>Pay</button>
      </form>
    </div>
  );
}
