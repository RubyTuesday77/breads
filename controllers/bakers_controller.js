// Dependencies:
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')


// Create seed route (http://localhost:3004/bakers/data/seed) to seed database with our baker seed data:
baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))  // Will redirect back to the /breads index page
})


// Export:
module.exports = baker