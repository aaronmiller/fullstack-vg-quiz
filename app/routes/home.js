const express = require('express');
const path = require('path');

const home = express.Router();

home.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

module.exports = { home };
