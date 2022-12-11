import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '~/backend';
import { db } from '~/backend/db';
import { EMAIL_SENT_FLAGS, APP_COLUMNS } from '~/backend/utils/constants';
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
    it('should modify the applications table email_sent column for the entry with status app_reject', async () =>
      chai
        .request(app)
        .patch('/api/email')
        .send(
          await db('applications').where({ status: 'app_reject' }).first('id'),
        ) // Should result in email_sent being changed in applications table.
        .then(async (res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys(APP_COLUMNS);
          expect(res.body).to.have.property(
            'email_sent',
            EMAIL_SENT_FLAGS.APP_REJECT,
          );
        }));
    it('should modify the applications table email_sent column for the entry with status final_accept', async () =>
      chai
        .request(app)
        .patch('/api/email')
        .send(
          await db('applications')
            .where({ status: 'final_accept' })
            .first('id'),
        ) // Should result in email_sent being changed in interviews table.
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys(APP_COLUMNS);
          expect(res.body).to.have.property(
            'email_sent',
            EMAIL_SENT_FLAGS.FINAL_ACCEPT,
          );
        }));
  });
  it('should return 403 when trying to update email_sent for an application with an invalid status', async () =>
    chai
      .request(app)
      .patch('/api/email')
      .send(
        await db('applications').where({ status: 'app_pending' }).first('id'),
      )
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
