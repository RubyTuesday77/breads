const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX:
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
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
  res.render('new')
})



// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('edit', {
        bread: foundBread
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
    .then(foundBread => {
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

module.exports = breads
