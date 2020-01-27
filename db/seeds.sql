use cms_db;

-- Departments

insert into department
 (name)
values
 ('Engineering'),
 ('Marketing'),
 ('Sales'),
 ('Administrative');

-- Roles

insert into role
 (title, salary, department_id)
values
 -- Engineering
 ('Engineering Manager', 120000, 1),
 ('Engineer', 80000, 1),
 ('Intern', 30000, 1),

 -- Marketing
 ('Marketing Manager', 120000, 2),
 ('Analyst', 50000, 2),
 ('Project Manager', 65000, 2),

 -- Sales
 ('Sales Manager', 120000, 3),
 ('Account Manager', 60000, 3),
 ('Call Center Agent', 40000, 3),

 -- Admin 
 ('Chief Executive Officer', 500000, 4);

-- Employees

insert into employee
 (first_name, last_name, role_id, manager_id)
values
 -- Admin
 ('Luke', 'Robinett', 10, 1),

 -- Engineering
 ('John', 'Jones', 1, 1),
 ('Kelly', 'Smith', 2, 2),
 ('Doug', 'Douglas', 3, 2),

 -- Marketing
 ('Jessica', 'Matthews', 4, 1),
 ('Marc', 'Cruz', 5, 4),
 ('Tom', 'Kelly', 6, 4),

 -- Sales
 ('Lisa', 'Soren', 7, 1),
 ('Bart', 'Andrews', 8, 7),
 ('Juanita', 'Coleman', 9, 7);
