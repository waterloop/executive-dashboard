import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
const { expect } = chai;

describe('Application Routes', () => {
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

  describe('GET /api/applications', () => {
    it('should return an object with the array of all applications of a valid term', async () =>
      chai
        .request(app)
        .get('/api/applications?term=SPRING-2022')
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((item) => {
            expect(item).to.have.keys([
              'id',
              'submitted_at',
              'first_name',
              'last_name',
              'email_address',
              'email_sent',
              'current_year',
              'program',
              'application_term',
              'in_school',
              'in_person_available',
              'posting_id',
              'status',
              'reason_to_join',
              'resume_link',
              'additional_information',
            ]);
          });
        }));
  });
  describe('GET /api/applications/:email', () => {
    it('should return an object with the array of all applications of a valid email', async () =>
      chai
        .request(app)
        .get('/api/applications/applicant/worldstarhiphop@notuwaterloo.ca')
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((item) => {
            expect(item).to.have.keys([
              'id',
              'submitted_at',
              'first_name',
              'last_name',
              'email_address',
              'email_sent',
              'current_year',
              'program',
              'application_term',
              'in_school',
              'in_person_available',
              'posting_id',
              'status',
              'reason_to_join',
              'resume_link',
              'additional_information',
            ]);
          });
        }));
  });

  describe('PATCH /api/applications/applicant/status', () => {
    it('should return the updated object by appID', async () => {
      const applications = await db('applications');
      return chai
        .request(app)
        .patch('/api/applications/applicant/status')
        .send({
          id: applications[0].id, // ID itself may change.
          status: 'app_undecided',
        })
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys([
            'id',
            'submitted_at',
            'status',
            'first_name',
            'last_name',
            'email_address',
            'email_sent',
            'current_year',
            'program',
            'application_term',
            'in_school',
            'in_person_available',
            'posting_id',
            'reason_to_join',
            'resume_link',
            'additional_information',
          ]);
          expect(res.body).to.have.property('status', 'app_undecided');
        });
    });
    it('should return 400 with no information supplied', async () =>
      chai
        .request(app)
        .patch('/api/applications/applicant/status')
        .then((res) => {
          expect(res).to.have.status(400);
        }));
    it('should return 400 with undefined information supplied', async () =>
      chai
        .request(app)
        .patch('/api/applications/applicant/status')
        .send({
          id: undefined,
          status: undefined,
        })
        .then((res) => {
          expect(res).to.have.status(400);
        }));
    it('should return 400 with empty status supplied', async () =>
      chai
        .request(app)
        .patch('/api/applications/applicant/status')
        .send({
          id: '1',
          status: '',
        })
        .then((res) => {
          expect(res).to.have.status(400);
        }));
    it('should return 400 with empty app id supplied', async () =>
      chai
        .request(app)
        .patch('/api/applications/applicant/status')
        .send({
          id: '',
          status: 'app_reject',
        })
        .then((res) => {
          expect(res).to.have.status(400);
        }));
    it('should return 404 with non-existing app id supplied', async () =>
      chai
        .request(app)
        .patch('/api/applications/applicant/status')
        .send({
          id: -1,
          status: 'app_reject',
        })
        .then((res) => {
          expect(res).to.have.status(404);
        }));
  });
});
