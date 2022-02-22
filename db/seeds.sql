
use employee_mgmt;

INSERT INTO department (id, name) values (1, "dept1");
INSERT INTO department  (id, name) values (2, "dept2");
INSERT INTO department  (id, name) values (3, "dept3");
INSERT INTO department  (id, name) values (4, "dept4");

insert into role (id, title, salary, department_id) values (1, "Role 1", 1000, 4);
insert into role (id, title, salary, department_id) values (2, "Role 2", 2000, 3);
insert into role (id, title, salary, department_id) values (3, "Role 3", 3000, 3);
insert into role (id, title, salary, department_id) values (4, "Role 4", 4000, 2);

insert into employee (id, first_name, last_name, role_id, manager_id)  values (1, "f1", "l1", 3, 1);
insert into employee (id, first_name, last_name, role_id, manager_id)  values (2, "f2", "l2", 2, 1);
insert into employee (id, first_name, last_name, role_id, manager_id)  values (3, "f3", "l3", 4, 2);
insert into employee (id, first_name, last_name, role_id, manager_id)  values (4, "f4", "l4", 1, 2);