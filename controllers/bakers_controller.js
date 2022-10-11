// DEPENDENCIES:
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker')
const bakerSeedData = require('../models/baker_seed')


// GET index:
baker.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})



// SHOW: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate({
            path: 'breads',
            options: { limit: 5 }
        })
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})



// DELETE:
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id)
        .then(deletedBaker => {
            res.status(303).redirect('/breads')
        })
})



// Create seed route (http://localhost:3004/bakers/data/seed) to seed database with our baker seed data:
baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))  // Will redirect back to the /breads index page
})


// Export:
module.exports = baker