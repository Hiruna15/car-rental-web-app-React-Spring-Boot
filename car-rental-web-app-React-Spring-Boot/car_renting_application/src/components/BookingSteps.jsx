import BookingStep from "./BookingStep";
import styles from "./BookingSteps.module.css";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

export default function BookingSteps() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className={`${styles.booking_steps_container} ${
        isVisible ? styles.visible : ""
      }`}
    >
      <span>Quick and Easy Car Booking</span>
      <div>
        <div>
          <BookingStep>
            <span>01</span>
            <span>Search for a Car</span>
            <p>
              Use our filter option or interactive map to find the perfect car
              that meets your needs. Filter by car type, location, price, and
              more.
            </p>
          </BookingStep>
        </div>
        <div>
          <BookingStep>
            <span>02</span>
            <span>Choose Your Dates</span>
            <p>
              Select your desired pick-up and drop-off dates. Our system will
              automatically calculate the total rental cost based on your chosen
              timeframe
            </p>
          </BookingStep>
          <BookingStep>
            <span>03</span>
            <span>Secure Your Booking</span>
            <p>
              Complete the booking by providing your payment details. The car
              owner will review your request.
            </p>
          </BookingStep>
        </div>
        <div>
          <BookingStep>
            <span>04</span>
            <span>Get Confirmation</span>
            <p>
              If the owner accepts your request, your booking is confirmed. If
              not, your payment will be promptly released back to you.
            </p>
          </BookingStep>
          <BookingStep>
            <span>05</span>
            <span>Pick Up and Drive</span>
            <p>
              On the day of your rental, simply go to the specified location,
              pick up the keys, and you're ready to hit the road!
            </p>
          </BookingStep>
        </div>
      </div>
    </div>
  );
}
