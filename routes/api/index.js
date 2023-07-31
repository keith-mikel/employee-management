const express = require('express');
const router = express.Router();
const deptRoutes = require('./dept');
const employRoutes = require('./employ');
const roleRoutes = require('./role');

//routes
router.use('/department', deptRoutes);
router.use('/employee', employRoutes);
router.use('/role', roleRoutes);

module.exports = router;
