const express = require('express');
const router = express.Router();
const apiRoutes = require('./api'); 

//create api endpoint
router.use('/api', apiRoutes);

module.exports = router;
