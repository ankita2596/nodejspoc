const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.env/database.config.js');
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressValidator = require('express-validator');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use((req, res, next) => {
  console.log(JSON.stringify(
    {
      time: new Date(),
      method: req.method,
      url: req.originalUrl,
    }
  ));
  next();
});

// Routes defined
const githubRouter = require('./gitHubModule/routes');
app.use('/github', githubRouter());

const crudRouter = require('./crudModule/routes');
app.use('/', crudRouter());

// Server connection
const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig[app.settings.env], { useNewUrlParser: true })
.then(() => {
  console.log("Successfully connected to the " + app.settings.env + " database: " + dbConfig[app.settings.env]);
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

module.exports = server;
