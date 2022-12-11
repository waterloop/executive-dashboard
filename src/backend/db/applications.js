import { EMAIL_SENT_FLAGS } from '~/backend/utils/constants';

// Should return multiple applications for ONE APPLICANT.
const getApplicationByEmail = (db) => (email_address) =>
  db('applications')
    .where({
      email_address,
    })
    .then((data) => data);

const getApplicationsByTerm = (db) => (application_term) =>
  db('applications')
    .where({
      application_term,
    })
    .then((data) => data);

const addApplication = (db) => (application) =>
  db('applications')
    .insert({
      ...application,
    })
    .returning([
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
    ])
    .then((response) => response)
    .catch((err) => {
      console.error(`Error in addApplication: ${err}`);
      throw err;
    });

const updateApplicationStatus = (db) => (appID, status) =>
  db('applications')
    .where({ id: appID })
    .update({ status }, '*')
    .then((response) => response)
    .catch((err) => {
      console.error(`Error in updateApplicationStatus: ${err}`);
      throw err;
    });

/** When an email is sent and the application state is interview_pending or app_reject, this API is called */
const updateEmailStatus = (db) => async (appID) => {
  try {
    const entry = await db('applications')
      .where({ id: appID })
      .whereIn(
        'status',
        Object.keys(EMAIL_SENT_FLAGS).map((k) => k.toLowerCase()),
      )
      .first('status', 'email_sent');

    if (!entry || entry.length === 0) {
      return [];
    }

    let { status, email_sent } = entry;
    email_sent |= EMAIL_SENT_FLAGS[status.toUpperCase()];

    const response = await db('applications')
      .where({ id: appID })
      .update({ email_sent }, '*');

    return response;
  } catch (err) {
    console.error(`Error in updateEmailStatus: ${err}`);
    throw err;
  }
};

export default (db) => ({
  addApplication: addApplication(db),
  getApplicationByEmail: getApplicationByEmail(db),
  getApplicationsByTerm: getApplicationsByTerm(db),
  updateApplicationStatus: updateApplicationStatus(db),
  updateEmailStatus: updateEmailStatus(db),
});
