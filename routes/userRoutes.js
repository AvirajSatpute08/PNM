const express = require('express');
const router = express.Router();
const { registerUser, accessDashboard } = require('../controllers/userController');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', registerUser);
router.get('/dashboard', accessDashboard);

module.exports = router;
