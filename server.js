const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const menuRoutes = require('./routes/menuRoutes');
const categoryRoutes = require('./routes/categoryRouter');


const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/api/menu', menuRoutes)
app.use('/api/category', categoryRoutes)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });