-- ============================================================================
--  WorkForcePro  |  SQL Validation Script
--  Workforce Management & OJT Platform   |   Dialect: PostgreSQL
-- ----------------------------------------------------------------------------
--  Tables:
--    employees(id, employee_id, name, email, department)
--    trainings(id, training_name)
--    employee_trainings(id, employee_id, training_id, status [, due_date])
--    certifications(id, employee_id, certification_name, expiry_date)
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. All employees and their departments   (Requirement: EMP-003)
-- What it answers: Lists every employee together with the department they belong to.
-- ----------------------------------------------------------------------------
SELECT employee_id,
       name,
       department
FROM   employees
ORDER  BY department, name;

-- ----------------------------------------------------------------------------
-- 2. Employees who have completed ALL their trainings   (Requirement: OJT-002)
-- What it answers: Finds employees whose trainings are all marked 'Completed' (none still assigned or pending).
-- ----------------------------------------------------------------------------
SELECT e.employee_id,
       e.name
FROM   employees e
JOIN   employee_trainings et ON et.employee_id = e.id
GROUP  BY e.employee_id, e.name
HAVING COUNT(*) = SUM(CASE WHEN et.status = 'Completed' THEN 1 ELSE 0 END);

-- ----------------------------------------------------------------------------
-- 3. Number of trainings per employee   (Requirement: OJT-001)
-- What it answers: Shows how many trainings each employee has been assigned.
-- ----------------------------------------------------------------------------
SELECT e.employee_id,
       e.name,
       COUNT(et.id) AS total_trainings
FROM   employees e
LEFT   JOIN employee_trainings et ON et.employee_id = e.id
GROUP  BY e.employee_id, e.name
ORDER  BY total_trainings DESC;

-- ----------------------------------------------------------------------------
-- 4. Certifications expiring within 30 days   (Requirement: CERT-003)
-- What it answers: Lists certifications that will expire within the next 30 days.
-- ----------------------------------------------------------------------------
SELECT e.name,
       c.certification_name,
       c.expiry_date
FROM   certifications c
JOIN   employees e ON e.id = c.employee_id
WHERE  c.expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + 30
ORDER  BY c.expiry_date;

-- ----------------------------------------------------------------------------
-- 5. Employees with overdue trainings   (Requirement: OJT-001)
-- What it answers: Lists trainings that are past their due date and not yet completed.
-- ----------------------------------------------------------------------------
SELECT e.name,
       t.training_name,
       et.due_date
FROM   employee_trainings et
JOIN   employees e ON e.id = et.employee_id
JOIN   trainings  t ON t.id = et.training_id
WHERE  et.status <> 'Completed'
AND    et.due_date < CURRENT_DATE;

-- ----------------------------------------------------------------------------
-- 6. Top 5 employees by completed trainings   (Requirement: OJT-002)
-- What it answers: Shows the five employees who have completed the most trainings.
-- ----------------------------------------------------------------------------
SELECT e.employee_id,
       e.name,
       COUNT(*) AS completed_trainings
FROM   employees e
JOIN   employee_trainings et ON et.employee_id = e.id
WHERE  et.status = 'Completed'
GROUP  BY e.employee_id, e.name
ORDER  BY completed_trainings DESC
LIMIT  5;

-- ============================================================================
--- simple data checks that surface the reported defects
-- ============================================================================

-- V1. Find duplicate emails (ignoring upper/lower case) - validates EMP-002 / DEF-001
SELECT LOWER(email) AS email,
       COUNT(*)      AS times_used
FROM   employees
GROUP  BY LOWER(email)
HAVING COUNT(*) > 1;

-- V2. Find duplicate Employee IDs - validates EMP-001 / DEF-006
SELECT employee_id,
       COUNT(*) AS times_used
FROM   employees
GROUP  BY employee_id
HAVING COUNT(*) > 1;

-- V3. Certifications expiring in exactly 30 days - validates CERT-003 / DEF-004
SELECT e.name,
       c.certification_name,
       c.expiry_date
FROM   certifications c
JOIN   employees e ON e.id = c.employee_id
WHERE  c.expiry_date = CURRENT_DATE + 30;
