'use strict';
var router = require('express').Router();
var Address = require('express').Router();
module.exports = router;

router.get('/', function(req, res, next) {
  Address.findAll({})
    .then(function(addresses) {
      res.send(addresses);
    })
    .catch(next);
});

router.param('id', function(req, res, next, id) {
  Address.findById(id)
    .then(function(address) {
      if (!address) {
        throw new Error('not found!');
      }
      req.address = address;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
  res.json(req.address);
});

router.post('/', function(req, res, next) {
  Address.create(req.body)
    .then(function(address) {
      res.send(address);
    })
    .catch(next);
});

router.put('/:id', function(req, res, next) {
  req.address.update(req.body)
    .then(function() {
      return Address.findById(req.params.id);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  req.address.destroy
    .then(function() {
      res.sendStatus(204);
    })
    .catch(next);
})
