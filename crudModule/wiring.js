const crudController = require('./controller/crudController');

class Wiring {
    constructor() {

    }

    crudController () {
        return new crudController();
    }
}

module.exports = Wiring;
