const chai = require('chai');
const chaiHttp = require('chai-http');

const {
  app,
  runServer,
  closeServer
} = require('../index');

chai.use(chaiHttp);

before(() => {
  return runServer();
});

after(() => {
  return closeServer();
});

describe('Unit tests for VG Quiz App.', () => {
  describe('Test: Visit the home page.', () => {
    it('should successfully visit the home page', (done) => {
      chai.request(app)
        .get('/')
        .then((req, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });
});
