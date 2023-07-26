const express = require('express');
const router = express.Router();
const apiRoutes = require('./api'); // Corrected file path

router.use('/api', apiRoutes);

module.exports = router;
