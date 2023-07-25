USE employee_data_db;

-- Insert departments
INSERT INTO department (name) VALUES
    ('Marketing'),
    ('Finance'),
    ('Human Resources'),
    ('Sales'),
    ('Engineering');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Marketing Manager', 60000, 1),
    ('Marketing Specialist', 40000, 1),
    ('Finance Manager', 70000, 2),
    ('Finance Analyst', 50000, 2),
    ('HR Manager', 65000, 3),
    ('HR Specialist', 45000, 3),
    ('Sales Manager', 75000, 4),
    ('Sales Representative', 50000, 4),
    ('Software Engineer', 80000, 5),
    ('QA Engineer', 70000, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),         -- Marketing Manager
    ('Jane', 'Smith', 2, 1),          -- Marketing Specialist, managed by John
    ('Michael', 'Johnson', 3, NULL),  -- Finance Manager
    ('Emily', 'Williams', 4, 3),      -- Finance Analyst, managed by Michael
    ('David', 'Lee', 5, NULL),        -- HR Manager
    ('Sarah', 'Brown', 6, 5),         -- HR Specialist, managed by David
    ('Robert', 'Taylor', 7, NULL),    -- Sales Manager
    ('Jessica', 'Davis', 8, 7),       -- Sales Representative, managed by Robert
    ('William', 'Wilson', 9, NULL),   -- Software Engineer
    ('Karen', 'Anderson', 10, 9),     -- QA Engineer, managed by William
    ('Laura', 'Martinez', 5, 3),      -- HR Manager, managed by Michael
    ('Kevin', 'Rodriguez', 4, 3),     -- Finance Analyst, managed by Michael
    ('Amanda', 'Lopez', 2, 1),        -- Marketing Specialist, managed by John
    ('Christopher', 'Harris', 8, 7),  -- Sales Representative, managed by Robert
    ('Stephanie', 'Allen', 10, 9),    -- QA Engineer, managed by William
    ('Daniel', 'Scott', 6, 5),        -- HR Specialist, managed by David
    ('Linda', 'Turner', 3, NULL),     -- Finance Manager
    ('Brian', 'Adams', 9, NULL),      -- Software Engineer
    ('Maria', 'Campbell', 1, NULL),   -- Marketing Manager
    ('Richard', 'Ward', 7, NULL);     -- Sales Manager
