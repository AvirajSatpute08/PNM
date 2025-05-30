const express = require('express');
const app = express();
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
