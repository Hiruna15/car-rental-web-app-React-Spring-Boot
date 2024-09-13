create database userDb;
use userDb;

create table users (
	id int AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    mobile VARCHAR(20), 
    bankaccnumber VARCHAR(20) default null
);









