const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

userSchema.methods.getStatus = function () {
  const now = new Date();
  return now < this.endDate ? 'Active' : 'Expired';
};

module.exports = mongoose.model('User', userSchema);
