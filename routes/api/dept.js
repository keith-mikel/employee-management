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
    res.status(500).json({ error: 'Internal Server Error' });
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
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CREATE a new department
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const pool = req.pool; // Access the database pool from the request object
    const [result] = await pool.query('INSERT INTO department (name) VALUES (?)', [name]);

    res.status(201).json({ message: `Department "${name}" with ID ${result.insertId} created`, department: { id: result.insertId, name } });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE a department by ID
router.put('/:id', async (req, res) => {
  const departmentId = req.params.id;
  const { name } = req.body;

  try {
    const pool = req.pool; // Access the database pool from the request object
    await pool.query('UPDATE department SET name = ? WHERE id = ?', [name, departmentId]);

    res.json({ message: `Department with ID ${departmentId} updated`, department: { id: departmentId, name } });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a department by ID
router.delete('/:id', async (req, res) => {
  const departmentId = req.params.id;

  try {
    const pool = req.pool; // Access the database pool from the request object
    const [department] = await pool.query('SELECT name FROM department WHERE id = ?', [departmentId]);
    if (department.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await pool.query('DELETE FROM department WHERE id = ?', [departmentId]);

    res.json({ message: `Department Successfully deleted` });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
