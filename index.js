const express = require('express');
const { HOST, PORT } = require('./config');
const { home } = require('./app/routes/home');

const app = express();

// Serve bundled JS and CSS files.
app.use(express.static('dist'));

// Serve images and fonts from static dir.
app.use(express.static('app/static'));

// Routes
app.use('/', home);

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => {
      console.log(`Listening at ${HOST}:${PORT}...`);
      resolve();
    }).on('error', err => {
      reject(err);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing the server...');

    server.close(err => {
      if(err) {
        console.log(err, 'There was an error with closing the server...');
        return reject();
      }

      resolve();
    });
  });
}

if (require.main === module) runServer().catch(err => console.log(err, 'There was an error running the server.'));

module.exports = {
  app,
  runServer,
  closeServer
};
