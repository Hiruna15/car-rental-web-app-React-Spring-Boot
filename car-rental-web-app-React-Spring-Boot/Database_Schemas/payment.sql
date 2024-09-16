CREATE DATABASE payment_db;
USE payment_db;


CREATE TABLE payment (
    paymentid INT AUTO_INCREMENT PRIMARY KEY,
    amount int NOT NULL,
    status VARCHAR(20) NOT NULL,
    bookingid int NOT NULL
);



