process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../../../server');
const Note = require('../../../crudModule/models/crudModel');

chai.use(chaiHttp);
chai.should();

describe('Notes', () => {
 Note.collection.drop();
  beforeEach('test start', (done) => {
    let newNote = new Note({
      'title': 'Test Notes',
      'content': 'this is the test content for the unit test'
    });
    newNote.save((err)=> {
      done();
    });
  });
  afterEach('test end', (done) => {
    Note.collection.drop();
    done();
  });

  // Test to create notes
  it('should add a SINGLE note on /notes POST', (done) => {
    chai.request(server)
    .post('/notes')
    .send({
      'title': 'Test Notes',
      'content': 'this is the test content for the unit test'
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('title');
      res.body.should.have.property('content');
      res.body.should.have.property('_id');
      done();
    });
  });

  // Test to get all notes
  it('should list ALL notes on /notes GET', (done) => {
    chai.request(server)
    .get('/notes')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('content');
      res.body[0].title.should.equal('Test Notes');
      res.body[0].content.should.equal('this is the test content for the unit test');
      done();
    });
  });

  // Test to get single note
  it('should list a SINGLE note on /notes/<id> GET', (done) => {
    var newNote = new Note({
      title: 'test by id',
      content: 'this content is test to single get'
    })
    newNote.save((err,data) => {
      chai.request(server)
      .get('/notes/'+data.id)
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('title');
        res.body.should.have.property('content');
        res.body.title.should.equal('test by id');
        res.body.content.should.equal('this content is test to single get');
        res.body._id.should.equal(data.id);
        done();  
      });
    });
  });

  // Test to update the note 
  it('should update a SINGLE note on /notes/<id> PUT', (done) => {
    chai.request(server)
      .get('/notes')
      .end((err, res) => {
        chai.request(server)
          .put('/notes/'+res.body[0]._id)
          .send({
            'title': 'Update Test Note',
            'content': 'this is the test content for the unit test'
          })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('title');
            response.body.should.have.property('_id');
            response.body.title.should.equal('Update Test Note');  
            done();
          });  
      });
  });

  //Test to delete the note 
  it('should delete a SINGLE blob on /blob/<id> DELETE', (done) => {
    chai.request(server)
      .get('/notes')
      .end((err, res) => {
        chai.request(server)
          .delete('/notes/'+res.body[0]._id)  
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            done();
          });
      });
  });

});
