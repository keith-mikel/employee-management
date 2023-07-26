const express = require('express');
const router = express.Router();

// Define your routes for the /api/dept endpoint

// GET all departments
router.get('/', async (req, res) => {
  try {
    const pool = req.pool; // Access the database pool from the request object
    const [departments] = await pool.query('SELECT * FROM department');
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET a specific department by ID
router.get('/:id', async (req, res) => {
  const departmentId = req.params.id;

  try {
    const pool = req.pool; // Access the database pool from the request object
    const [department] = await pool.query('SELECT * FROM department WHERE id = ?', [departmentId]);

    if (department.length > 0) {
      res.json(department[0]);
    } else {
      res.status(404).send('Department not found');
    }
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).send('Internal Server Error');
  }
});

// CREATE a new department
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const pool = req.pool; // Access the database pool from the request object
    await pool.query('INSERT INTO department (name) VALUES (?)', [name]);

    res.status(201).send('Department created successfully');
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).send('Internal Server Error');
  }
});

// UPDATE a department by ID
router.put('/:id', async (req, res) => {
  const departmentId = req.params.id;
  const { name } = req.body;

  try {
    const pool = req.pool; // Access the database pool from the request object
    await pool.query('UPDATE department SET name = ? WHERE id = ?', [name, departmentId]);

    res.send('Department updated successfully');
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE a department by ID
router.delete('/:id', async (req, res) => {
  const departmentId = req.params.id;

  try {
    const pool = req.pool; // Access the database pool from the request object
    await pool.query('DELETE FROM department WHERE id = ?', [departmentId]);

    res.send('Department deleted successfully');
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

