const express = require('express');
const router = express.Router();

// employee endpoints

// GET all employees
router.get('/', async (req, res) => {
  try {
    const pool = req.pool; // Access the database pool from the request object
    const [employees] = await pool.query('SELECT * FROM employee');
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET a specific employee by ID
router.get('/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    const pool = req.pool; // Access the database pool from the request object
    const [employee] = await pool.query('SELECT * FROM employee WHERE id = ?', [employeeId]);

    if (employee.length > 0) {
      res.json(employee[0]);
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).send('Internal Server Error');
  }
});


// CREATE a new employee
router.post('/', async (req, res) => {
  const { first_name, last_name, role_id, manager_id } = req.body;

  try {
    const pool = req.pool; // Access the database pool from the request object
    const [result] = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);

    res.status(201).json({ message: `Employee "${first_name} ${last_name}" with ID ${result.insertId} created`, employee: { id: result.insertId, first_name, last_name, role_id, manager_id } });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE an employee by ID
router.put('/:id', async (req, res) => {
  const employeeId = req.params.id;
  const { first_name, last_name, role_id, manager_id } = req.body;

  try {
    const pool = req.pool; // Access the database pool from the request object
    await pool.query(
      'UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?',
      [first_name, last_name, role_id, manager_id, employeeId]
    );

    res.json({message:'Employee updated successfully'});
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE an employee by ID
router.delete('/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    const pool = req.pool; 
    await pool.query('DELETE FROM employee WHERE id = ?', [employeeId]);

    res.json({ message: `Employee Successfully deleted`});
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
