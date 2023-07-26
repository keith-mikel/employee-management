const express = require('express');
const router = express.Router();

// Define your routes for the /api/role endpoint

// GET all roles
router.get('/', async (req, res) => {
  try {
    const pool = req.pool; // Access the database pool from the request object
    const [roles] = await pool.query('SELECT * FROM role');
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET a specific role by ID
router.get('/:id', async (req, res) => {
  const roleId = req.params.id;

  try {
    const pool = req.pool; // Access the database pool from the request object
    const [role] = await pool.query('SELECT * FROM role WHERE id = ?', [roleId]);

    if (role.length > 0) {
      res.json(role[0]);
    } else {
      res.status(404).send('Role not found');
    }
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).send('Internal Server Error');
  }
});

// CREATE a new role
router.post('/', async (req, res) => {
  const { title, salary, department_id } = req.body;

  try {
    const pool = req.pool; // Access the database pool from the request object
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);

    res.status(201).send('Role created successfully');
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).send('Internal Server Error');
  }
});

// UPDATE a role by ID
router.put('/:id', async (req, res) => {
  const roleId = req.params.id;
  const { title, salary, department_id } = req.body;

  try {
    const pool = req.pool; // Access the database pool from the request object
    await pool.query(
      'UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?',
      [title, salary, department_id, roleId]
    );

    res.send('Role updated successfully');
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE a role by ID
router.delete('/:id', async (req, res) => {
  const roleId = req.params.id;

  try {
    const pool = req.pool; // Access the database pool from the request object
    await pool.query('DELETE FROM role WHERE id = ?', [roleId]);

    res.send('Role deleted successfully');
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
