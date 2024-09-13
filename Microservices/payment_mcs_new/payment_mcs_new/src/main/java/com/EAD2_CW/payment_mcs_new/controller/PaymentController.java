package com.EAD2_CW.payment_mcs_new.controller;

import com.EAD2_CW.payment_mcs_new.entity.Payment;
import com.EAD2_CW.payment_mcs_new.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/RentARide/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment createPayment(@RequestBody Map<String, Object> paymentData) {
        int bookingId = ((Number) paymentData.get("bookingId")).intValue();
        int amount = (int) paymentData.get("amount");

        return paymentService.createPayment(bookingId, amount);
    }

    @PutMapping("/{bookingId}/complete")
    public void completePayment(@PathVariable int bookingId) {
        paymentService.completePayment(bookingId);
    }

    @PutMapping("/{bookingId}/reject")
    public void rejectPayment(@PathVariable int bookingId) {
        paymentService.rejectPayment(bookingId);
    }
}
