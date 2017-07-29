const HOST = process.env.HOST ||
             global.HOST ||
             'localhost';
const PORT = process.env.PORT ||
             global.PORT ||
             1337

module.exports = {
  HOST,
  PORT
};
