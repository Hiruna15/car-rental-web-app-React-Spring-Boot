create database rentalServiceDb;
use rentalServiceDb;

create table rentals (
	id int auto_increment primary key,
    userid int,
    ownerid int,
    carid int,
    rentalperiod int,
    rentalstatus VARCHAR(20),
    bookingdate DATE,
    bookingtime TIME,
    createdtime datetime,
    expirytime datetime,
    paymentamount int 
);

