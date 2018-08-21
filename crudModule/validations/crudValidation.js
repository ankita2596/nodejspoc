const Note = require('../models/crudModel');

class crudValidation {
  
    constructor() {

    }

    validateCreate(req, res, next) {
        req.checkBody('title', 'Title field can not be empty').notEmpty();
        req.checkBody('content', 'Content field can not be empty').notEmpty();
        let errors = req.validationErrors();
        if(errors) {
            return res.status(400).json({
                message: 'Validation failed',
                failures: errors
            });
        } else {
            return next();
        }
    }

    validateUpdate(req, res, next) {
        req.checkBody('title', 'Title field can not be empty').notEmpty();
        req.checkBody('content', 'Content field can not be empty').notEmpty();
        let errors = req.validationErrors();
        if(errors) {
            return res.status(400).json({
                message: 'Validation failed',
                failures: errors
            });
        } else {
            return next();
        }
    }

    validateIdExist(req, res, next) {
        Note.findById(req.params.noteId, (err) => {
            if(err) {
                return res.status(400).json({
                    message: 'Validation failed',
                    failures: err
                });
            } else {
                return next();
            } 
        })
    }
}

module.exports = crudValidation;
