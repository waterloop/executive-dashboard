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
    .update({ status }, [
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
      'resume_link',
      'in_person_available',
      'reason_to_join',
      'additional_information',
      'posting_id',
    ])
    .then((response) => response)
    .catch((err) => {
      console.error(`Error in updateApplicationStatus: ${err}`);
      throw err;
    });

/** When an email is sent and the application state is interview_pending or app_reject, this API is called */
const updateEmailSent = (db) => (appID) =>
  db('applications')
    .where({ id: appID })
    .whereIn('status', ['interview_pending', 'app_reject', 'interview_reject', 'final_accept'])
    .update({ email_sent: true }, [
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
      'resume_link',
      'in_person_available',
      'reason_to_join',
      'additional_information',
      'posting_id',
    ])
    .then((response) => {
      // If response is empty, it could be because the status is invalid OR the id is invalid.
      if (response.length === 0) {
        db('applications')
          .where({ id: appID })
          .then((resp2) => {
            if (resp2.length === 0) {
              return -1;
            }
            return -2;
          });
      } else {
        return response;
      }
    })
    .catch((err) => {
      console.error(`Error in updateEmailSent: ${err}`);
      throw err;
    });

export default (db) => ({
  addApplication: addApplication(db),
  getApplicationByEmail: getApplicationByEmail(db),
  getApplicationsByTerm: getApplicationsByTerm(db),
  updateApplicationStatus: updateApplicationStatus(db),
  updateEmailSent: updateEmailSent(db),
});
