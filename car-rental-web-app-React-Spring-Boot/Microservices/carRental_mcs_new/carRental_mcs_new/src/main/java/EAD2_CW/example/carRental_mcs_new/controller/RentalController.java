package EAD2_CW.example.carRental_mcs_new.controller;

import EAD2_CW.example.carRental_mcs_new.data.CarRental;
import EAD2_CW.example.carRental_mcs_new.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/RentARide/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class RentalController {
    @Autowired
    private RentalService rentalService;

    @GetMapping("/{id}/{status}")
    public List<CarRental> getBookingsByIdAndStatus(@PathVariable int id, @PathVariable String status){
        return rentalService.getBookingsByIdAndStatus(id, status);
    }

    @GetMapping("/new/{id}")
    public List<CarRental> getNewBookingsByOwnerId(@PathVariable int id){
        return rentalService.getNewBookingsByOwnerId(id);
    }

    @GetMapping("/approved/{id}")
    public List<CarRental> getApprovedBookingsByOwnerId(@PathVariable int id){
        return rentalService.getApprovedBookingsByOwnerId(id);
    }

    @GetMapping("/ongoing/{id}")
    public List<CarRental> getOngoingBookingsByOwnerId(@PathVariable int id){
        return rentalService.getOngoingBookingsByOwnerId(id);
    }

    @GetMapping("/completed/{id}")
    public List<CarRental> getCompletedBookingsByOwnerId(@PathVariable int id){
        return rentalService.getCompletedBookingsByOwnerId(id);
    }

    @GetMapping("/rentalcount/{carid}/{status}")
    public int getRentalCountByCarIdAndRentalStatus(@PathVariable int carid, @PathVariable String status){
        return rentalService.getRentalCountByCarIdAndRentalStatus(carid, status);
    }

    @GetMapping("/ownerrentals/{ownerid}/{status}")
    public List<CarRental> getRentalsByOwnerIdAndRentalStatus(@PathVariable int ownerid, @PathVariable String status){
        return rentalService.getRentalsByOwnerIdAndRentalStatus(ownerid, status);
    }

    @GetMapping("/pendingcount/{userid}/{carid}")
    public int checkIfTheUserHasPendingBookingOfACar(@PathVariable int userid, @PathVariable int carid){
        return rentalService.checkIfTheUserHasPendingBookingOfACar(userid, carid);
    }

    @PostMapping
    public CarRental addBooking(@RequestBody CarRental carRental){
        return rentalService.addBooking(carRental);
    }

    @PutMapping("/{id}/accept")
    public void acceptBooking(@PathVariable int id) {
        rentalService.acceptBooking(id);
    }

    @PutMapping("/{id}/decline")
    public void declineBooking(@PathVariable int id) {
        rentalService.declineBooking(id);
    }

    @PutMapping("/{id}/complete")
    public void completeRental(@PathVariable int id){
        rentalService.completeRental(id);
    }

//    @PutMapping("/{id}")
//    public CarRental updateBooking(@PathVariable int id, @RequestBody CarRental carRental){
//        return rentalService.updateBooking(id, carRental);
//    }
}
