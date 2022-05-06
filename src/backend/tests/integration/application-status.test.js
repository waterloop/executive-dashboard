import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
const { expect } = chai;

describe('Application Status Routes', () => {
  // Rollback migrations.
  before('migrate', async function () {
    // ensures that the test database is using the most up to date schema. It runs once per file before the tests take place
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    await db.migrate.rollback();
    return db.migrate.latest();
  });

  beforeEach('reseed', async function () {
    // ensures that database is in a consistant state, avoids the actions of one test from interferring with another test (want test to be isolated)
    // !WARNING: This causes row IDs to be different after each run, if seed files don't manually set the id field.
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.seed.run();
  });

  // Rollback migration again.
  after(async function () {
    // functions runs after all tests in the file, rolls back the db (to a clean slate) so that the next test can migrate sooner
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.migrate.rollback();
  });

  describe('GET /api/applications/statuses', () => {
    it('should return all possible application statuses', async () =>
      chai
        .request(app)
        .get('/api/applications/statuses')
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((item) => {
            expect(item).to.have.keys(['id', 'key', 'name', 'description']);
          });
        }));
  });
});
