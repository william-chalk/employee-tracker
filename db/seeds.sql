USE employees;
INSERT INTO department (department_name)
VALUES ("Sales"),
    ("IT"),
    ("Legal"),
    ("Engineering"),
    ("Finance");
INSERT INTO employee_role (role_title, role_salary, department_id)
VALUES ("Sales Lead", 75000, 1),
    ("IT Support", 50000, 2),
    ("Lawyer", 68000, 3),
    ("Engineer", 150000, 4),
    ("Accountant", 45000, 5);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("William", "Chalk", 1, NULL),
    ("Jacob", "Swan", 3, NULL),
    ("Taylor", "Williams", 4, 2),
    ("John", "Doe", 2, 1),
    ("Joe", "Bill", 4, 2);