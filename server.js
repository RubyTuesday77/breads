// DEPENDENCIES:
const express = require('express')
const methodOverride = require('method-override')  // Needed so DELETE can override POST; accompanies methodOverride DEPENDENCY


// CONFIGURATION:
require('dotenv').config()
const PORT = process.env.PORT
const app = express()


// MIDDLEWARE:
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))  // Need to change to check Postman
app.use(methodOverride('_method'))  // Accompanies methodOverride in DEPENDENCIES


// ROUTES:
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
})


// Breads:
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)


// 404 Page:
app.get('*', (req, res) => {
  res.send('404')
})

// LISTEN:
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
