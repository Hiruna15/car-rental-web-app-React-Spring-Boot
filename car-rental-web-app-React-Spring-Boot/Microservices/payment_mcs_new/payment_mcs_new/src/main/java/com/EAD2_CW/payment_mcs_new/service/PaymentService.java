package com.EAD2_CW.payment_mcs_new.service;

import com.EAD2_CW.payment_mcs_new.entity.Payment;
import com.EAD2_CW.payment_mcs_new.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public Payment createPayment(int bookingId, int amount) {
        Payment payment = new Payment();
        payment.setBookingid(bookingId);
        payment.setAmount(amount);
        payment.setStatus("holding");
        return paymentRepository.save(payment);
    }

    public void completePayment(int bookingId) {
        Payment payment = paymentRepository.findByBookingId(bookingId);
        payment.setStatus("completed");
        paymentRepository.save(payment);
    }

    public void rejectPayment(int bookingId) {
        Payment payment = paymentRepository.findByBookingId(bookingId);
        payment.setStatus("rejected");
        paymentRepository.save(payment);
    }
}
