package com.EAD2_CW.payment_mcs_new.repository;

import com.EAD2_CW.payment_mcs_new.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p WHERE p.bookingid = ?1")
    Payment findByBookingId(int bookingid);
}
