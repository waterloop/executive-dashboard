import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
const { expect } = chai;

describe('Email Routes', () => {
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

  describe('PATCH /api/email', () => {
    it('should modify the applications table email_sent column for the application entry', async () =>
      chai
        .request(app)
        .patch('/api/email')
        .send({ id: 1 }) // Should result in email_sent being changed in applications table.
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys([
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
          expect(res.body).to.have.property('email_sent', true);
        }));
    it('should modify the interview table email_sent column for the application entry', async () =>
      chai
        .request(app)
        .patch('/api/email')
        .send({ id: 3 }) // Should result in email_sent being changed in interviews table.
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys([
            'id',
            'note',
            'email_sent',
            'application_id',
          ]);
          expect(res.body).to.have.property('email_sent', true);
        }));
  });
  it('should return 403 when trying to update email_sent for an application with an invalid status', async () =>
    chai
      .request(app)
      .patch('/api/email')
      .send({ id: 5 })
      .then((res) => {
        expect(res).to.have.status(403);
      }));
  it('should return 403 when trying to update email_sent for a nonexistent application', async () =>
    chai
      .request(app)
      .patch('/api/email')
      .send({ id: 29393 })
      .then((res) => {
        expect(res).to.have.status(403);
      }));
});
