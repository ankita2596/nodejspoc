'use strict';

const Wiring = require('./wiring');
const Validate = require('./validations/crudValidation');

const getRouter = () => {
  const router = require('express').Router();
  const wiring = new Wiring();
  const validate = new Validate();

  router.post('/notes', validate.validateUpdate, (req, res, next) => {
    wiring.crudController().create(req, res, next);
  });
  
  router.get('/notes', (req, res) => {
    wiring.crudController().findAll(req,res);
  });

  router.get('/notes/:noteId', validate.validateIdExist, (req, res) => {
    wiring.crudController().findOne(req,res);
  });

  router.put('/notes/:noteId', [validate.validateIdExist, validate.validateUpdate], (req, res, next) => {
    wiring.crudController().update(req, res, next);
  });

  router.delete('/notes/:noteId',  validate.validateIdExist, (req, res) => {
    wiring.crudController().delete(req,res);
  });

  return router;
}

module.exports = getRouter;
