require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'linebot'  // ตั้งชื่อ db ให้ชัดเจน
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));
  
console.log("MONGO_URI =", process.env.MONGO_URI);
// Routes
const webhookRoutes = require('./routes/webhook');
const flexRoutes = require('./routes/flex');
const dashboardRoutes = require('./routes/dashboard');

app.use('/webhook', webhookRoutes);
app.use('/flex', flexRoutes);
app.use('/dashboard', dashboardRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});