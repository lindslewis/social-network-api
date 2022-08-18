const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('This is the wrong route, have you tried a different one?'));

module.exports = router;