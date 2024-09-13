create database vehicledb;
use vehicledb;

create table vehicles (
	id int AUTO_INCREMENT PRIMARY KEY,
    year int,
    type VARCHAR(20),
    color VARCHAR(20),
    fueltype VARCHAR(20),
    price int,
    model VARCHAR(100),
    brand VARCHAR(50),
    status VARCHAR(50),
    ownerid int,
    transmission VARCHAR(20),
    numberplate VARCHAR(20),
    lat VARCHAR(50),
    lng VARCHAR(50),
    city VARCHAR(50),
    rentaltype VARCHAR(20),
    address VARCHAR(300)
);

