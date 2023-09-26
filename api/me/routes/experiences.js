const express = require('express');
const router = express.Router();
const Experience = require('../models/experience');

router.get('/', (req, res) => {
  res.send('Hello from experiences!')
})

router.post('/', (req, res) => {
  const experience = new Experience({
    type: req.body.type,
    title: req.body.name,
    role: req.body.role,
  })

  experience.save()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({ message: err })
    })
})

module.exports = router;