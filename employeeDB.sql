DROP DATABASE IF EXISTS employeeDB;

CREATE database employeeDB;

USE employeeDB;


CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT(10),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10),
    manager_id INT(10) NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Development");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 95,000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Customer Representative", 30000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Public Relations Manager", 130000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Representative", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Management Analyst", 85000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 70000,3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Developer", 135000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Olivia", "Sierra", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alicia", "Vasquez", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rose","Love", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jake","Simpson", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Penelope","Johnson", 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Braxton", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carl", "Mountain", 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sophia", "Boots", 8, 7);
