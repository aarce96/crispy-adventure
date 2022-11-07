const router = require('express').Router();

router.get('/notes', function(req, res) {
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err))
})

router.post('/notes', function(req, res) {
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err))
})