const githubController = require('./controller/githubController');

class Wiring {
  constructor() {

  }

  githubController () {
        return new githubController();
    }
}

module.exports = Wiring;
