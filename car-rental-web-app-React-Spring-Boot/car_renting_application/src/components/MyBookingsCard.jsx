/* eslint-disable react/prop-types */
import styles from "./MyBookingsCard.module.css";

export default function MyBookingsCard({ car, carImage, carOwner, booking }) {
  function convertdateToReadableFormat(date) {
    const dateObj = new Date(date);
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${year} ${month} ${day}`;
    return formattedDate;
  }

  function convertTime(time) {
    let [hours, minutes] = time.split(":");
    let period = "AM";

    hours = parseInt(hours, 10);
    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${period}`;
  }

  return (
    <div className={styles.booking_card_container}>
      <div>
        <div className={styles.car_image}>
          <img src={carImage} />
        </div>

        <div className={styles.carDetails}>
          <span>{car.brand}</span>
          <span>{car.model}</span>
          <span>{car.type}</span>
          <span>{car.city}</span>
        </div>
      </div>

      <div className={styles.bookingDetails}>
        <span>{convertdateToReadableFormat(booking.bookingdate)}</span> |
        <span>{convertTime(booking.bookingtime)}</span> |
        <span>{booking.rentalperiod} Days</span>
        <img src="../calendarr.png" />
      </div>

      <div className={styles.booking_price}>
        <span>{booking.paymentamount} LKR</span>
        <div>
          <span>View Car</span>
          <img src="../rightarrowhead.png" />
        </div>
      </div>
    </div>
  );
}
