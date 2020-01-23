create database if not exists cms_db;

use cms_db;

create table department (
 id int not null AUTO_INCREMENT,
 name varchar(30),
 primary key (id)
);

create table role (
 id int not null AUTO_INCREMENT,
 title varchar(30),
 salary decimal(8, 2),
 department_id int,
 primary key (id),
 foreign key (department_id) references department(id)
);

create table employee (
 id int not null AUTO_INCREMENT,
 first_name varchar(30),
 last_name varchar(30),
 role_id int,
 manager_id int,
 primary key (id),
 foreign key (role_id) references role(id),
 foreign key (manager_id) references employee(id)
);
