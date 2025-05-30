const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { email, password, startDate, duration } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  let endDate = new Date(startDate);
  if (duration === 'monthly') endDate.setMonth(endDate.getMonth() + 1);
  else if (duration === 'yearly') endDate.setFullYear(endDate.getFullYear() + 1);

  const user = new User({ email, password: hashedPassword, startDate, endDate });

  try {
    await user.save();
    const status = user.getStatus();
    res.render('status', { status, email: user.email });

  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

const accessDashboard = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');
  const status = user.getStatus();

  if (status === 'Active') {
    res.render('dashboard', { email });
  } else {
    res.send('Subscription expired. Please renew.');
  }
};

module.exports = { registerUser, accessDashboard };
