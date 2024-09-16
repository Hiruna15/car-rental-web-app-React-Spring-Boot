/* eslint-disable react/prop-types */
import styles from "./ExpandRental.module.css";

export default function ExpandRental({
  rental,
  customer,
  handleAcceptBooking,
  handleDeclineBooking,
  handleCompleteRental,
  activeTab,
}) {
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
    <div className={styles.expand_rental}>
      <div className={styles.customer_details}>
        <div>
          <img src="../user_icon.png" />
        </div>
        <div>
          <span>{customer.username}</span>
          <span>{customer.mobile}</span>
        </div>
      </div>

      <div className={styles.rental_details}>
        <img src="../calendarr.png" />
        <span>{convertdateToReadableFormat(rental.bookingdate)}</span> |
        <span>{convertTime(rental.bookingtime)}</span> |
        <span>{rental.rentalperiod} Days</span>
      </div>

      <div className={styles.rental_total}>
        <span>
          {activeTab === "pending" ? "Holding Amount" : "Rental Amount"}
        </span>
        <span>{rental.paymentamount} LKR</span>
      </div>

      <div className={styles.buttons}>
        {activeTab === "pending" && (
          <>
            <button
              onClick={() => handleDeclineBooking(rental.id)}
              className={styles.decline_btn}
            >
              Decline
            </button>
            <button
              onClick={() => handleAcceptBooking(rental.id)}
              className={styles.accept_btn}
            >
              <img src="../correct.png" />
              Accept
            </button>
          </>
        )}

        {activeTab === "active" && (
          <button
            onClick={() => handleCompleteRental(rental.id)}
            className={styles.complete_btn}
          >
            <img src="../correct.png" /> Mark as complete
          </button>
        )}
      </div>

      {!["pending", "active"].includes(activeTab) && (
        <span
          className={
            activeTab === "completed"
              ? `${styles.rental_status} ${styles.completed}`
              : styles.rental_status
          }
        >
          {rental.rentalstatus === "rejected"
            ? "Timed Out"
            : rental.rentalstatus}
        </span>
      )}
    </div>
  );
}
