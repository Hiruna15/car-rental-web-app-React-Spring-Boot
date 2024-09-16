import { useEffect, useState } from "react";
import styles from "./PaymentPage.module.css";

import { useAuth } from "../contexts/AuthContext";
import { useRental } from "../contexts/RentalContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  // const [userAcc, setUserAcc] = useState("");
  // const [ownerAcc, setOwnerAcc] = useState("");
  // const [amount, setAmount] = useState("");

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
        replace: true,
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
      <h2 className={styles.title}>Car Rental Payment</h2>
      <form className={styles.payment_form} onSubmit={handlePay}>
        <label htmlFor="userAcc">Your Bank Account Number</label>
        <input
          type="text"
          id="userAcc"
          value={userAccNum}
          onChange={(e) => setUserAccNum(e.target.value)}
          placeholder="Enter your account number"
        />
        <label htmlFor="ownerAcc">Owner's Bank Account Number</label>
        <input
          type="text"
          id="ownerAcc"
          value={carOwner.bankaccnumber}
          placeholder="Enter owner's account number"
          readOnly
        />
        <label htmlFor="amount">Total Amount</label>
        <input id="amount" readOnly type="text" value={rentalPrice} />
        <button className={styles.pay_btn}>Pay Now</button>
      </form>
    </div>
  );
}
