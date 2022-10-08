const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')

// INDEX:
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
      console.log(foundBreads)
      res.render('index', {
        breads: foundBreads,
        title: 'Index Page'
      })
    })
})

/* Before Mongoose:
breads.get('/', (req, res) => {
  res.render('Index',
    {
      breads: Bread
    }
  )
  // res.send(Bread)
})
*/


// NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})


// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.findById(req.params.id)
        .then(foundBread => {
          res.render('edit', {
            bread: foundBread,
            bakers: foundBakers
          })
        })
    })
})

/* Before Mongoose:
breads.get('/:id/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.id],
    index: req.params.id
  })
})
*/


// SHOW:
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
    .then(foundBread => {
      const bakedBy = foundBread.getBakedBy()
      res.render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.render('error')
    })
})

/* Before Mongoose:
breads.get('/:arrayIndex', (req, res) => {
  if(Bread[req.params.arrayIndex]) {
    res.render('Show', {
      bread: Bread[req.params.arrayIndex],
      index: req.params.arrayIndex
    })
  } else {
    res.render('error')
  }
})
*/


// CREATE:
breads.post('/', (req, res) => {
  if(!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

/* Before Mongoose:
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true'
  } else {
    req.body.hasGluten = 'false'
  }
  Bread.push(req.body)
  res.redirect('/breads')
})
*/


// UPDATE:
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBread => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.id}`)
    })
})

/* Before Mongoose:
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.id] = req.body
  res.redirect(`/breads/${req.params.id}`)
})
*/


// DELETE:
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
      console.log(deletedBread)
      res.status(303).redirect('/breads')
    })
})

/* Before Mongoose:
breads.delete('/:id', (req, res) => {
  Bread.splice(req.params.id, 1)
  res.status(303).redirect('/breads')
})
*/


// CREATE MULTIPLE BREADS:
// 1. breadObjects variable is the array of bread objects to be added.
// 2. Go to http://localhost:[PORT]/breads/data/seed to add to the index.
breads.get('/data/seed', (req, res) => {
  let breadObjects = [
    {
      name: 'Rye',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'French',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      name: 'Gluten Free',
      hasGluten: false,
      image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'Pumpernickel',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    }
  ]
  Bread.insertMany(breadObjects)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})


module.exports = breads