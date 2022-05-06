// Test adding multiple configuration entries, including ones that don't exist in the seed files.
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
const { expect } = chai;

describe('Configuration Routes', () => {
  // Rollback migrations.
  before('migrate', async function () {
    // ensures that the test database is using the most up to date schema. It runs once per file before the tests take place
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    await db.migrate.rollback();
    return db.migrate.latest();
  });

  beforeEach('reseed', async function () {
    // ensures that database is in a consistant state, avoids the actions of one test from interferring with another test (want test to be isolated)
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.seed.run();
  });

  // Rollback migration again.
  after(async function () {
    // functions runs after all tests in the file, rolls back the db (to a clean slate) so that the next test can migrate sooner
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.migrate.rollback();
  });

  describe('GET /api/configuration', () => {
    it('should return all configuration entries', async () =>
      chai
        .request(app)
        .get('/api/configuration')
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.not.empty;
          res.body.forEach((item) => {
            expect(item).to.have.keys(['id', 'label', 'value']);
          });
        }));
  });

  describe('PATCH /api/configuration', () => {
    it('should update an existing configuration settings', async () => {
      const configuration = await db('configuration');
      return chai
        .request(app)
        .patch('/api/configuration')
        .send([
          {
            label: configuration[0].label,
            value: 'www.zoom.us',
          },
          {
            label: configuration[1].label,
            value: 'this is an unsanitized test',
          },
        ])
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((item) => {
            expect(item).to.have.keys(['id', 'label', 'value']);
          });
          expect(res.body[0]).to.have.property('value', 'www.zoom.us');
          expect(res.body[1]).to.have.property(
            'value',
            'this is an unsanitized test',
          );
        });
    });
    it('should return 400 with no information supplied', async () =>
      chai
        .request(app)
        .patch('/api/configuration')
        .then((res) => {
          expect(res).to.have.status(400);
        }));
    it('should return 400 with blank label supplied', async () =>
      chai
        .request(app)
        .patch('/api/configuration')
        .send([
          {
            label: '',
            value: 'www.zoom.us',
          },
          {
            label: '',
            value: 'www.zoom.us',
          },
        ])
        .then((res) => {
          expect(res).to.have.status(400);
        }));
    it('should return 400 with blank value supplied', async () => {
      const configuration = await db('configuration');
      return chai
        .request(app)
        .patch('/api/configuration')
        .send([
          {
            label: configuration[0].label,
            value: 'valid value',
          },
          {
            label: configuration[0].label,
            value: '',
          },
        ])
        .then((res) => {
          expect(res).to.have.status(400);
        });
    });
    it('should return 404 with non-existing label supplied (while still updating valid entries)', async () => {
      const configuration = await db('configuration');
      return chai
        .request(app)
        .patch('/api/configuration')
        .send([
          {
            label: configuration[0].label,
            value: 'this.is.valid.com',
          },
          {
            label: 'non-existing label',
            value: 'www.zoom.us',
          },
        ])
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body[0]).to.equal(
            "Could not update 'non-existing label': label does not exist.",
          );
        });
    });
  });
});
