package EAD2_CW.example.carRental_mcs_new.service;

import EAD2_CW.example.carRental_mcs_new.data.CarRental;
import EAD2_CW.example.carRental_mcs_new.data.CarRentalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.ErrorManager;

@Service
public class RentalService {
    private static final Logger log = LoggerFactory.getLogger(RentalService.class);
    @Autowired
    private CarRentalRepository carRentalRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String PAYMENT_SERVICE_URL = "http://localhost:8086/RentARide/payment";

    @Scheduled(fixedRate = 60000) // Check every minute
    public void checkExpiredBookings() {
        List<CarRental> pendingBookings = carRentalRepository.findPendingBookings();
        LocalDateTime now = LocalDateTime.now();

        for (CarRental booking : pendingBookings) {
            if (booking.getExpirytime().isBefore(now)) { //find excced cars 15 min all pending cars
                booking.setRentalstatus("rejected");
                carRentalRepository.save(booking);

//                restTemplate.put(PAYMENT_SERVICE_URL + booking.getId() + "/reject", null);
                try {
                    restTemplate.put(PAYMENT_SERVICE_URL + "/" + booking.getId() + "/reject", null);
                } catch (Exception e) {
                    log.error("Failed to notify Payment Service for booking ID: " + booking.getId(), e);
                }
            }
        }
    }

    public CarRental addBooking(CarRental carRental){
        CarRental savedBooking = carRentalRepository.save(carRental);

        Map<String, Object> paymentData = new HashMap<>();
        paymentData.put("bookingId", savedBooking.getId());
        paymentData.put("amount", savedBooking.getPaymentamount());

        restTemplate.postForObject(PAYMENT_SERVICE_URL, paymentData, String.class);

        return savedBooking;
    }

    public void acceptBooking(int bookingId) {
        CarRental booking = carRentalRepository.findById(bookingId).orElseThrow();
        booking.setRentalstatus("active");
        carRentalRepository.save(booking);

        restTemplate.put(PAYMENT_SERVICE_URL + "/" + bookingId + "/complete", null);
    }

    public void declineBooking(int bookingId) {
        CarRental booking = carRentalRepository.findById(bookingId).orElseThrow();
        booking.setRentalstatus("declined");
        carRentalRepository.save(booking);

        restTemplate.put(PAYMENT_SERVICE_URL + "/" + bookingId + "/reject", null);
    }

    public void completeRental(int bookingId){
        CarRental booking = carRentalRepository.findById(bookingId).orElseThrow();
        booking.setRentalstatus("completed");
        carRentalRepository.save(booking);
    }

    public List<CarRental> getBookingsByIdAndStatus(int id, String status){
        return carRentalRepository.getBookingsByIdAndStatus(id, status);
    }

    public List<CarRental> getNewBookingsByOwnerId(int id){
        return carRentalRepository.findNewBookingsByOwnerId(id);
    }

    public List<CarRental> getApprovedBookingsByOwnerId(int id){
        return carRentalRepository.findApprovedBookingsByOwnerId(id);
    }

    public List<CarRental> getOngoingBookingsByOwnerId(int id){
        return carRentalRepository.findOngoingBookingsByOwnerId(id);
    }

    public List<CarRental> getCompletedBookingsByOwnerId(int id){
        return carRentalRepository.findCompletedBookingsByOwnerId(id);
    }

    public int getRentalCountByCarIdAndRentalStatus(int id, String status){
        return carRentalRepository.findRentalCountByCarIdAndRentalStatus(id, status);
    }

    public List<CarRental> getRentalsByOwnerIdAndRentalStatus(int ownerId, String status){
        return carRentalRepository.findRentalsByOwnerIdAndRentalStatus(ownerId, status);
    }

    public int checkIfTheUserHasPendingBookingOfACar(int userId, int carId){
        return carRentalRepository.findIfTheUserHasPendingBookingOfACar(userId, carId);
    }

    public CarRental updateBooking(int id, CarRental carRental){
        Optional<CarRental> existingBooking = carRentalRepository.findById(id);

        if(existingBooking.isPresent()){
            CarRental updatedBooking = existingBooking.get();
            updatedBooking.setRentalperiod(carRental.getRentalperiod());
            updatedBooking.setRentalstatus(carRental.getRentalstatus());
            updatedBooking.setBookingdate(carRental.getBookingdate());
            updatedBooking.setBookingtime(carRental.getBookingtime());
            updatedBooking.setPaymentamount(carRental.getPaymentamount());
            return carRentalRepository.save(updatedBooking);
        }else{
            throw new RuntimeException("Booking not found with ID: " + id);
        }
    }
}
