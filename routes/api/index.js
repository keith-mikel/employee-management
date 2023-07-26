const express = require('express');
const router = express.Router();
const deptRoutes = require('./dept');
const employRoutes = require('./employ');
const roleRoutes = require('./role');

router.use('/dept', deptRoutes);
router.use('/employ', employRoutes);
router.use('/role', roleRoutes);

module.exports = router;
