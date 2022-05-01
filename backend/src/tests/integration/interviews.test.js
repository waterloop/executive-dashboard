process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Interview Routes', () => {
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
    //functions runs after all tests in the file, rolls back the db (to a clean slate) so that the next test can migrate sooner
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.migrate.rollback();
  });

  describe('GET /api/interviews', () => {
    it('should return all interviews for current year and term', async () => {
      return chai
        .request(app)
        .get('/api/interviews?term=SPRING-2022')
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.not.empty;
          res.body.forEach((item) => {
            expect(item).to.have.keys([
              'id',
              'note',
              'application_id',
              'email_sent',
            ]);
          });
        });
    });
    it('should return 400 with invalid term supplied', async () => {
      return chai
        .request(app)
        .get('/api/interviews?term=INVALID-7346')
        .then((res) => {
          expect(res).to.have.status(400);
        });
    });
    it('should return 404 with no applications for current term', async () => {
      return chai
        .request(app)
        .get('/api/interviews?term=SPRING-2033')
        .then((res) => {
          expect(res).to.have.status(404);
        });
    });

    describe('GET /api/interviews/:id', () => {
      it('should return corresponding interview for application id', async () => {
        return chai
          .request(app)
          .get('/api/interviews/1')
          .then((res) => {
            if (res.error.text) {
              console.error(res.error.text);
            }
            expect(res).to.have.status(200);
            expect(res.body).to.have.keys([
              'id',
              'note',
              'application_id',
              'email_sent',
            ]);
          });
      });
      it('should return 404 with no matches for the provided application ID', async () => {
        return chai
          .request(app)
          .get('/api/interviews/239')
          .then((res) => {
            expect(res).to.have.status(404);
          });
      });
    });
    describe('POST /api/interviews/', () => {
      it('should add a non-existent interview entry (with respect to app ID) to the table', async () => {
        return chai
          .request(app)
          .post('/api/interviews/')
          .send({
            application_id: 2,
            note: 'test test',
          })
          .then((res) => {
            if (res.error.text) {
              console.error(res.error.text);
            }
            expect(res).to.have.status(200);
            expect(res.body).to.have.keys([
              'id',
              'note',
              'application_id',
              'email_sent',
            ]);
          });
      });
      describe('POST /api/interviews/', () => {
        it('should add a non-existent interview entry (with respect to app ID) to the table', async () => {
          return chai
            .request(app)
            .post('/api/interviews/')
            .send({
              application_id: 2,
              note: 'test test',
            })
            .then((res) => {
              if (res.error.text) {
                console.error(res.error.text);
              }
              expect(res).to.have.status(200);
              expect(res.body).to.have.keys([
                'id',
                'note',
                'application_id',
                'email_sent',
              ]);
            });
        });
        it('should update contents for an existing entry (with respect to app ID) in the table', async () => {
          return chai
            .request(app)
            .post('/api/interviews/')
            .send({
              application_id: 1,
              note: 'test test3',
            })
            .then((res) => {
              if (res.error.text) {
                console.error(res.error.text);
              }
              expect(res).to.have.status(200);
              expect(res.body).to.have.keys([
                'id',
                'note',
                'application_id',
                'email_sent',
              ]);

              // Test for uniqueness by application ID:
              return chai
                .request(app)
                .get('/api/interviews/1')
                .then((res) => {
                  if (res.error.text) {
                    console.error(res.error.text);
                  }
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.keys([
                    'id',
                    'note',
                    'application_id',
                    'email_sent',
                  ]);
                });
            });
        });
        it('should return 403 when trying to add an entry for a nonexistent application ID.', async () => {
          return chai
            .request(app)
            .post('/api/interviews/')
            .send({
              application_id: 2147,
              note: 'Why did you add this.',
            })
            .then((res) => {
              expect(res).to.have.status(403);
            });
        });
      });
    });
  });
});
