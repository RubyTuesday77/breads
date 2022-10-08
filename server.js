// DEPENDENCIES:
const express = require('express')
const methodOverride = require('method-override')  // Needed so DELETE can override POST; accompanies methodOverride DEPENDENCY
const mongoose = require('mongoose')


// CONFIGURATION:
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// Mongoose:
const MONGO_URI = process.env.MONGO_URI
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log(`connected to mongo: ${MONGO_URI}`)
  }
)

// MIDDLEWARE:
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))  // Need to change to check Postman
app.use(methodOverride('_method'))  // Accompanies methodOverride in DEPENDENCIES


// ROUTES:
app.get('/', (req, res) => {
    res.send('<h1>BreadCrud</h1>')
})

// Breads:
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// Bakers:
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page:
app.get('*', (req, res) => {
  res.render('error')
})


// LISTEN:
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})