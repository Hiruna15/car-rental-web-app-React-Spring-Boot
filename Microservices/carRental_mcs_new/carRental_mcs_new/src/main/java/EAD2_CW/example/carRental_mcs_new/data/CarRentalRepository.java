package EAD2_CW.example.carRental_mcs_new.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarRentalRepository extends JpaRepository<CarRental, Integer> {
    @Query("SELECT c FROM CarRental c WHERE c.ownerid = ?1 AND c.rentalstatus = 'new'")
    List<CarRental> findNewBookingsByOwnerId(int id);

    @Query("SELECT c FROM CarRental c WHERE c.ownerid = ?1 AND c.rentalstatus = 'approved'")
    List<CarRental> findApprovedBookingsByOwnerId(int id);

    @Query("SELECT c FROM CarRental c WHERE c.ownerid = ?1 AND c.rentalstatus = 'ongoing'")
    List<CarRental> findOngoingBookingsByOwnerId(int id);

    @Query("SELECT c FROM CarRental c WHERE c.ownerid = ?1 AND c.rentalstatus = 'completed'")
    List<CarRental> findCompletedBookingsByOwnerId(int id);

    @Query("SELECT c FROM CarRental c WHERE c.userid = ?1 AND c.rentalstatus = ?2")
    List<CarRental> getBookingsByIdAndStatus(int id, String status);

    @Query("SELECT c FROM CarRental c WHERE c.rentalstatus = 'pending'")
    List<CarRental> findPendingBookings();

    @Query("SELECT COUNT(c) FROM CarRental c WHERE c.carid = ?1 AND c.rentalstatus = ?2")
    int findRentalCountByCarIdAndRentalStatus(int id, String status);

    @Query("SELECT c FROM CarRental c WHERE c.ownerid = ?1 AND c.rentalstatus = ?2")
    List<CarRental> findRentalsByOwnerIdAndRentalStatus(int ownerId, String status);

    @Query("SELECT COUNT(c) FROM CarRental c WHERE c.userid = ?1 AND c.carid = ?2 AND c.rentalstatus = 'pending'")
    int findIfTheUserHasPendingBookingOfACar(int userId, int carId);
}
