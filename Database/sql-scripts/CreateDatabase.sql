CREATE DATABASE solar_lab_db;

use solar_lab_db;

CREATE TABLE students (
  id INT NOT NULL AUTO_INCREMENT,
  fullname varchar(255) NOT NULL,
  studentCode varchar(255) NOT NULL,  
  email varchar(255) NOT NULL,
  password varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE experiments (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,  
  experimentDatetime datetime NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE student_experiment (
  studentid  INT NOT NULL,
  experimentid INT NOT NULL,  
  PRIMARY KEY(experimentid, studentid)
);


CREATE TABLE department (
  id int(10) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,  
  PRIMARY KEY(id)
);

CREATE TABLE department_sensors (
  id int(10) NOT NULL AUTO_INCREMENT,
  panelangle INT(4) NOT NULL,
  current DOUBLE(10,2) NOT NULL,
  voltage DOUBLE(10,2) NOT NULL,
  radiation DOUBLE(10,2) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE department_experiment (
  departmentid  INT NOT NULL,
  departmentsensorsid INT NOT NULL,
  experimentid INT NOT NULL,  
  PRIMARY KEY(experimentid, departmentid, departmentsensorsid)
);

CREATE TABLE iv_efficiency (
  time datetime NOT NULL,
  record INT NOT NULL,
  radiation DOUBLE(10,2) NOT NULL,
  current DOUBLE(10,2) NOT NULL,
  voltage DOUBLE(10,2) NOT NULL,
  PRIMARY KEY(time)
);

INSERT INTO students (fullname, studentcode, email, password)
VALUES ("Andres Gamboa Baldi", 45883, "andresgamboabaldi@gmail.com","Pass1234");

INSERT INTO experiments (name, experimentDatetime)
VALUES ("Experimento 1", '2011-03-13 02:53:50' );

INSERT INTO student_experiment (studentid, experimentid)
VALUES (1, 1);

INSERT INTO department (name) 
VALUES ("Cochabamba");
INSERT INTO department (name) 
VALUES ("Santa Cruz");
INSERT INTO department (name) 
VALUES ("La Paz");

INSERT INTO department_sensors (panelangle, current, voltage, radiation)
VALUES (45, 2.3, 16.4, 3.3);

INSERT INTO department_experiment (departmentid, departmentsensorsid, experimentid)
VALUES (1, 1, 1);
