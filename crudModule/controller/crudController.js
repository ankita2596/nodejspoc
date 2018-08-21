const Note = require('../models/crudModel');

class crudController {

  constructor () {

  }

  create(req,res) {
    const note = new Note ({
      title: req.body.title,
      content: req.body.content
    });
    note.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occured while creating the notes."
      });
    });
  };

  findAll(req,res) {
    Note.find()
    .then(notes => {
      res.send(notes);
    }).catch(err =>{
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
  };

  findOne(req,res) {
    Note.findById(req.params.noteId)
    .then(note => {
      res.send(note);
    }).catch(err => {
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId
      });
    });
  };

  update(req,res) {
    Note.findByIdAndUpdate(req.params.noteId, {
      title: req.body.title,
      content: req.body.content
    }, {new: true})
    .then(note => {
      res.send(note);
    }).catch(err => {
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
      });
    });
  };

  delete(req,res) {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      res.send({message: "Note deleted successfully!"});
    }).catch(err => {
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId
      });
    });
  };

}

module.exports = crudController;
