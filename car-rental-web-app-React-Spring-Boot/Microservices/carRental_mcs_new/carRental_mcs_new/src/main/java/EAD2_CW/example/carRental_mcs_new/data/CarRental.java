package EAD2_CW.example.carRental_mcs_new.data;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "rentals")
public class CarRental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userid;
    private int ownerid;
    private int carid;
    private int rentalperiod;
    private String rentalstatus;
    private LocalDate bookingdate;
    private LocalTime bookingtime;
    private LocalDateTime createdtime;

    private LocalDateTime expirytime;

//    @Transient
    private Integer paymentamount;

    public CarRental(){
        this.createdtime = LocalDateTime.now();
        this.expirytime = this.createdtime.plusMinutes(15);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getOwnerid() {
        return ownerid;
    }

    public void setOwnerid(int ownerid) {
        this.ownerid = ownerid;
    }

    public int getCarid() {
        return carid;
    }

    public void setCarid(int carid) {
        this.carid = carid;
    }

    public int getRentalperiod() {
        return rentalperiod;
    }

    public void setRentalperiod(int rentalperiod) {
        this.rentalperiod = rentalperiod;
    }

    public String getRentalstatus() {
        return rentalstatus;
    }

    public void setRentalstatus(String rentalstatus) {
        this.rentalstatus = rentalstatus;
    }

    public LocalDate getBookingdate() {
        return bookingdate;
    }

    public void setBookingdate(LocalDate bookingdate) {
        this.bookingdate = bookingdate;
    }

    public LocalTime getBookingtime() {
        return bookingtime;
    }

    public void setBookingtime(LocalTime bookingtime) {
        this.bookingtime = bookingtime;
    }

    public LocalDateTime getCreatedtime() {
        return createdtime;
    }

    public void setCreatedtime(LocalDateTime createdtime) {
        this.createdtime = createdtime;
    }

    public LocalDateTime getExpirytime() {
        return expirytime;
    }

    public void setExpirytime(LocalDateTime expirytime) {
        this.expirytime = expirytime;
    }

    public int getPaymentamount() {
        return paymentamount;
    }

    public void setPaymentamount(int paymentamount) {
        this.paymentamount = paymentamount;
    }

}
