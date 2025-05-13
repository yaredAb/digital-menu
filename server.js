const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')

const menuRoutes = require('./routes/menuRoutes');
const categoryRoutes = require('./routes/categoryRouter');


const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/api/menu', menuRoutes)
app.use('/api/category', categoryRoutes)

app.listen(PORT, () => {
    console.log('Server is running');
})