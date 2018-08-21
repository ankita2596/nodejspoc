"use strict";

const Wiring = require('./wiring');

const getRouter = () => {
  const router = require('express').Router();
  const wiring = new Wiring();

  router.get('/getGithubRepository/:userName', (req, res) => {
    wiring.githubController().getGithubRepository(req,res);
  });

  return router;
};

module.exports = getRouter;
